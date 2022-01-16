import BButton from '@/components/components/button/BButton.vue'
import BInterval from '@/components/components/interval/BInterval.vue'
import BInput from '@/components/components/input/BInput.vue'
import { App } from 'vue'
import { BDefineComponent } from '@/typing'

export const components: BDefineComponent[] = [
  BButton,
  BInterval,
  BInput,
]

export default (app: App) => {
  components.forEach(x => app.component(x.name, x))
}
