// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import ESLintPluginSortExports from "eslint-plugin-sort-exports";
import { defineConfig } from "eslint/config";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default defineConfig(
  ...completeConfigBase,
  ...isaacScriptModConfigBase,

  {
    plugins: {
      /** The `sort-exports` rule is used in some specific files. */
      // @ts-expect-error https://github.com/jrdrg/eslint-plugin-sort-exports/issues/44
      "sort-exports": ESLintPluginSortExports,
    },

    rules: {
      /** Not defined in the parent configs. */
      "@typescript-eslint/explicit-member-accessibility": [
        "warn",
        {
          overrides: {
            constructors: "off",
          },
        },
      ],

      /**
       * Defined at: mod.js
       *
       * Since we transpile this library to both Lua and JavaScript, we need to re-enable this lint
       * rule.
       */
      "@typescript-eslint/require-array-sort-compare": "warn",
    },

    // Having TypeScript rules apply to ".json" files will throw an error about needing type
    // information.
    ignores: ["*.json"],
  },

  {
    files: ["src/functions/**"],
    rules: {
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
    ignores: [
      // When building and linting at the same time, the "indexLua.ts" file can cause a linting
      // error.
      "src/indexLua.ts",
      // Ignore files that were transpiled from Lua to JavaScript.
      "src/lib/jsonLua.js",
    ],
  },
);
