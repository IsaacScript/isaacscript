/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tmp/"],

  /** Required in order for `ts-jest` to work with ESM. */
  resolver: "ts-jest-resolver",
};
