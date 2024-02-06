import { isDev } from './is-dev'

/**
 * @description 在开发环境中，对一些不规范的行为进行警告
 * @param component 组件名称
 * @param message 需要被打印的信息
 */
export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[react-vant: ${component}] ${message}`)
  }
}
