import {
  ChangePosition,
  IUseComponents,
  IUIComponentSetting,
  IComponentSetting, HasUI,
} from '@/components/components/typing'
import { DefineComponent, ref, resolveComponent } from 'vue'

const components = ref<IComponentSetting[]>([])
components.value = [
  <IUIComponentSetting>{
    id: 'b-button-1',
    name: 'BButton',
    left: 0,
    top: 0,
    width: 1,
    height: 1,
  },
  <IUIComponentSetting>{
    id: 'b-button-2',
    name: 'BButton',
    left: 0,
    top: 100,
    width: 1,
    height: 1,
  },
  <IComponentSetting>{
    id: 'b-interval-1',
    name: 'BInterval',
  },
]

const changePosition: ChangePosition = (index, position) => {
  const component = components.value[index] as IUIComponentSetting
  if (component === undefined) {
    console.warn(`[ ${index} ] 组件不存在`)
    return
  }

  if (typeof component.left !== 'number') {
    console.warn(`[ ${index} ] 组件不是 UI 组件`)
    return
  }

  component.left = position.left || component.left
  component.top = position.top || component.top
  component.width = position.width || component.width
  component.height = position.height || component.height
}

const hasUIMap: { [key: string]: boolean } = {}
const hasUI: HasUI = (component) => {
  if (hasUIMap[component.name] === undefined) {
    hasUIMap[component.name] = typeof (resolveComponent(component.name) as DefineComponent).minWidthUnit === 'number'
  }
  return hasUIMap[component.name]
}

export const useComponents: () => IUseComponents = () => {
  return {
    components,
    changePosition,
    hasUI,
  }
}
