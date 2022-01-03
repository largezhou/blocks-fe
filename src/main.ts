import '@/utils/log'

import { createApp, defineAsyncComponent } from 'vue'
import App from '@/App.vue'
import 'ant-design-vue/dist/antd.css'
import externalComponent from '@/utils/external-component'
import '@/styles/index.less'
import 'virtual:svg-icons-register'

const app = createApp(App)

for (const pluginName of Object.keys(window.plugins)) {
  app.component(pluginName, defineAsyncComponent(() => externalComponent(pluginName)))
}

app.mount('#app')
