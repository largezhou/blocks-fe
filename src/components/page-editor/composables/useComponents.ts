import { DefineComponent, ref, resolveComponent } from 'vue'

import {
  UIComponentSetting,
  ComponentSetting,
  PositionNumber,
} from '@/components/page-editor/typing'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

const components = ref<ComponentSetting[]>([])
components.value = [
  {
    id: 'b-button-1',
    name: 'BButton',
    left: 12,
    top: 0,
    width: 2 * GRID_WIDTH,
    height: GRID_HEIGHT,
  } as UIComponentSetting,
  {
    id: 'b-button-2',
    name: 'BButton',
    left: 0,
    top: 3 * GRID_HEIGHT,
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
  } as UIComponentSetting,
  {
    id: 'b-interval-1',
    name: 'BInterval',
  } as ComponentSetting,
]

const changeComponentPosition = (component: UIComponentSetting, position: PositionNumber): void => {
  component.left = position.left ?? component.left
  component.top = position.top ?? component.top
  component.width = position.width ?? component.width
  component.height = position.height ?? component.height
}

const componentHasUI = (component: ComponentSetting): boolean => {
  const definition = resolveComponent(component.name) as DefineComponent
  return (typeof definition.minWidthUnit === 'number') && (typeof definition.minHeightUnit === 'number')
}

/**
 * 当前被选中的组件 ID
 */
const selectedId = ref<{ [key: string]: true }>({})

const addSelected = (replace: boolean, keys: string[]): void => {
  if (replace) {
    selectedId.value = {}
  }

  keys.forEach((k) => {
    selectedId.value[k] = true
  })
}

export default () => {
  return {
    components,
    changeComponentPosition,
    componentHasUI,
    selectedId,
    addSelected,
  }
}
