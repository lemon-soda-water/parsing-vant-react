import { useState } from 'react'
import { BasicTarget, getTargetElement } from '../utils/dom/getTargetElement'
import useEffectWithTarget from './use-effect-with-target'

/**
 * IntersectionObserver Api 的 options
 */
export interface Options {
  rootMargin?: string
  threshold?: number | number[]
  root?: BasicTarget<Element>
}

function useInViewport(target: BasicTarget, options?: Options) {
  const [state, setState] = useState<boolean>()
  const [ratio, setRatio] = useState<number>()

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target) as Element

      if (!el) {
        return
      }

      const observer = new IntersectionObserver(
        // 被观察的 元素 开始进入或开始离开 root 时 被调用
        (entries) => {
          // IntersectionObserverEntry
          for (const entry of entries) {
            // entry.intersectionRatio: 目标元素的可见比例。intersectionRect 与 boundingClientRect 的比例值
            setRatio(entry.intersectionRatio)
            // entry.isIntersecting：布尔值，如果目标元素与交叉区域观察者对象 (intersection observer) 的根相交，则返回 true
            setState(entry.isIntersecting)
          }
        },
        {
          ...options,
          // 如果 root 为null，以视口为根元素
          root: getTargetElement(options?.root) as Element,
        },
      )

      // 开始观察 el 元素
      observer.observe(el)

      /**关闭  observer*/
      return () => {
        // 关闭 observer
        observer.disconnect()
      }
    },
    [],
    target,
  )

  return [state, ratio] as const
}

export default useInViewport
