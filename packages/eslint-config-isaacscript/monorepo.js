const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");

/**
 * This config is meant to be used in the IsaacScript monorepo.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // We need to add the `tsconfigRootDir` property, but we must also repeat the options from
  // "base-typescript-eslint.js" or they will be deleted.
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",

    tsconfigRootDir: REPO_ROOT,
    project: true, // https://github.com/typescript-eslint/typescript-eslint/pull/6084
  },

  ignorePatterns: ["**/dist/**"],

  // TODO: try removing this
  settings: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/README.md#importinternal-regex
    // https://github.com/import-js/eslint-plugin-import/issues/2617
    "import/internal-regex": "isaacscript-common-ts",
  },
};

module.exports = config;
