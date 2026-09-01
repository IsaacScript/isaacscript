// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default defineConfig(
  ...completeConfigBase,
  ...isaacScriptModConfigBase,

  {
    rules: {
      /**
       * Not defined in the parent configs.
       *
       * Requiring "public constructor" everywhere is undesirable.
       */
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
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
      "@typescript-eslint/require-array-sort-compare": "error",

      // TODO
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-unary-minus": "off",
    },
  },

  {
    files: ["src/functions/**"],
    rules: {
      /** Not defined in the parent configs. */
      "perfectionist/sort-modules": "error",
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
