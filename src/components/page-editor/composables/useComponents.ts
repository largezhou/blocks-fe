import { DefineComponent, ref, resolveComponent } from 'vue'
import {
  UIComponentSetting,
  ComponentSetting,
  PositionNumber,
} from '@/components/page-editor/typing'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

export default () => {
  const components = ref<ComponentSetting[]>([])

  const a: UIComponentSetting = {
    id: 'b-input-1',
    name: 'BInput',
    setting: {
      label: '请输入姓名',
      placeholder: '',
      extra: '支持模糊搜索',
    },

    left: 0,
    top: 0,
    width: 3 * GRID_WIDTH,
    height: 2 * GRID_HEIGHT,
  }
  const b: UIComponentSetting = {
    id: 'b-button-1',
    name: 'BButton',
    setting: {
      danger: true,
      text: '删除',
    },
    left: 0,
    top: 2 * GRID_HEIGHT,
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
  }
  const c: UIComponentSetting = {
    id: 'b-button-2',
    name: 'BButton',
    setting: {
      type: 'default',
      text: '上传文件',
    },
    left: GRID_WIDTH,
    top: 2 * GRID_HEIGHT,
    width: 2 * GRID_WIDTH,
    height: GRID_HEIGHT,
  }

  components.value = [
    a,
    b,
    c,
    {
      id: 'b-interval-1',
      name: 'BInterval',
      setting: {},
    },
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
