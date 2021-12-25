import '@/utils/log'

import { createApp, defineAsyncComponent } from 'vue'
import App from '@/App.vue'
import 'ant-design-vue/dist/antd.css'
import externalComponent from '@/utils/external-component'

const app = createApp(App)

app.component('BCounter', defineAsyncComponent(() => externalComponent('BCounter')))

app.mount('#app')
