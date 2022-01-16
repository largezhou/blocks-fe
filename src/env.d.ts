/// <reference types="vite/client" />

declare module '*.vue' {
  import { BDefineComponent } from '@/typing'
  const component: BDefineComponent
  export default component
}
