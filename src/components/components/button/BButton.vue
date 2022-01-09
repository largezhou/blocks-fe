<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BButton',
  minWidthUnit: 1,
  minHeightUnit: 1,
})
</script>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name?: string,
    type?: 'primary' | 'text' | 'default',
    danger?: boolean,
    disabled?: boolean,
  }>(),
  {
    name: '按钮',
    type: 'primary',
    danger: false,
    disabled: false,
  },
)

interface Emits {
  (e: 'click', event: MouseEvent): void
}
const emit = defineEmits<Emits>()

const onClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <a-button
    :type="type"
    :danger="danger"
    :disabled="disabled"
    @click="onClick"
  >
    {{ name }}
  </a-button>
</template>
