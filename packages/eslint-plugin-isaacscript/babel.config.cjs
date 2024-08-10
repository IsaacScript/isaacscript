// A Babel config is necessary to run Jest as documented here:
// https://jestjs.io/docs/getting-started#using-typescript
// (Babel does not support ESM config files as of August 2024, so this file must remain as CJS.)

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
