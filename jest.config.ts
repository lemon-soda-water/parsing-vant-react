import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    verbose: true,
    // 使用 ts-jest 来处理 tsx
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // jest 测试环境
    testEnvironment: 'jsdom',
    // 测试文件匹配规则
    testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|tsx?)$',
    // 忽略的文件
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    // 处理css、less、scss、css module文件
    moduleNameMapper: {
      '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    },
    // 快照格式化工具
    snapshotSerializers: ['jest-serializer-html'],
  }
}
