<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditUIComponent',
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
import { useComponents } from '@/components/page-editor/components'
import { usePlaceholder } from '@/components/page-editor/placeholder'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

const props = defineProps<{
  component: ComponentSetting
}>()

const positionStyles = computed<PositionStyles>(() => convertPositionNumberToStyles(props.component as UIComponentSetting))

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

const {
  changePlaceholderPosition,
  placeholderPosition,
} = usePlaceholder()

const c = props.component as UIComponentSetting

const startMove = () => {
  isMoving.value = true
  changePlaceholderPosition(c)
}

const startResize = () => {
  isResizing.value = true
  changePlaceholderPosition(c)
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

  if ((e.target as HTMLElement).classList.contains('b-resizer')) {
    startResize()
  } else {
    startMove()
  }
}

const { changeComponentPosition } = useComponents()

const handleMoving = (deltaX: number, deltaY: number) => {
  changeComponentPosition(props.component as UIComponentSetting, {
    left: Math.max(deltaX + componentStartPosition.left, 0),
    top: Math.max(deltaY + componentStartPosition.top, 0),
  })

  changePlaceholderPosition({
    top: c.top,
    left: c.left,
  })
}

const componentDefinition = resolveComponent(c.name) as DefineComponent
const handleResizing = (deltaX: number, deltaY: number) => {
  changeComponentPosition(props.component as UIComponentSetting, {
    width: Math.max(componentStartPosition.width + deltaX, (componentDefinition?.minWidthUnit ?? 1) * GRID_WIDTH),
    height: Math.max(componentStartPosition.height + deltaY, (componentDefinition?.minHeightUnit ?? 1) * GRID_HEIGHT),
  })

  changePlaceholderPosition({
    width: c.width,
    height: c.height,
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
    changeComponentPosition(c, placeholderPosition.value)
  }
})
</script>

<template>
  <div
    class="b-component"
    :style="{...positionStyles}"
    @mousedown.stop.prevent="onMousedown"
  >
    <component :is="component.name"/>
    <div class="b-resizer"/>
  </div>
</template>

<style lang="less">
.b-component {
  box-sizing: border-box;
  position: absolute;
  padding: 4px;
  border-radius: 2px;

  &.b-selected {
    border: 2px #9cdfff dashed;
    padding: 2px;

    .b-resizer {
      display: block;
    }
  }

  .b-resizer {
    display: none;
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: -4px;
    right: -4px;
    border-radius: 2px;
    background: red;
    cursor: se-resize;
  }
}
</style>
