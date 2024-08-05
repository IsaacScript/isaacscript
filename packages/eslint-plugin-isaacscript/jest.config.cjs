/** @type {import("ts-jest/dist/types").JestConfigWithTsJest} */
const config = {
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  preset: "ts-jest/presets/default-esm",

  // https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // https://github.com/swc-project/jest/issues/64#issuecomment-1029753225
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

module.exports = config;
