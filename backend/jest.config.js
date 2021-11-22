module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src/$1',
  },
};
