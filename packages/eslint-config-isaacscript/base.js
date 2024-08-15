import ESLintPluginIsaacScript from "eslint-plugin-isaacscript";
import tseslint from "typescript-eslint";
import { baseDeprecation } from "./configs/base-deprecation.js";
import { baseESLint } from "./configs/base-eslint.js";
import { baseImportX } from "./configs/base-import-x.js";
import { baseJSDoc } from "./configs/base-jsdoc.js";
import { baseN } from "./configs/base-n.js";
import { baseStylistic } from "./configs/base-stylistic.js";
import { baseTypeScriptESLint } from "./configs/base-typescript-eslint.js";
import { baseUnicorn } from "./configs/base-unicorn.js";

// Hot-patch "eslint-plugin-isaacscript" to convert errors to warnings.
for (const config of ESLintPluginIsaacScript.configs.recommended) {
  if (config.rules !== undefined) {
    for (const [key, value] of Object.entries(config.rules)) {
      if (value === "error") {
        config.rules[key] = "warn";
      }
    }
  }
}

/**
 * This ESLint config is meant to be used as a base for all TypeScript projects.
 *
 * Rule modifications are split out into different files for better organization (based on the
 * originating plugin) .
 */
export const base = tseslint.config(
  ...baseESLint,
  ...baseTypeScriptESLint,
  ...baseStylistic,
  ...baseImportX,
  ...baseJSDoc,
  ...baseN, // "n" stands for Node.
  ...baseUnicorn,
  ...baseDeprecation,

  // `eslint-plugin-isaacscript` provides extra miscellaneous rules to keep code safe:
  // https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript
  ...ESLintPluginIsaacScript.configs.recommended,

  // We prefer the official `reportUnusedDisableDirectives` linter option over the 3rd-party plugin
  // of "eslint-plugin-eslint-comments".
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },

  {
    // By default, ESLint ignores "**/node_modules/" and ".git/":
    // https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
    // We also ignore want to ignore the "dist" directory since it is the idiomatic place for
    // compiled output.
    ignores: ["**/dist/"],
  },
);
