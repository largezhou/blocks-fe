<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPlaceholder',
})
</script>

<script setup lang="ts">
import { usePlaceholder } from '@/components/page-editor/placeholder'

const { placeholderPositionStyles } = usePlaceholder()
</script>

<template>
  <div
    class="b-placeholder"
    :style="{...placeholderPositionStyles}"
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
