import { useEffect } from 'react'
import useLatest from './use-latest'
import { isFunction } from '../utils'
import { devWarning } from '../utils/dev-log'

/**
 * @description 组件卸载时触发的函数
 * @param fn 函数
 */
const useUnmount = (fn: () => void) => {
  if (!isFunction(fn)) {
    devWarning(
      'useUnmount',
      `expected parameter is a function, got ${typeof fn}`,
    )
  }

  const fnRef = useLatest(fn)

  useEffect(
    () => () => {
      fnRef.current()
    },
    [],
  )
}

export default useUnmount
