import { onUnmounted } from 'vue'
import { ConvertPositionNumberToStyles } from '@/utils/typing'

/**
 * 在 document 上添加事件，并在 unmounted 的时候移除
 */
export const addEvent = (
  thisOnUnmounted: typeof onUnmounted,
  e: string,
  callback: (...args: any[]) => any,
) => {
  document.addEventListener(e, callback)
  thisOnUnmounted(() => {
    document.removeEventListener(e, callback)
  })
}

/**
 * 获取 el 元素到 targetEl 元素的相对位置
 */
export const getOffsetPositionFrom = (targetEl: HTMLElement, el: HTMLElement) => {
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

export const getValidNumber = (...numbers: (number | undefined | null)[]) => {
  for (const number of numbers) {
    if (typeof number === 'number') {
      return number
    }
  }

  return 0
}

export const convertPositionNumberToStyles: ConvertPositionNumberToStyles = (position, origin) => {
  return {
    left: `${getValidNumber(position.left, origin?.left)}px`,
    top: `${getValidNumber(position.top, origin?.top)}px`,
    width: `${getValidNumber(position.width, origin?.width)}px`,
    height: `${getValidNumber(position.height, origin?.height)}px`,
  }
}

/**
 * 把父类 as 成子类，，，主要用在 模板中，无法使用 as 的情况
 */
export const convertToChildType = <ParentType, ChildType extends ParentType>(source: ParentType): ChildType => {
  return source as ChildType
}
