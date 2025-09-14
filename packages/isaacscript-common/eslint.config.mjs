// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import ESLintPluginSortExports from "eslint-plugin-sort-exports";
import { defineConfig } from "eslint/config"; // eslint-disable-line import-x/no-extraneous-dependencies
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

// TODO: // @ts-expect-error https://github.com/jrdrg/eslint-plugin-sort-exports/issues/44

export default defineConfig(
  // @ts-expect-error TODO
  ...completeConfigBase,
  ...isaacScriptModConfigBase,

  {
    plugins: {
      /** The `sort-exports` rule is used in some specific files. */
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
