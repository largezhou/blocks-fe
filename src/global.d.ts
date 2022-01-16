declare const log: typeof console.log

interface Window {
  log: typeof console.log
  plugins: any

  [key: string]: any
}
