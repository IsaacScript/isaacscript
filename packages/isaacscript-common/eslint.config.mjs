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

  {
    ignores: ["eslint.config.mjs", "typedoc.config.mjs"], // TODO: Remove this when converting `projectService`.
  },
);
