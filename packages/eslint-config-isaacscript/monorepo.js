// This is a shared configuration file for ESLint:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  plugins: ["@nrwl/nx"],

  // From: https://github.com/nrwl/nx/blob/master/packages/eslint-plugin-nx/src/configs/typescript.ts
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: "../..",
  },

  rules: {
    "@nrwl/nx/enforce-module-boundaries": [
      "error",
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
  },
};
