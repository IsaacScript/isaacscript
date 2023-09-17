const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
  "configs",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  ignorePatterns: ["**/file-templates/**"],

  rules: {
    /**
     * Defined in: "isaacscript/recommended"
     *
     * Enums that are used with the API must be numbers since that is what the API expects. We also
     * prefer that unofficial enums are also number enums for consistency.
     */
    "isaacscript/no-number-enums": "off",

    /**
     * Defined at: base-n.js
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
  },

  overrides: [
    {
      files: ["./src/plugins/*.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};

module.exports = config;
