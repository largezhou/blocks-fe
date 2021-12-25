declare module 'rollup-plugin-external-globals' {
  import { Plugin } from 'rollup'
  const createPlugin: (globals: any) => Plugin
  export default createPlugin
}
