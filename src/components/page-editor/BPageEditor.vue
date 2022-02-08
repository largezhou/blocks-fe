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
import { getComponentDefinition } from '@/utils/util'
import { getCurrentInstance, ref } from 'vue'

const {
  uiComponents,
  changeComponentPosition,
  addSelected,
  selectedId,
  makeNewUIComponentSetting,
  addNewComponent,
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
  if (component.isNew) {
    newUIComponentSetting.value = undefined
    if (placeholderPosition.value.left >= 0 && placeholderPosition.value.top >= 0) {
      addNewComponent(component, placeholderPosition.value)
    }
  } else {
    changeComponentPosition(component, placeholderPosition.value)
  }

  changePlaceholderPosition({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
}

const onSelect = (component: UIComponentSetting): void => {
  addSelected(true, component.id)
}

const newUIComponentSetting = ref<UIComponentSetting>()
const newComponentStartDragEvent = ref<MouseEvent>()
const instance = getCurrentInstance()
const onStartNewComponent = (e: MouseEvent, name: string): void => {
  const cd = getComponentDefinition(instance, name)
  if (!cd) {
    console.warn('组件不存在', name)
    return
  }
  newUIComponentSetting.value = makeNewUIComponentSetting(cd, {
    left: e.clientX - 240,
    top: e.clientY - 112,
  })
  newComponentStartDragEvent.value = e
  addSelected(true, (newUIComponentSetting.value as UIComponentSetting).id)
}

</script>

<template>
  <b-layout>
    <template #sider>
      <b-components-panel
        :components="availableComponents"
        @start="onStartNewComponent"
      />
    </template>
    <template #content>
      <div class="b-workspace">
        <b-placeholder :position-styles="placeholderPositionStyles"/>
        <template
          v-for="component in uiComponents"
          :key="component.id"
        >
          <b-edit-component-position
            :component="component"
            :selected-id="selectedId"
            @update-position="onUpdatePosition"
            @stop="onStop"
            @select="onSelect"
          />
        </template>

        <b-edit-component-position
          v-if="newUIComponentSetting !== undefined"
          :component="newUIComponentSetting"
          :selected-id="selectedId"
          :start-drag-event="newComponentStartDragEvent"
          @update-position="onUpdatePosition"
          @stop="onStop"
        />
      </div>
    </template>
  </b-layout>
</template>

<style lang="less">
.b-workspace {
  position: relative;
}
</style>
