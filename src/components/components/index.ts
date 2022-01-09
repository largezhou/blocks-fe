import BButton from './button/BButton.vue'
import BInterval from './interval/BInterval.vue'
import { App } from 'vue'

const components = [
  BButton,
  BInterval,
]

export default (app: App) => {
  components.forEach(x => app.component(x.name, x))
}
