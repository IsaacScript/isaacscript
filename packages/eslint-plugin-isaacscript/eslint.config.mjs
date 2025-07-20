// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...completeConfigBase,

  {
    rules: {
      /** This rule conflicts with this plugin's testing style. */
      "unicorn/prefer-single-call": "off",

      /** Some rules use bitwise operators to deal with TypeScript bit flags. */
      "no-bitwise": "off",

      /** We commonly trim the incoming text. */
      "no-param-reassign": "off",
    },
  },

  {
    files: ["src/template.ts", "tests/template.ts", "tests/fixtures/file.ts"],
    rules: {
      "unicorn/no-empty-file": "off",
    },
  },
);
