declare const log: (...data: any[]) => void

interface Window {
  log: (...data: any[]) => void
  plugins: any

  [key: string]: any
}
