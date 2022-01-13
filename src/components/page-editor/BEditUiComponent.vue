<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditUIComponent',
})
</script>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
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

const startMove = (e: MouseEvent) => {
  isMoving.value = true
  changePlaceholderPosition(c)
}

const startResize = (e: MouseEvent) => {
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

  if ((e.target as HTMLElement).classList.contains('b-resizer')) {
    startResize(e)
  } else {
    startMove(e)
  }
}

const { changeComponentPosition } = useComponents()

const handleMoving = (e: MouseEvent) => {
  const deltaX = e.clientX - mouseStartPosition.left
  const deltaY = e.clientY - mouseStartPosition.top

  changeComponentPosition(props.component as UIComponentSetting, {
    left: Math.max(deltaX + componentStartPosition.left, 0),
    top: Math.max(deltaY + componentStartPosition.top, 0),
  })

  changePlaceholderPosition(c)
}

const handleResizing = (e: MouseEvent) => {
  log('resizing', e)
}

addEvent(onUnmounted, 'mousemove', (e: MouseEvent) => {
  if (isMoving.value) {
    handleMoving(e)
  }

  if (isResizing.value) {
    handleResizing(e)
  }
})

const handleStopMove = () => {
  isMoving.value = false

  changeComponentPosition(c, placeholderPosition.value)
}

const handleStopResize = () => {
  isResizing.value = false
}

addEvent(onUnmounted, 'mouseup', () => {
  if (isMoving.value) {
    handleStopMove()
  }

  if (isResizing.value) {
    handleStopResize()
  }
})
</script>

<template>
  <div
    class="b-component b-selected"
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
  }

  .b-resizer {
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
