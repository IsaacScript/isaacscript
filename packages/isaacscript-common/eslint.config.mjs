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
      "unicorn/no-useless-template-literals": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/prefer-direct-iteration": "off",
      "unicorn/prefer-else-if": "off",
      "unicorn/prefer-global-number-constants": "off",
      "unicorn/prefer-iterable-in-constructor": "off",
      "unicorn/prefer-minimal-ternary": "off",
      "unicorn/prefer-number-is-safe-integer": "off",
      "unicorn/prefer-simple-condition-first": "off",
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
