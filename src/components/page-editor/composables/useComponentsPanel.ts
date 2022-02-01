import { components } from '@/components/components'
import { DefineComponent } from 'vue'

export default () => {
  return {
    availableComponents: components as DefineComponent[],
  }
}
