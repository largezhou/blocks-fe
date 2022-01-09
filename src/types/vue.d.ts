export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    minWidthUnit?: number
    minHeightUnit?: number
    isContainer?: boolean
  }
}
