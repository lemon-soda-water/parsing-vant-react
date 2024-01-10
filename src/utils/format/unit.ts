import { isDef } from '../base'
import { isNumeric } from '../validate/number'

/**
 * @description 传入的数字会转换成字符串。undefined 或 null 直接返回 undefined。 如果传入的字符串是 数值 类型的字符串，则返回 `${value}px`，否则直接返回
 * @param value string | number | undefined
 * @returns string | undefined
 */
export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined
  }

  // eslint-disable-next-line no-param-reassign
  value = String(value)
  return isNumeric(value) ? `${value}px` : value
}

/**
 * @description 根据 originSize 的值，返回 size。如果 originSize 是 数字 的字符串或者number类型的值，那么返回的是 `${originSize}px`，否则直接是 originSize
 * @param originSize string | number | undefined
 * @returns 空对象({}) 或 {width：size, height: size}
 */
export function getSizeStyle(originSize?: string | number) {
  if (isDef(originSize)) {
    const size = addUnit(originSize)
    return {
      width: size,
      height: size,
    }
  }
  return {}
}
