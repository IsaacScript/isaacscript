// @ts-check

export default {
  // Even though we are not using `ts-jest`, we must apply the same ESM fix as documented here:
  // https://github.com/swc-project/jest/issues/64#issuecomment-1029753225
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
