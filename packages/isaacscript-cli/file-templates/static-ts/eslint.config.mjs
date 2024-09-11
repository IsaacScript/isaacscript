// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/latest/use/configure/

// @ts-check

import { completeConfigBase } from "eslint-config-complete"; // eslint-disable-line import-x/no-extraneous-dependencies
import tseslint from "typescript-eslint"; // eslint-disable-line import-x/no-extraneous-dependencies

export default tseslint.config(
  // https://github.com/complete-ts/complete/blob/main/packages/eslint-config-complete/src/base.js
  ...completeConfigBase,

  {
    rules: {
      // Insert changed or disabled rules here, if necessary.
    },
  },
);
