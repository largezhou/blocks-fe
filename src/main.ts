import '@/utils/log'

import { createApp, defineAsyncComponent } from 'vue'
import App from '@/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import externalComponent from '@/utils/external-component'
import '@/styles/index.less'
import 'virtual:svg-icons-register'

import UI from '@/components/components'

const app = createApp(App)

app.use(Antd)
app.use(UI)

for (const pluginName of Object.keys(window.plugins)) {
  app.component(pluginName, defineAsyncComponent(() => externalComponent(pluginName)))
}

app.mount('#app')
