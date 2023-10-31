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

  ignorePatterns: ["**/dist/**", "**/file-templates/**"],

  rules: {
    /**
     * Defined in: "isaacscript/recommended"
     *
     * Enums that are used with the API must be numbers since that is what the API expects. We also
     * prefer that unofficial enums are also number enums for consistency.
     */
    "isaacscript/no-number-enums": "off",
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
