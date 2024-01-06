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
    /// project: true, // https://github.com/typescript-eslint/typescript-eslint/pull/6084
    EXPERIMENTAL_useProjectService: true, // https://github.com/typescript-eslint/typescript-eslint/discussions/8030
  },

  ignorePatterns: ["**/dist/**"],

  overrides: [
    // The "isaacscript-common-node" dependency is used in scripts and should never appear in a
    // "package.json" file (if it is only used in script files). This has to be a monorepo disable
    // because in a normal project, "isaacscript-common-node" should be required in
    // "devDependencies".
    {
      files: ["**/scripts/*.{js,cjs,mjs,ts,cts,mts}"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};

module.exports = config;
