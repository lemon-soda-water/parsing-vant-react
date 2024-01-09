import React from 'react'
import { LoadingType } from '../Loading/PropsType'
import { BaseTypeProps } from '../utils'

// 按钮类型
export type ButtonType = 'default' | 'primary' | 'info' | 'warning' | 'danger'
// 按钮大小
export type ButtonSize = 'large' | 'normal' | 'small' | 'mini'
// 按钮图标位置
export type ButtonIconPosition = 'right' | 'left'

/*
  HTMLButtonElement： button 元素的类型 如：type、class、id、value...
  React.HTMLAttributes：包含 HTML 元素的类型 和 React 一些自定义的元素类型 如：slot、style、dir...
  Omit<T,K> ：用于删除 T 中包含 K 的类型
*/
export interface ButtonProps
  extends BaseTypeProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * 指定渲染的dom标签
   * @default 'button'
   *
   * HTMLElementTagNameMap： HTMLElementTagNameMap的 key包含 HTML 所有元素的标签名称
   * keyof 获取 HTMLElementTagNameMap 所有的 key
   */
  tag?: keyof HTMLElementTagNameMap | string
  /** 按钮类型 */
  type?: ButtonType
  /** 按钮尺寸 */
  size?: ButtonSize
  /**
   * 按钮文本
   * 业务内建议使用children代替
   * */
  text?: React.ReactNode
  /** 左侧图标 */
  icon?: React.ReactNode
  /** 按钮颜色，支持传入 linear-gradient 渐变色 */
  color?: string
  /** 是否为块级元素(全宽)	 */
  block?: boolean
  /** 是否为朴素按钮	 */
  plain?: boolean
  /** 是否为圆形按钮	 */
  round?: boolean
  /** 是否为方形按钮	 */
  square?: boolean
  /** 是否为阴影按钮 */
  shadow?: boolean | 1 | 2 | 3
  /** 是否显示为加载状态	 */
  loading?: boolean
  /** 是否使用 0.5px 边框	 */
  hairline?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 原生 button 标签的 type 属性	 */
  nativeType?: string
  /** 图标展示位置，可选值为 `right` */
  iconPosition?: ButtonIconPosition
  /** 加载图标大小	 */
  loadingSize?: string
  /**
   * 加载图标类型，可选值为 `spinner`
   * @default circular
   * */
  loadingType?: LoadingType
  /**
   * 加载状态提示文字
   */
  loadingText?: string
  /**
   * 点击事件
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

/* 
  Pick<T, K>: 用于提取 T 类型中，key 含有 K 的类型
*/
export type ButtonGroupProps = BaseTypeProps &
  Pick<
    ButtonProps,
    | 'size'
    | 'type'
    | 'square'
    | 'tag'
    | 'block'
    | 'round'
    | 'plain'
    | 'shadow'
    | 'disabled'
    | 'nativeType'
    | 'iconPosition'
  > & {
    /**
     * 点击事件
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  }
