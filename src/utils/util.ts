import { onUnmounted } from 'vue'
import { PositionNumber, PositionStyles } from '@/components/page-editor/typing'

/**
 * 在 document 上添加事件，并在 unmounted 的时候移除
 */
export const addEvent = (thisOnUnmounted: typeof onUnmounted, e: string, callback: (...args: any[]) => any): void => {
  document.addEventListener(e, callback)
  thisOnUnmounted(() => {
    document.removeEventListener(e, callback)
  })
}

/**
 * 获取 el 元素到 targetEl 元素的相对位置
 */
export const getOffsetPositionFrom = (targetEl: HTMLElement, el: HTMLElement): Required<Pick<PositionNumber, 'left' | 'top'>> => {
  let left = 0
  let top = 0

  while (el !== null && el !== targetEl) {
    left += el.offsetLeft
    top += el.offsetTop

    el = el.parentNode as HTMLElement
  }

  if (el === null) {
    left = 0
    top = 0
  }

  return {
    left,
    top,
  }
}

export const convertPositionNumberToStyles = (position: PositionNumber, origin?: PositionNumber): PositionStyles => {
  return {
    left: `${position.left ?? origin?.left ?? 0}px`,
    top: `${position.top ?? origin?.top ?? 0}px`,
    width: `${position.width ?? origin?.width ?? 0}px`,
    height: `${position.height ?? origin?.height ?? 0}px`,
  }
}
