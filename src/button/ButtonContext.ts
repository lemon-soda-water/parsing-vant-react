import { createContext } from 'react'
import { ButtonGroupProps } from './PropsType'

type ButtonContextType = {
  parent?: ButtonGroupProps
}

// 创建 context
const ButtonContext = createContext<ButtonContextType>({})

export default ButtonContext
