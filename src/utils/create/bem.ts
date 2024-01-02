// Mod 类型是 字符串 或者 对象
export type Mod = string | { [key: string]: any }
// Mods 类型是 Mod 或者 Mod类型的数组
export type Mods = Mod | Mod[]

function gen(name: string, mods?: Mods): string {
  // mods 不存在
  if (!mods) {
    return ''
  }

  // mods 是 字符串
  if (typeof mods === 'string') {
    return ` ${name}--${mods}`
  }

  // mods 是 数组
  if (Array.isArray(mods)) {
    // 用数组 reduce 方法进行 字符串 的拼接
    return (mods as Mod[]).reduce<string>(
      // 递归
      (ret, item) => ret + gen(name, item),
      '',
    )
  }

  // 如果上面的判断都没有经过，mods 就是对象
  return Object.keys(mods).reduce(
    // 用数组 reduce 方法进行 字符串 的拼接
    // 递归
    (ret, key) => ret + (mods[key] ? gen(name, key) : ''),
    '',
  )
}

/* 
  返回一个 bem(el?, mods?) 函数
*/
export function createBEM(name: string) {
  return (el?: Mods, mods?: Mods): Mods => {
    // 判断 el 有值并且 不是 string
    // 当 el 是对象或者是数组时进入判断
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    // el 有值时 el = `${name}__${el}`  没有值时  el = name
    el = el ? `${name}__${el as string}` : name

    // 通过 el 和 mods 返回对应的字符串
    return `${el}${gen(el, mods)}`
  }
}

/* 
  BEM 类型是 (el?: Mods, mods?: Mods) => Mods
  typeof 获取 createBEM 的类型
  ReturnType 获取 函数返回值 的类型
*/
export type BEM = ReturnType<typeof createBEM>
