import React from 'react'
import clsx from 'clsx'
import { SkeletonProps } from './PropsType'
import { addUnit, createNamespace, getSizeStyle } from '../utils'
import { mergeProps } from '../utils/get-default-props'

/** 默认row宽度  */
const DEFAULT_ROW_WIDTH = '100%'
/** 默认 last row 宽度 */
const DEFAULT_LAST_ROW_WIDTH = '60%'

// 创建 css命名空间
const [bem] = createNamespace('skeleton')

const Skeleton: React.FC<SkeletonProps> = ({
  children,
  className,
  style,
  ...p
}) => {
  // 设置 props 默认值
  const props = mergeProps(p, {
    loading: true,
    animate: true,
    round: true,
    row: 3,
    avatarShape: 'round',
    rowWidth: DEFAULT_ROW_WIDTH,
  })

  /** 获取 row 宽度 */
  const getRowWidth = (index: number) => {
    const { rowWidth } = props

    /* 
      让 最后一个段落 宽度为 60%

      rowWidth === DEFAULT_ROW_WIDTH：如果 段落宽 为 '100%'
      index === +props.row - 1：如果 index 为最后一个
      index !== 0：index 不是第一个时
      进入true条件

      这里 index !== 0 防止 props.row = 1 时，进入判断
    */
    if (
      rowWidth === DEFAULT_ROW_WIDTH &&
      index === +props.row - 1 &&
      index !== 0
    ) {
      return DEFAULT_LAST_ROW_WIDTH
    }

    // 当 rowWidth 为数组时， 每一个段落的宽度对应数组的下标所保存的元素
    if (Array.isArray(rowWidth)) {
      return rowWidth[index]
    }

    return rowWidth
  }

  /** 获取 row 高度 */
  const getRowHeight = (index: number) => {
    const { rowHeight } = props

    // rowHeight 是数组时，根据索引获取row对应高度
    if (Array.isArray(rowHeight)) {
      return rowHeight[index]
    }

    return rowHeight
  }

  // 渲染 头像 部分
  const renderAvatar = () => {
    if (props.avatar) {
      return (
        <div
          className={clsx(bem('avatar', props.avatarShape))}
          // getSizeStyle() 返回的对象是 { width: props.avatarSize, height: props.avatarSize }，这里是设置头像的 宽高
          style={getSizeStyle(props.avatarSize)}
        />
      )
    }
    return null
  }

  // 渲染 标题 部分
  const renderTitle = () => {
    if (props.title) {
      // 获取 标题 宽度
      const width = addUnit(props.titleWidth)
      // 获取 标题 高度（这里是 props.rowHeight)
      const height = addUnit(getRowHeight(0))
      return <div className={clsx(bem('title'))} style={{ width, height }} />
    }
    return null
  }

  // 渲染 段落
  const renderRows = () =>
    Array(props.row)
      .fill('')
      .map((_, i) => {
        // 获取 段落 对应的 宽和高
        const width = addUnit(getRowWidth(i))
        const height = addUnit(getRowHeight(i))
        // eslint-disable-next-line react/no-array-index-key
        return (
          <div key={i} className={clsx(bem('row'))} style={{ width, height }} />
        )
      })

  // loading 加载结束之后，直接返回 children 组件
  if (!props.loading) return <>{children}</>
  return (
    <div
      className={clsx(
        className,
        bem({ animate: props.animate, round: props.round }),
      )}
      style={style}
    >
      {/* 渲染头像部分 */}
      {renderAvatar()}
      <div className={clsx(bem('content'))}>
        {/* 渲染 title */}
        {renderTitle()}
        {/* 渲染 每一行  */}
        {renderRows()}
      </div>
    </div>
  )
}

export default Skeleton
