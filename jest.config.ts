import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@apps(|/.*)$': '<rootDir>/apps/$1',
    '^@libs(|/.*)$': '<rootDir>/libs/$1',
  },
  transformIgnorePatterns: ['/node_modules'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
