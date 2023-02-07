const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

module.exports = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  ignorePatterns: ["**/file-templates/**"],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
     *
     * Not defined in parent configs.
     *
     * We use this to automatically fix import statements to ESM.
     */
    "n/file-extension-in-import": ["error", "always"],

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/shebang.md
     *
     * Defined at:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/base.js
     *
     * This package uses a non-standard output folder, so we have to customize this rule.
     */
    "n/shebang": [
      "error",
      {
        convertPath: {
          "src/**/*.ts": ["^src/(.+?)\\.ts$", "src/$1.js"],
        },
      },
    ],
  },
};
