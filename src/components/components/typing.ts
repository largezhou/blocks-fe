import { Ref } from 'vue'

export interface IComponentSetting {
  /**
   * 组件名
   */
  name: string
  /**
   * 唯一 ID
   */
  id: string
}

export interface IUIComponentSetting extends IComponentSetting {
  /**
   * 组件位置左
   */
  left: number
  /**
   * 组件位置上
   */
  top: number
  /**
   * 组件占用的宽度单位
   */
  width: number
  /**
   * 组件占用的高度单位
   */
  height: number
}

export interface PositionNumber {
  left?: number
  top?: number
  width?: number
  height?: number
}
export type ChangePosition = (index: number, pos: PositionNumber) => void
export type HasUI = (component: IComponentSetting) => boolean

export interface IUseComponents {
  components: Ref<IComponentSetting[]>
  changePosition: ChangePosition
  hasUI: HasUI
}
