import { DefineComponent, ref, resolveComponent } from 'vue'

import {
  UIComponentSetting,
  ComponentSetting, PositionNumber,
} from './typing'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'
import { getValidNumber } from '@/utils/util'

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
    top: 100,
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
  } as UIComponentSetting,
  {
    id: 'b-interval-1',
    name: 'BInterval',
  } as ComponentSetting,
]

const changeComponentPosition = (component: UIComponentSetting, position: PositionNumber): void => {
  if (typeof component.left !== 'number') {
    console.warn('不是 UI 组件')
    return
  }

  component.left = getValidNumber(position.left, component.left)
  component.top = getValidNumber(position.top, component.top)
  component.width = getValidNumber(position.width, component.width)
  component.height = getValidNumber(position.height, component.height)
}

const hasUIMap: { [key: string]: boolean } = {}
const componentHasUI = (component: ComponentSetting): boolean => {
  if (hasUIMap[component.name] === undefined) {
    hasUIMap[component.name] = typeof (resolveComponent(component.name) as DefineComponent).minWidthUnit === 'number'
  }
  return hasUIMap[component.name]
}

export const useComponents = () => {
  return {
    components,
    changeComponentPosition,
    componentHasUI,
  }
}
