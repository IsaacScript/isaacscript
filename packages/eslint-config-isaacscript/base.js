import ESLintPluginIsaacScript from "eslint-plugin-isaacscript";
import tseslint from "typescript-eslint";
/// import { baseDeprecation } from "./configs/base-deprecation.js";
/// import { baseDisableAutofix } from "./configs/base-disable-autofix.js";
import { baseESLintComments } from "./configs/base-eslint-comments.js";
import { baseESLint } from "./configs/base-eslint.js";
import { baseImportX } from "./configs/base-import-x.js";
/// import { baseJSDoc } from "./configs/base-jsdoc.js";
/// import { baseN } from "./configs/base-n.js";
import { baseTypeScriptESLint } from "./configs/base-typescript-eslint.js";
/// import { baseUnicorn } from "./configs/base-unicorn.js";

// Activate "eslint-plugin-only-warn" to change all errors to warnings:
// https://github.com/bfanger/eslint-plugin-only-warn
// This allows the end-user to more easily distinguish between errors from the TypeScript compiler
// (which show up in red) and ESLint rule violations (which show up in yellow). However, we must
// import the plugin for side-effects according to this issue:
// https://github.com/bfanger/eslint-plugin-only-warn/issues/13#issuecomment-2041657774
// eslint-disable-next-line import-x/no-unassigned-import
import "eslint-plugin-only-warn";

/**
 * This ESLint config is meant to be used as a base for all TypeScript projects.
 *
 * Rule modifications are split out into different files for better organization (based on the
 * originating plugin) .
 */
export const base = tseslint.config(
  ...baseESLint,
  /// ...baseDisableAutofix,
  ...baseTypeScriptESLint,
  ...baseESLintComments,
  ...baseImportX,
  /// ...baseJSDoc,
  /// ...baseN, // "n" stands for Node.
  /// ...baseUnicorn,
  /// ...baseDeprecation,

  // `eslint-plugin-isaacscript` provides extra miscellaneous rules to keep code safe:
  // https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript
  ...ESLintPluginIsaacScript.configs.recommended,
);
