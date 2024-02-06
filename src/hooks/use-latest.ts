import { useRef } from 'react'

/**
 * @description 使用 useRef() 保存函数（ useRef()方法不会因为组件内的更新而改变 ）
 * @param value 任意值
 * @returns 返回一个 ref 引用
 */
function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}

export default useLatest
