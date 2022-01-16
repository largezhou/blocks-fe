<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditComponentPosition',
})
</script>

<script setup lang="ts">
import {
  computed,
  DefineComponent,
  onBeforeUnmount,
  ref,
  resolveComponent,
} from 'vue'
import {
  ComponentSetting,
  PositionNumber,
  PositionStyles,
  UIComponentSetting,
} from '@/components/page-editor/typing'
import {
  addEvent,
  convertPositionNumberToStyles,
} from '@/utils/util'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

const props = defineProps<{
  component: ComponentSetting
  selectedId: { [key: string]: true }
}>()

interface Emits {
  (e: 'start', component: UIComponentSetting): void

  (e: 'update-position', component: UIComponentSetting, position: Required<PositionNumber>): void

  (e: 'stop', component: UIComponentSetting): void
}

const emit = defineEmits<Emits>()

/**
 * 组件设置
 */
const c = props.component as UIComponentSetting

const positionStyles = computed<PositionStyles>(() => convertPositionNumberToStyles(c))

/**
 * 是否在拖动
 */
const isMoving = ref(false)

/**
 * 是否在缩放
 */
const isResizing = ref(false)

/**
 * 开始拖动时，记录鼠标的位置，用于计算拖动时，鼠标横向竖向移动的距离
 */
const mouseStartPosition: Required<Pick<PositionNumber, 'left' | 'top'>> = {
  left: 0,
  top: 0,
}

/**
 * 开始拖动或者缩放时，记录组件的大小和位置
 */
const componentStartPosition: Required<PositionNumber> = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
}

/**
 * 该组件是否已被选中
 */
const selected = computed(() => props.selectedId[c.id])

const startMove = () => {
  isMoving.value = true
}

const startResize = () => {
  isResizing.value = true
}

const onMousedown = (e: MouseEvent) => {
  if (e.buttons !== 1) {
    return
  }

  mouseStartPosition.left = e.clientX
  mouseStartPosition.top = e.clientY

  componentStartPosition.left = c.left
  componentStartPosition.top = c.top
  componentStartPosition.width = c.width
  componentStartPosition.height = c.height

  emit('start', c)
  if ((e.target as HTMLElement).classList.contains('b-resizer')) {
    startResize()
  } else {
    startMove()
  }
}

const handleMoving = (deltaX: number, deltaY: number) => {
  emit('update-position', c, {
    left: Math.max(deltaX + componentStartPosition.left, 0),
    top: Math.max(deltaY + componentStartPosition.top, 0),
    width: c.width,
    height: c.height,
  })
}

const componentDefinition = resolveComponent(c.name) as DefineComponent
const handleResizing = (deltaX: number, deltaY: number) => {
  emit('update-position', c, {
    left: c.left,
    top: c.top,
    width: Math.max(componentStartPosition.width + deltaX, (componentDefinition?.minWidthUnit ?? 1) * GRID_WIDTH),
    height: Math.max(componentStartPosition.height + deltaY, (componentDefinition?.minHeightUnit ?? 1) * GRID_HEIGHT),
  })
}

addEvent(onBeforeUnmount, 'mousemove', (e: MouseEvent) => {
  const deltaX = e.clientX - mouseStartPosition.left
  const deltaY = e.clientY - mouseStartPosition.top

  if (isMoving.value) {
    handleMoving(deltaX, deltaY)
  }

  if (isResizing.value) {
    handleResizing(deltaX, deltaY)
  }
})

addEvent(onBeforeUnmount, 'mouseup', () => {
  if (isMoving.value || isResizing.value) {
    isMoving.value = false
    isResizing.value = false
    emit('stop', c)
  }
})
</script>

<template>
  <div
    :class="{
      'b-component': true,
      'b-selected': selected
    }"
    :style="{...positionStyles}"
    @mousedown.stop.prevent="onMousedown"
  >
    <component
      :is="component.name"
      v-bind="component.setting"
    />
    <div class="b-resizer"/>
  </div>
</template>

<style lang="less">
@component-padding: 4px;

.b-component {
  box-sizing: border-box;
  position: absolute;
  padding: @component-padding;
  border-radius: 2px;

  @selected-border: 1px;
  @selected-padding: @component-padding - @selected-border;

  &.b-selected {
    border: @selected-border #69c0ff solid;
    padding: @selected-padding;

    .b-resizer {
      display: block;
    }
  }

  .b-resizer {
    display: none;
    width: 12px;
    height: 12px;
    position: absolute;
    bottom: -3px;
    right: -3px;
    border-bottom-right-radius: 2px;
    cursor: se-resize;
    border: 3px #69c0ff solid;
    border-left: none;
    border-top: none;
  }
}
</style>
