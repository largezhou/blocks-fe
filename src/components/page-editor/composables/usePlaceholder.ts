import { PositionNumber, PositionStyles } from '@/components/page-editor/typing'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { convertPositionNumberToStyles } from '@/utils/util'
import { GRID_HEIGHT, GRID_WIDTH } from '@/lib/constants'

export default () => {
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
    const positionKeys: (keyof PositionNumber)[] = ['top', 'left', 'width', 'height']
    for (const key of positionKeys) {
      const value = position[key]
      if (typeof value !== 'number') {
        continue
      }

      let gridValue
      if (key === 'left' || key === 'width') {
        gridValue = GRID_WIDTH
      } else {
        gridValue = GRID_HEIGHT
      }

      placeholderPosition.value[key] = Math.round(value / gridValue) * gridValue
    }
  }

  return {
    changePlaceholderPosition,
    placeholderPositionStyles,
    placeholderPosition,
  }
}
