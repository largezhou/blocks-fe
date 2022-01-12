import { PositionNumber, PositionStyles } from '@/components/page-editor/typing'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { convertPositionNumberToStyles } from '@/utils/util'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

const placeholderPosition: Ref<PositionNumber> = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
})

const placeholderPositionStyles: ComputedRef<PositionStyles> = computed(() => convertPositionNumberToStyles(placeholderPosition.value))

/**
 * 修改占位元素的位置
 *
 * @param newPosition
 * @param specify 是否直接指定位置，指定位置时，不会吸附到网格上
 */
const changePlaceholderPosition = (newPosition: PositionNumber, specify = false) => {
  let left = newPosition.left ?? placeholderPosition.value.left ?? 0
  let top = newPosition.top ?? placeholderPosition.value.top ?? 0

  if (!specify) {
    left = Math.floor(left / GRID_WIDTH) * GRID_WIDTH
    top = Math.floor(top / GRID_HEIGHT) * GRID_HEIGHT
  }

  placeholderPosition.value.left = left
  placeholderPosition.value.top = top
  placeholderPosition.value.width = newPosition.width ?? placeholderPosition.value.width
  placeholderPosition.value.height = newPosition.height ?? placeholderPosition.value.height
}

export const usePlaceholder = () => ({
  changePlaceholderPosition,
  placeholderPositionStyles,
  placeholderPosition,
})