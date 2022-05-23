const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const REPO_ROOT = path.join(__dirname, "..", "..");

// This is a shared configuration file for ESLint:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  plugins: ["@nrwl/nx"],

  // From:
  // https://github.com/nrwl/nx/blob/master/packages/eslint-plugin-nx/src/configs/typescript.ts
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    /* eslint-disable-next-line isaacscript/complete-sentences-line-comments */
    // This cannot be simplified to "./../.." because of relative path shenanigans.
    tsconfigRootDir: REPO_ROOT,
  },

  rules: {
    "@nrwl/nx/enforce-module-boundaries": [
      "warn",
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [
          {
            sourceTag: "*",
            onlyDependOnLibsWithTags: ["*"],
          },
        ],
      },
    ],

    // This rule has to be told which "package.json" file that the dependencies are located in.
    "import/no-extraneous-dependencies": [
      "warn",
      {
        packageDir: REPO_ROOT,
      },
    ],
  },
};
