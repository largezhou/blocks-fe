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
  PositionNumber,
  PositionStyles,
  UIComponentSetting,
  MoveType,
} from '@/components/page-editor/typing'
import {
  addEvent,
  convertPositionNumberToStyles,
} from '@/utils/util'
import { GRID_HEIGHT, GRID_WIDTH, LAZY_DELTA } from '@/lib/constants'

const props = defineProps<{
  component: UIComponentSetting
  selectedId?: { [key: string]: true }
  /**
   * 从组件面板拖出组件时的鼠标事件
   */
  startDragEvent?: MouseEvent
}>()

interface Emits {
  (e: 'update-position', component: UIComponentSetting, position: Required<PositionNumber>): void

  (e: 'stop', component: UIComponentSetting): void

  (e: 'select', component: UIComponentSetting): void
}

const emit = defineEmits<Emits>()

/**
 * 组件设置
 */
const c = props.component

const positionStyles = computed<PositionStyles>(() => convertPositionNumberToStyles(c))

const isMousedown = ref(false)

/**
 * 鼠标移动时，是拖动还是缩放
 */
const mouseMovingType = ref<MoveType>()

/**
 * 鼠标开始移动时，是拖动元素还是缩放元素
 */
const mouseMoveType = ref<MoveType>()

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
const selected = computed(() => props.selectedId && props.selectedId[c.id])

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

  isMousedown.value = true

  emit('select', c)
}

if (c.isNew) {
  onMousedown(props.startDragEvent as MouseEvent)
}

const handleMoving = (deltaX: number, deltaY: number) => {
  const left = deltaX + componentStartPosition.left
  const top = deltaY + componentStartPosition.top

  emit('update-position', c, {
    left: c.isNew ? left : Math.max(left, 0),
    top: c.isNew ? top : Math.max(top, 0),
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
  if (!isMousedown.value) {
    return
  }

  // 按下鼠标，首次开始移动时，判断是拖动组件还是缩放组件
  if (mouseMoveType.value === undefined) {
    if ((e.target as HTMLElement).classList.contains('b-resizer')) {
      mouseMoveType.value = 'resize'
    } else {
      mouseMoveType.value = 'move'
    }
  }

  const deltaX = e.clientX - mouseStartPosition.left
  const deltaY = e.clientY - mouseStartPosition.top

  if (
    (mouseMoveType.value === 'move')
    && (Math.abs(deltaX) > LAZY_DELTA || Math.abs(deltaY) > LAZY_DELTA)
  ) {
    mouseMovingType.value = 'move'
    handleMoving(deltaX, deltaY)
  } else if (mouseMoveType.value === 'resize') {
    mouseMovingType.value = 'resize'
    handleResizing(deltaX, deltaY)
  }
})

addEvent(onBeforeUnmount, 'mouseup', () => {
  if (mouseMovingType.value !== undefined) {
    emit('stop', c)
  }

  isMousedown.value = false
  mouseMoveType.value = undefined
  mouseMovingType.value = undefined
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
    border: @selected-border #bae7ff solid;
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
