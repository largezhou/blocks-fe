import { DefineComponent, defineComponent } from 'vue'

export type BDefineComponent = ReturnType<typeof defineComponent> & DefineComponent
