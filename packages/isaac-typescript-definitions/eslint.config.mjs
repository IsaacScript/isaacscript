// @ts-check

import tseslint from "typescript-eslint";
import { base } from "../eslint-config-isaacscript/base.js";
import { mod } from "../eslint-config-isaacscript/mod.js";
import { monorepo } from "../eslint-config-isaacscript/monorepo.js";
// @ts-expect-error There are no TypeScript definitions for this plugin.
import ESLintPluginSortExports from "eslint-plugin-sort-exports";

export default tseslint.config(
  ...base,
  ...mod,
  ...monorepo,

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
