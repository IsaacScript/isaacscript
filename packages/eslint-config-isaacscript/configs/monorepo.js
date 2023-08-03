const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..", "..");

/**
 * This config is meant to be used in the IsaacScript monorepo.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // We need to add the `tsconfigRootDir` property, but we must also repeat the options from
  // "base-typescript-eslint.js" or they will be deleted.
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: REPO_ROOT,
  },

  rules: {
    // This rule has to be told which "package.json" file that the dependencies are located in.
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: REPO_ROOT,
      },
    ],
  },
};

module.exports = config;
