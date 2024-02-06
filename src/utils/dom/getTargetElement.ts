import { MutableRefObject } from 'react'

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>

export type TargetElement = HTMLElement | Element | Document | Window

/**
 * @description target 不存在，返回defaultElement。target 是 函数 返回 函数的调用； 是 ref，则返回 ref.current；不是函数和ref，直接返回自身
 * @param target BasicTarget<TargetElement>
 * @param defaultElement TargetElemen
 * @returns TargetElement | undefined | null
 */
export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}
