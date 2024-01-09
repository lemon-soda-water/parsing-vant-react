// 判断 val 是否为空值
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}
