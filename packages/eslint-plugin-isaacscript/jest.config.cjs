/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/tmp/"],
};

module.exports = config;
