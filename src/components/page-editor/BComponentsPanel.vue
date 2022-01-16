<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BComponentsPanel',
})
</script>

<script setup lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { BDefineComponent } from '@/typing'

defineProps<{
  components: BDefineComponent[]
}>()

</script>

<template>
  <div class="b-components-panel">
    <div
      v-for="component in components"
      :key="component.name"
      class="b-component-item"
    >
      <b-svg-icon :name="`component-${component.icon ?? '_default'}`"/>
      <span class="b-component-name">{{ component.showName ?? component.name ?? '组件' }}</span>
    </div>
  </div>
</template>

<style lang="less">
.b-components-panel {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;

  .b-component-item {
    flex: 0 50%;
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: #b3b9bf;

    &:hover {
      color: #fff;
    }

    svg {
      font-size: 25px;
    }

    .b-component-name {
      display: block;
    }
  }
}
</style>
