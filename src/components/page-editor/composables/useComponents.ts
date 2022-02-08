import { DefineComponent, ref } from 'vue'
import {
  UIComponentSetting,
  PositionNumber,
} from '@/components/page-editor/typing'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'
import { componentHasUI } from '@/utils/util'

export default () => {
  const uiComponents = ref<UIComponentSetting[]>([])

  uiComponents.value = [
    {
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
    },
    {
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
    },
    {
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
    },
  ]

  const changeComponentPosition = (component: UIComponentSetting, position: PositionNumber): void => {
    component.left = position.left ?? component.left
    component.top = position.top ?? component.top
    component.width = position.width ?? component.width
    component.height = position.height ?? component.height
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

  const makeNewUIComponentSetting = (
    cd: DefineComponent,
    initPosition: Required<Pick<PositionNumber, 'left' | 'top'>>,
  ): UIComponentSetting | undefined => {
    if (!componentHasUI(cd)) {
      console.warn('非 UI 组件', cd)
      return undefined
    }

    const id = `${cd.name}-${Math.random().toString(36).slice(-8)}`

    const width = (cd.minWidthUnit as number) * GRID_WIDTH
    const height = (cd.minHeightUnit as number) * GRID_HEIGHT

    return {
      id,
      name: cd.name,
      top: initPosition.top - 10,
      left: initPosition.left - 10,
      width,
      height,
      setting: {},
      isNew: true,
    }
  }

  const addNewComponent = (component: UIComponentSetting, position: PositionNumber): void => {
    const newComponent = { ...component }
    delete newComponent.isNew
    uiComponents.value.push(newComponent)

    changeComponentPosition(newComponent, position)
  }

  return {
    uiComponents,
    changeComponentPosition,
    selectedId,
    addSelected,
    makeNewUIComponentSetting,
    addNewComponent,
  }
}
