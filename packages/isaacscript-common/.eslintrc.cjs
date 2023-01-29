/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

module.exports = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Documentation:
     * https://typescript-eslint.io/rules/explicit-member-accessibility/
     *
     * Not defined in parent configs.
     */
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      {
        overrides: {
          constructors: "off",
        },
      },
    ],
  },

  overrides: [
    {
      files: ["./src/functions/**"],
      rules: {
        /**
         * Documentation:
         * https://github.com/jrdrg/eslint-plugin-sort-exports
         *
         * Not defined in parent configs.
         */
        "sort-exports/sort-exports": [
          "warn",
          {
            sortDir: "asc",
          },
        ],
      },
    },
  ],
};
