// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/latest/use/configure/

// @ts-check

import { completeConfigBase } from "eslint-config-complete"; // eslint-disable-line import-x/no-extraneous-dependencies
import { isaacScriptModConfigBase } from "eslint-config-isaacscript"; // eslint-disable-line import-x/no-extraneous-dependencies
import tseslint from "typescript-eslint"; // eslint-disable-line import-x/no-extraneous-dependencies

export default tseslint.config(
  // https://github.com/complete-ts/complete/blob/main/packages/eslint-config-complete/src/base.js
  ...completeConfigBase,

  // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/src/base.js
  ...isaacScriptModConfigBase,

  {
    rules: {
      // Insert changed or disabled rules here, if necessary.
    },
  },
);
