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
      "perfectionist/sort-modules": "error",
    },
  },

  {
    files: ["src/index.ts"],
    rules: {
      "perfectionist/sort-modules": "off",
    },
  },

  {
    files: ["src/enums/flags/*.ts"],
    rules: {
      "@typescript-eslint/no-redeclare": "off",
      "complete/sort-objects": "off",
      "perfectionist/sort-modules": "off",
    },
  },
);
