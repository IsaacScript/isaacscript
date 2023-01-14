# eslint-config-isaacscript

[![npm version](https://img.shields.io/npm/v/eslint-config-isaacscript.svg)](https://www.npmjs.com/package/eslint-config-isaacscript)

This is a sharable configuration for ESLint that is intended to be used in TypeScript and IsaacScript projects.

This package is consumed by the [`isaacscript-lint`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint) meta-linting package. It is recommended that instead of consuming this package directly, you instead list `isaacscript-lint` as a dependency, as it includes all of the corresponding plugins and so on.

For TypeScript projects, set up your `.eslintrc.js` file to extend from the config like this:

```js
// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    // The linter base is the shared IsaacScript config:
    // https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/base.js
    "eslint-config-isaacscript/base",
  ],

  // Don't bother linting the compiled output.
  ignorePatterns: ["**/dist/**"],

  parserOptions: {
    // ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
    // things to lint correctly. We do not point this at "./tsconfig.json" because certain files
    // (such at this file) should be linted but not included in the actual project output.
    project: "./tsconfig.eslint.json",
  },

  rules: {},
};
```

Please see the [IsaacScript webpage](https://isaacscript.github.io/) for more information.
