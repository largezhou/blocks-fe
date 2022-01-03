<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: {
    type: string,
    required: true,
  },
  color?: string,
  size?: number,
}

const props = withDefaults(defineProps<Props>(), {
  color: '#b3b9bf',
  size: 25,
})

const symbolId = computed(() => `#icon-${props.name}`)
const sizeStyle = computed(() => `${props.size}px`)
</script>

<template>
  <svg aria-hidden="true" :style="{ width: sizeStyle, height: sizeStyle }">
    <use :href="symbolId" :fill="props.color"/>
  </svg>
</template>
