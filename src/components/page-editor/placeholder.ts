import { PositionNumber, PositionStyles } from '@/components/page-editor/typing'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { convertPositionNumberToStyles } from '@/utils/util'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

const placeholderPosition: Ref<Required<PositionNumber>> = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
})

const placeholderPositionStyles: ComputedRef<PositionStyles> = computed(() => convertPositionNumberToStyles(placeholderPosition.value))

/**
 * 修改占位元素的位置
 *
 * @param position
 */
const changePlaceholderPosition = (position: PositionNumber) => {
  let left = position.left ?? placeholderPosition.value.left ?? 0
  let top = position.top ?? placeholderPosition.value.top ?? 0

  left = Math.round(left / GRID_WIDTH) * GRID_WIDTH
  top = Math.round(top / GRID_HEIGHT) * GRID_HEIGHT

  placeholderPosition.value.left = left
  placeholderPosition.value.top = top
  placeholderPosition.value.width = position.width ?? placeholderPosition.value.width
  placeholderPosition.value.height = position.height ?? placeholderPosition.value.height
}

export const usePlaceholder = () => ({
  changePlaceholderPosition: changePlaceholderPosition,
  placeholderPositionStyles: placeholderPositionStyles,
  placeholderPosition: placeholderPosition,
})
