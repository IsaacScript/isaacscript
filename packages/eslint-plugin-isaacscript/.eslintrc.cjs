const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  ignorePatterns: ["**/dist/**", "eqeqeq-fix.ts"],

  rules: {
    /**
     * Defined at: base-n.js
     *
     * ESLint plugins do not support ESM until version 9 is released:
     * https://github.com/eslint/eslint/issues/15453#issuecomment-1002015088
     */
    "n/file-extension-in-import": "off",

    /**
     * Defined at: base-unicorn.js
     *
     * This is a common pattern in the testing files.
     */
    "unicorn/no-array-push-push": "off",

    /**
     * Defined at: base-unicorn.js
     *
     * The ESLint API uses `null`.
     */
    "unicorn/no-null": "off",

    /**
     * Defined at: base-unicorn.js
     *
     * See this package's "tsconfig.json" file. This can be removed when the plugin migrates to ESM.
     */
    "unicorn/prefer-module": "off",

    /**
     * Defined at: base-unicorn.js
     *
     * See this package's "tsconfig.json" file. This can be removed when the plugin migrates to ESM.
     */
    "unicorn/prefer-top-level-await": "off",

    /**
     * Defined at: base-eslint.js
     *
     * Some rules use bitwise operators to deal with TypeScript bit flags.
     */
    "no-bitwise": "off",

    /**
     * Defined at: base-eslint.js
     *
     * We commonly trim the incoming text.
     */
    "no-param-reassign": "off",
  },

  overrides: [
    {
      files: ["src/template.ts", "tests/template.ts", "tests/fixtures/file.ts"],
      rules: {
        "unicorn/no-empty-file": "off",
      },
    },
  ],
};

module.exports = config;
