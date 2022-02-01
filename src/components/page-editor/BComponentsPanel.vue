<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BComponentsPanel',
})
</script>

<script setup lang="ts">
import BSvgIcon from '@/components/svg-icon/BSvgIcon.vue'
import { DefineComponent, onBeforeUnmount, ref } from 'vue'
import { addEvent, componentHasUI } from '@/utils/util'

defineProps<{
  components: DefineComponent[]
}>()

interface Emits {
  (e: 'start', event: MouseEvent, name: string): void
}

const emit = defineEmits<Emits>()

const isMoving = ref(false)
const onMousedown = (e: MouseEvent): void => {
  if (e.buttons !== 1) {
    return
  }

  isMoving.value = true
}

const onMousemove = (e: MouseEvent, component: DefineComponent): void => {
  if (!isMoving.value) {
    return
  }

  emit('start', e, component.name)
}

addEvent(onBeforeUnmount, 'mouseup', () => {
  isMoving.value = false
})

</script>

<template>
  <div class="b-components-panel">
    <template
      v-for="component in components"
      :key="component.name"
    >
      <div
        v-if="componentHasUI(component)"
        class="b-component-item"
        @mousedown.stop.prevent="onMousedown"
        @mousemove.stop.prevent="(e: MouseEvent) => onMousemove(e, component)"
      >
        <b-svg-icon :name="`component-${component.icon ?? '_default'}`"/>
        <span class="b-component-name">{{ component.showName ?? component.name }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less">
.b-components-panel {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .b-component-item {
    flex-basis: 50%;
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 4px 0;
    text-align: center;
    color: #b3b9bf;
    user-select: none;

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
