<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditUIComponent',
})
</script>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { Position } from '@/components/page-editor/typing'
import { ISettingWithDefinition, IUIComponentSetting } from '@/components/components/typing'
import { addEvent } from '@/utils/util'
import { useComponents } from '@/components/page-editor/components'

const props = defineProps<{
  component: ISettingWithDefinition
  componentIndex: number
}>()

const c: IUIComponentSetting = props.component as IUIComponentSetting

const positionStyles = computed<Position>(() => {
  return {
    left: `${c.left}px`,
    top: `${c.top}px`,
    width: `${c.width * 75}px`,
    height: `${c.height * 35}px`,
  }
})

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

  isMoving.value = true
  offsetX.value = e.offsetX
  offsetY.value = e.offsetY
}
const { changePosition } = useComponents()
const handleMoving = (e: MouseEvent) => {
  changePosition(props.componentIndex, {
    left: Math.max(e.clientX - offsetX.value - 240, 0),
    top: Math.max(e.clientY - offsetY.value - 112, 0),
  })
}
addEvent(onUnmounted, 'mousemove', (e: MouseEvent) => {
  if (isMoving.value) {
    handleMoving(e)
  }
})
addEvent(onUnmounted, 'mouseup', () => {
  isMoving.value = false
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
}
</style>
