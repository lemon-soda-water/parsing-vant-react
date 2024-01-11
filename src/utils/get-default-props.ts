/** 合并 props */
/**
 * @description 将 对象 身上的属性和值 合并 到 item[0] 身上
 * @param items object[]
 * @returns 新的 props
 */
export function mergeProps(...items: any[]) {
  // result 为当前组件的 props
  const result = { ...items[0] }
  items.forEach((item) => {
    for (const key in item) {
      const val = item[key]
      // props 有该属性时用 props身上的属性，没有时，使用合并后的属性
      // eslint-disable-next-line no-prototype-builtins
      result[key] = result.hasOwnProperty(key) ? result[key] : val
    }
  })
  return result
}
