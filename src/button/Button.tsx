import { cloneElement, useContext, useMemo } from 'react'
import { createNamespace } from '../utils/create'
import { ButtonProps } from './PropsType'
import ButtonContext from './ButtonContext'
import clsx from 'clsx'
import { BORDER_SURROUND, SHADOW, WHITE } from '../utils/constant'
import Loading from '../Loading'

const [bem] = createNamespace('button')

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    color,
    loading,
    className,
    hairline,
    loadingText,
    round,
    square,
    plain: _plain,
    block: _block,
    loadingType,
    nativeType: _nativeType,
    iconPosition: _iconPosition,
    ...restProps
  } = props

  const { parent } = useContext(ButtonContext)

  /* 
    useMemo(cb, [dep])

    只有当 dep 的值发生改变的时候，cb才会重新调用
  */
  // 按钮大小
  const size = useMemo(
    () => props.size || parent?.size || 'normal',
    [parent?.size, props.size],
  )

  // 按钮类型
  const type = useMemo(
    () => props.type || parent?.type || 'default',
    [parent?.type, props.type],
  )

  // 是否为朴素元素
  const plain = useMemo(() => _plain ?? parent?.plain, [parent?.plain, _plain])

  // 是否为块级元素
  const block = useMemo(() => _block ?? parent?.block, [parent?.block, _block])

  // 图标的位置
  const iconPosition = useMemo(
    () => _iconPosition || parent?.iconPosition || 'left',
    [parent?.iconPosition, _iconPosition],
  )

  // 是否禁用按钮
  const disabled = useMemo(
    () => props.disabled ?? parent?.disabled,
    [parent?.disabled, props.disabled],
  )

  // 原生 button 标签的 type 属性
  const nativeType = useMemo(
    () => _nativeType || parent?.nativeType || 'button',
    [parent?.nativeType, _nativeType],
  )

  // html元素的标签名，这里默认是 button
  const tag = useMemo(
    () => props.tag || parent?.tag || 'button',
    [parent?.tag, props.tag],
  )

  // 标签名 默认是 button
  const TagElement = tag as React.ElementType

  // 合并 className
  const classes = clsx(
    className,
    bem([
      type,
      size,
      {
        plain,
        loading,
        disabled,
        hairline,
        block,
        round,
        square,
      },
    ]),
    { [BORDER_SURROUND]: hairline },
    props.shadow && `${SHADOW}--${+props.shadow}`,
  )
  // Record 构建一个对象类型，key 是 string 类型， value 是 string 或 number 类型
  const style: Record<string, string | number> = { ...props.style }

  if (color) {
    // plain 判断是否为朴素元素  字体颜色
    style.color = plain ? color : WHITE

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color
    }

    // 当 color 为 linear-gradient 时隐藏边框
    if (color.indexOf('gradient') !== -1) {
      style.border = 0
    } else {
      style.borderColor = color
    }
  }

  // 点击事件
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 当不是加载状态，不是禁用状态，并且 有传递点击事件
    if (!loading && !disabled && props.onClick) {
      // 调用点击事件，并把事件对象传递回去
      props.onClick(event)
    }
  }

  const renderLoadingIcon = () => {
    if (loading) {
      const { loadingSize = '20px' } = props
      return (
        <Loading
          className={clsx(bem('loading'))}
          size={loadingSize}
          type={loadingType}
          color={type === 'default' ? undefined : ''}
        />
      )
    }
    return null
  }

  const renderIcon = () => {
    if (props.loading) {
      return renderLoadingIcon()
    }

    if (props.icon) {
      return cloneElement(props.icon as React.ReactElement, {
        className: clsx(bem('icon')),
      })
    }

    return null
  }

  // 渲染文本
  const renderText = () => {
    let text
    if (loading) {
      text = loadingText
    } else {
      text = props.children || props.text
    }

    if (text) {
      return (
        <span key="text" className={clsx(bem('text'))}>
          {text}
        </span>
      )
    }
    return null
  }

  const renderContent = () => (
    <div className={clsx(bem('content'))}>
      {iconPosition === 'left' && renderIcon()}
      {renderText()}
      {iconPosition === 'right' && renderIcon()}
    </div>
  )

  return (
    <TagElement
      {...restProps}
      disabled={disabled}
      className={classes}
      style={style}
      type={nativeType}
      onClick={onClick}
    >
      {renderContent()}
    </TagElement>
  )
}

export default Button
