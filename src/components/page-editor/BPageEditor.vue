<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
import BLayout from '@/components/layout/BLayout.vue'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import BEditUiComponent from '@/components/page-editor/BEditUiComponent.vue'
import BEditNonUiComponent from '@/components/page-editor/BEditNonUiComponent.vue'
import { useComponents } from '@/components/page-editor/components'

const { components } = useComponents()
window.tt = components
</script>

<template>
  <b-layout>
    <template #sider>
      <div class="b-components-panel">
        <div
          v-for="j in 10"
          :key="j"
          class="b-component-item"
        >
          <b-svg-icon name="component-input"/>
          <span class="b-component-name">这是什么组件</span>
        </div>
      </div>
    </template>
    <template #content>
      <div class="b-workspace">
        <template
          v-for="(component, index) in components"
          :key="component.id"
        >
          <b-edit-ui-component
            v-if="component.hasUI"
            :component="component"
            :component-index="index"
          />
          <b-edit-non-ui-component
            v-else
            :component="component"
          />
        </template>
      </div>
    </template>
  </b-layout>
</template>

<style lang="less">
.b-components-panel {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .b-component-item {
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

.b-workspace {
  position: relative;
}
</style>
