<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
import BLayout from '@/components/layout/BLayout.vue'
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import BEditComponentPosition from '@/components/page-editor/BEditComponentPosition.vue'
import useComponents from '@/components/page-editor/composables/useComponents'
import BPlaceholder from '@/components/page-editor/BPlaceholder.vue'
import { PositionNumber, UIComponentSetting } from '@/components/page-editor/typing'
import usePlaceholder from '@/components/page-editor/composables/usePlaceholder'

const {
  components,
  componentHasUI,
  changeComponentPosition,
  addSelected,
  selectedId,
} = useComponents()

const {
  changePlaceholderPosition,
  placeholderPosition,
  placeholderPositionStyles,
} = usePlaceholder()

const onUpdatePosition = (component: UIComponentSetting, position: Required<PositionNumber>): void => {
  changeComponentPosition(component, position)
  changePlaceholderPosition(position)
}

const onStop = (component: UIComponentSetting): void => {
  changeComponentPosition(component, placeholderPosition.value)
}

const onStart = (component: UIComponentSetting): void => {
  addSelected(true, component.id)
  changePlaceholderPosition(component)
}

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
        <b-placeholder :position-styles="placeholderPositionStyles"/>
        <template
          v-for="component in components"
          :key="component.id"
        >
          <b-edit-component-position
            v-if="componentHasUI(component)"
            :component="component"
            :selected-id="selectedId"
            @update-position="onUpdatePosition"
            @stop="onStop"
            @start="onStart"
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
