<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPlaceholder',
})
</script>

<script setup lang="ts">
import { PositionStyles } from '@/components/page-editor/typing'

defineProps<{
  positionStyles: PositionStyles
}>()
</script>

<template>
  <div
    class="b-placeholder"
    :style="{...positionStyles}"
  />
</template>

<style lang="less">
.b-placeholder {
  background: #e6f7ff;
  width: 100px;
  height: 100px;
  border-radius: 2px;
  position: absolute;
}
</style>
