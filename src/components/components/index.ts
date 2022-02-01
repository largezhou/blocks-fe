import BButton from '@/components/components/button/BButton.vue'
import BInterval from '@/components/components/interval/BInterval.vue'
import BInput from '@/components/components/input/BInput.vue'
import { App, DefineComponent } from 'vue'

export const components: unknown[] = [
  BButton,
  BInterval,
  BInput,
]

export default (app: App) => {
  components.forEach((x) => {
    const y = x as DefineComponent
    if (typeof y.name === 'string') {
      app.component(y.name, y)
    }
  })
}
