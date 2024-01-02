import { BEM, createBEM } from './bem'

// CreateNamespaceReturn 类型是 元组
export type CreateNamespaceReturn = [BEM, string]

/* 
  createNamespace() 方法创建命名空间

  当 prefix 有值时， name = `${prefix}-${name}`，没有值的时候 name = `rv-${name}`
  函数返回一个元组 [createBEM(name), name]
*/
export function createNamespace(
  name: string,
  prefix?: string,
): CreateNamespaceReturn {
  name = `${prefix || 'rv'}-${name}`
  return [createBEM(name), name]
}
