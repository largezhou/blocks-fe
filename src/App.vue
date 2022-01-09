<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<script setup lang="ts">
import BPageEditor from '@/components/page-editor/BPageEditor.vue'
</script>

<template>
  <b-page-editor/>
</template>
