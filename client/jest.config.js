/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 여기서 '<rootDir>'는 프로젝트의 루트 디렉토리를 가리키고, 'src/'는 TypeScript의 baseUrl에 해당합니다.
  },
};
