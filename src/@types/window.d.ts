import { logFunc } from '../utils/log'

type ExternalPlugins = {
  [key: string]: Array<string>
}

declare global {
  interface Window {
    log: logFunc
    plugins: ExternalPlugins

    [key: string]: any
  }
}
