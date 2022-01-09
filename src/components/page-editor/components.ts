import { ISettingWithDefinition, IUISettingWithInstance, PositionNumber } from '@/components/components/typing'
import { Ref, ref, resolveComponent } from 'vue'

type ChangePosition = (index: number, pos: PositionNumber) => void

interface IUseComponents {
  components: Ref<ISettingWithDefinition[]>
  changePosition: ChangePosition
}

const components = ref<ISettingWithDefinition[]>([])
components.value = [
  <IUISettingWithInstance>{
    id: 'b-button-1',
    name: 'BButton',
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    component: resolveComponent('BButton'),
    hasUI: true,
  },
  <IUISettingWithInstance>{
    id: 'b-button-2',
    name: 'BButton',
    left: 0,
    top: 100,
    width: 1,
    height: 1,
    component: resolveComponent('BButton'),
    hasUI: true,
  },
  <ISettingWithDefinition>{
    id: 'b-interval-1',
    name: 'BInterval',
    component: resolveComponent('BInterval'),
    hasUI: false,
  },
]

const changePosition: ChangePosition = (index, position) => {
  const component = components.value[index] as IUISettingWithInstance
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

export const useComponents: () => IUseComponents = () => {
  return {
    components,
    changePosition,
  }
}
