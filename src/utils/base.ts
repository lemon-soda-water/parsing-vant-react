// 判断 val 是否是被定义的值(不为null和undefined)
/**
 * @description 判断 val 是否是 被定义的值(不为null和undefined)
 * @param val any
 * @returns 返回布尔值
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}
