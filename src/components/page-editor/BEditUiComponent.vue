<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditUIComponent',
})
</script>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { ComponentSetting, PositionStyles, UIComponentSetting } from '@/components/page-editor/typing'
import { addEvent, convertPositionNumberToStyles, getOffsetPositionFrom } from '@/utils/util'
import { useComponents } from '@/components/page-editor/components'
import { usePlaceholder } from '@/components/page-editor/placeholder'

const props = defineProps<{
  component: ComponentSetting
  componentIndex: number
}>()

const positionStyles = computed<PositionStyles>(() => convertPositionNumberToStyles(props.component as UIComponentSetting))

/**
 * 是否在拖动
 */
const isMoving = ref(false)
/**
 * 开始拖动时，鼠标在元素内的相对位置
 */
const offsetX = ref(0)
/**
 * 开始拖动时，鼠标在元素内的相对位置
 */
const offsetY = ref(0)

const onStartMove = (e: MouseEvent) => {
  if (e.buttons !== 1) {
    return
  }

  const {
    left,
    top,
  } = getOffsetPositionFrom(e.currentTarget as HTMLElement, e.target as HTMLElement)
  offsetX.value = e.offsetX + left
  offsetY.value = e.offsetY + top

  changePlaceholderPosition(props.component as UIComponentSetting, true)

  isMoving.value = true
}
const { changeComponentPosition } = useComponents()
const {
  changePlaceholderPosition,
  placeholderPosition,
} = usePlaceholder()

const handleMoving = (e: MouseEvent) => {
  changeComponentPosition(props.component as UIComponentSetting, {
    left: Math.max(e.clientX - offsetX.value - 240, 0),
    top: Math.max(e.clientY - offsetY.value - 112, 0),
  })

  changePlaceholderPosition({
    left: e.clientX - 240,
    top: e.clientY - 112,
  })
}

addEvent(onUnmounted, 'mousemove', (e: MouseEvent) => {
  if (isMoving.value) {
    handleMoving(e)
  }
})

addEvent(onUnmounted, 'mouseup', () => {
  if (!isMoving.value) {
    return
  }

  isMoving.value = false
  changeComponentPosition(props.component as UIComponentSetting, placeholderPosition.value)
})
</script>

<template>
  <div
    class="b-component"
    :style="{...positionStyles}"
    @mousedown.stop.prevent="onStartMove"
  >
    <component :is="component.name"/>
  </div>
</template>

<style lang="less">
.b-component {
  position: absolute;
  padding: 2px;
}
</style>
