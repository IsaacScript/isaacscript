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
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  plugins: [
    /** See the `sort-exports` rule below. */
    "sort-exports",
  ],

  rules: {
    /**
     * Defined at: base-typescript-eslint.js
     *
     * Ark120202, the author of TypeScriptToLua, recommends using triple-slash directives.
     */
    "@typescript-eslint/triple-slash-reference": "off",

    /**
     * Defined at: base-jsdoc.js
     *
     * The API documentation does not contain entries for every parameter.
     */
    "jsdoc/require-param-description": "off",

    /** Not defined in the parent configs. */
    "sort-exports/sort-exports": [
      "error",
      {
        sortDir: "asc",
      },
    ],
  },

  overrides: [
    {
      files: ["index.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/enums/flags/*.ts"],
      rules: {
        "@typescript-eslint/no-redeclare": "off",
      },
    },
  ],
};

module.exports = config;
