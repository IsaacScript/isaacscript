/**
 * This ESLint config is meant to be used as a base for all TypeScript projects.
 *
 *  @type {import("eslint").Linter.Config}
 */
const config = {
  extends: [
    /**
     * Find deprecated code:
     * https://github.com/gund/eslint-plugin-deprecation
     */
    "plugin:deprecation/recommended",

    /**
     * This provides extra miscellaneous rules to keep code safe:
     * https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript
     */
    "plugin:isaacscript/recommended",

    /**
     * Disable any ESLint rules that conflict with Prettier:
     * https://github.com/prettier/eslint-config-prettier
     * Otherwise, we will have unfixable ESLint errors. Note that the Prettier config has to be
     * before the base ESLint config below since we customize some special rules as documented here:
     * https://github.com/prettier/eslint-config-prettier#special-rules
     */
    "prettier",

    /**
     * Rule modifications are split out into different files for better organization (based on the
     * originating plugin) .
     */
    "./configs/base-eslint",
    "./configs/base-no-autofix",
    "./configs/base-typescript-eslint",
    "./configs/base-eslint-comments",
    "./configs/base-import",
    "./configs/base-jsdoc",
    "./configs/base-n", // "n" stands for Node.
    "./configs/base-unicorn",
  ],

  plugins: [
    /**
     * Activate the "eslint-plugin-only-warn" plugin to change all errors to warnings:
     * https://github.com/bfanger/eslint-plugin-only-warn
     *
     * This allows the end-user to more easily distinguish between errors from the TypeScript
     * compiler (which show up in red) and ESLint rule violations (which show up in yellow).
     */
    "only-warn",
  ],

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "isaacscript/no-let-any": "off",
        "isaacscript/no-object-any": "off",
        "isaacscript/require-capital-const-assertions": "off",
        "isaacscript/require-capital-read-only": "off",
      },
    },
  ],
};

module.exports = config;
