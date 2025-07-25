// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import tseslint from "typescript-eslint";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";
// @ts-expect-error https://github.com/jrdrg/eslint-plugin-sort-exports/issues/44
import ESLintPluginSortExports from "eslint-plugin-sort-exports";

export default tseslint.config(
  ...completeConfigBase,
  ...isaacScriptModConfigBase,

  {
    plugins: {
      "sort-exports": ESLintPluginSortExports,
    },

    rules: {
      /**
       * Defined at: base-typescript-eslint.js
       *
       * Ark120202, the author of TypeScriptToLua, recommends using triple-slash directives.
       */
      "@typescript-eslint/triple-slash-reference": "off",

      /**
       * Defined at: base-jsdoc.js
       *
       * The API documentation does not contain entries for every parameter.
       */
      "jsdoc/require-param-description": "off",

      /** Not defined in the parent configs. */
      "sort-exports/sort-exports": [
        "warn",
        {
          sortDir: "asc",
        },
      ],
    },
  },

  {
    files: ["src/index.ts"],
    rules: {
      "sort-exports/sort-exports": "off",
    },
  },

  {
    files: ["src/enums/flags/*.ts"],
    rules: {
      "@typescript-eslint/no-redeclare": "off",
    },
  },
);
