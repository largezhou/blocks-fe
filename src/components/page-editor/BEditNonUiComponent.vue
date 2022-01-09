<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BEditNonUIComponent',
})
</script>

<script setup lang="ts">
import { IComponentSetting } from '@/components/components/typing'

defineProps<{
  component: IComponentSetting
}>()
</script>

<template>
  <component :is="component.name" class="b-non-ui-component"/>
</template>

<style lang="less">
.b-non-ui-component {
  display: none;
  width: 0;
  height: 0;
  position: fixed;
}
</style>
