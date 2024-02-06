import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from 'react'
import { useRef } from 'react'
import useUnmount from './use-unmount'
import { BasicTarget, getTargetElement } from '../utils/dom/getTargetElement'

/**
 * @description 判断 两个依赖数组 是否一样
 * @param oldDeps 旧的依赖数组
 * @param deps 新的依赖数组
 * @returns 返回 boolean
 */
function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) return true
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false
  }
  return true
}

const createEffectWithTarget = (
  useEffectType: typeof useEffect | typeof useLayoutEffect,
) => {
  /**
   *
   * @param effect
   * @param deps
   * @param target target should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
   */
  const useEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
  ) => {
    // 记录是否已经初始化
    const hasInitRef = useRef(false)

    //
    const lastElementRef = useRef<(Element | null)[]>([])
    const lastDepsRef = useRef<DependencyList>([])

    // 卸载时调用的函数
    const unLoadRef = useRef<any>()

    // useEffect(effect)
    // 组件每次更新时调用该方法
    useEffectType(() => {
      // 将 targets 转换成数组
      const targets = Array.isArray(target) ? target : [target]
      const els = targets.map((item) => getTargetElement(item)) as any

      // 初始化运行
      if (!hasInitRef.current) {
        // 记录已初始化
        hasInitRef.current = true
        lastElementRef.current = els
        lastDepsRef.current = deps

        unLoadRef.current = effect()
        return
      }

      /*

      */
      if (
        els.length !== lastElementRef.current.length ||
        !depsAreSame(els, lastElementRef.current) ||
        !depsAreSame(deps, lastDepsRef.current)
      ) {
        unLoadRef.current?.()

        lastElementRef.current = els
        lastDepsRef.current = deps
        unLoadRef.current = effect()
      }
    })

    useUnmount(() => {
      unLoadRef.current?.()
      // for react-refresh
      hasInitRef.current = false
    })
  }

  return useEffectWithTarget
}

const useEffectWithTarget = createEffectWithTarget(useEffect)

export default useEffectWithTarget
