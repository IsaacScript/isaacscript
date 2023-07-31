const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..", "..");

/**
 * This config is meant to be used in the IsaacScript monorepo.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // From:
  // https://github.com/nrwl/nx/blob/master/packages/eslint-plugin-nx/src/configs/typescript.ts
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",

    /** This cannot be simplified to `./../..` because of relative path shenanigans. */
    tsconfigRootDir: REPO_ROOT,
  },

  // The ".prettierrc.cjs" file is ignored by default, so we have to un-ignore it.
  ignorePatterns: ["!.prettierrc.cjs"],

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
