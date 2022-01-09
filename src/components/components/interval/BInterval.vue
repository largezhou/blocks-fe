<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BInterval',
})
</script>

<script setup lang="ts">
import { onUnmounted } from 'vue'

const interval = window.setInterval(() => {
  log('BInterval')
}, 1000)

onUnmounted(() => window.clearInterval(interval))
</script>

<template>
  <span/>
</template>
