/* eslint-disable sort-keys */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/sandbox/**/*.ts'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      function: 100,
      lines: 100,
      statements: 100,
    },
  },
};
