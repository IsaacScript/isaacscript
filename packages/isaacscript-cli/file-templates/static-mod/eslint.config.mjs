// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/latest/use/configure/

// @ts-check

import { isaacscriptConfigBase } from "eslint-config-isaacscript";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // We use "eslint-config-isaacscript" as the base of the config:
  // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/src/base.js
  ...isaacscriptConfigBase,

  {
    rules: {
      // Insert changed or disabled rules here, if necessary.
    },
  },
);
