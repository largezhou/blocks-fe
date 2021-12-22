export type logFunc = (...data: any[]) => void

const log: logFunc = console.log.bind(console)

window.log = log
