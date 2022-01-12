export interface PositionStyles {
  left: string
  top: string
  width: string
  height: string
}

export interface PositionNumber {
  left?: number
  top?: number
  width?: number
  height?: number
}

export interface ComponentSetting {
  /**
   * 组件名
   */
  name: string
  /**
   * 唯一 ID
   */
  id: string
}

export interface UIComponentSetting extends ComponentSetting, Required<PositionNumber> {
}
