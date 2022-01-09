import { DefineComponent } from '@vue/runtime-core'

interface IWithComponentDefinition {
  component?: DefineComponent
  hasUI?: boolean
}

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

export type ISettingWithDefinition = IComponentSetting & IWithComponentDefinition

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

export type IUISettingWithInstance = IUIComponentSetting & ISettingWithDefinition

export interface PositionNumber {
  left?: number
  top?: number
  width?: number
  height?: number
}
