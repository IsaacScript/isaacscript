// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...completeConfigBase,

  {
    rules: {
      // TODO: https://github.com/eslint/eslint/issues/20272
      "@typescript-eslint/unified-signatures": "off",
    },
  },

  {
    files: ["**/copied/*.ts"],
    rules: {
      /**
       * Defined in: "complete/recommended"
       *
       * Enums that are used with the API must be numbers since that is what the API expects. We
       * also prefer that unofficial enums are also number enums for consistency.
       */
      "complete/no-number-enums": "off",
    },
  },

  // TSTL plugins must export a default object as a design limitation.
  {
    files: ["**/plugins/*.ts"],
    rules: {
      "import-x/no-default-export": "off",
    },
  },

  {
    ignores: [
      // We do not want to lint template files, since they do not have valid code inside of them
      // yet.
      "**/file-templates/**",

      // We do not want to lint the compiled plugins. (Unlike other files, they are compiled to the
      // same directory as the ones that contain the source code.)
      "**/plugins/*.cjs",
    ],
  },
);
