module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
