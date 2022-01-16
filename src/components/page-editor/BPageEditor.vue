<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BPageEditor',
})
</script>

<script setup lang="ts">
import BLayout from '@/components/layout/BLayout.vue'
import BEditComponentPosition from '@/components/page-editor/BEditComponentPosition.vue'
import useComponents from '@/components/page-editor/composables/useComponents'
import BPlaceholder from '@/components/page-editor/BPlaceholder.vue'
import { PositionNumber, UIComponentSetting } from '@/components/page-editor/typing'
import usePlaceholder from '@/components/page-editor/composables/usePlaceholder'
import BComponentsPanel from '@/components/page-editor/BComponentsPanel.vue'
import useComponentsPanel from '@/components/page-editor/composables/useComponentsPanel'

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

const {
  availableComponents,
} = useComponentsPanel()

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
      <b-components-panel
        :components="availableComponents"
      />
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
.b-workspace {
  position: relative;
}
</style>
