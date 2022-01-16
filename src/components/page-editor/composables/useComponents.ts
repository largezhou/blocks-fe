import { DefineComponent, ref, resolveComponent } from 'vue'
import {
  UIComponentSetting,
  ComponentSetting,
  PositionNumber,
} from '@/components/page-editor/typing'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

export default () => {
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
  const selectedId = ref<{ [id: string]: true }>({})

  /**
   * 添加选中的组件
   *
   * @param replace 是否替换当前选中
   * @param idList
   */
  const addSelected = (replace: boolean, idList: string[] | string): void => {
    if (replace) {
      selectedId.value = {}
    }

    if (typeof idList === 'string') {
      idList = [idList]
    }

    idList.forEach((k) => {
      selectedId.value[k] = true
    })
  }

  return {
    components,
    changeComponentPosition,
    componentHasUI,
    selectedId,
    addSelected,
  }
}
