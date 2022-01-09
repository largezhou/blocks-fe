import { onUnmounted } from 'vue'

export const addEvent: (
  thisOnUnmounted: typeof onUnmounted,
  e: string,
  callback: (...args: any[]) => any) => void =
  (thisOnUnmounted, e, callback) => {
    document.addEventListener(e, callback)
    thisOnUnmounted(() => {
      document.removeEventListener(e, callback)
    })
  }
