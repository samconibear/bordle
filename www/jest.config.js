module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^/public/svg/.*$": "<rootDir>/tests/__mocks__/fileMock.js",
  },
};
