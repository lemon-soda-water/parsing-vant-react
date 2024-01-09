/**
 * @description 判断给定的字符串是否是数字
 * @param val 字符串
 * @returns 返回布尔值
 */
export function isNumeric(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val)
}
