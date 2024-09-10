/** @type {import("knip").KnipConfig} */
const config = {
  ignore: ["eslint.config.mjs", "prettier.config.mjs"],
  ignoreDependencies: [
    "complete-lint", // This is a linting meta-package.
    "complete-node", // This is provided by "complete-lint".
  ],
  ignoreBinaries: ["tsx"], // This is provided by "complete-lint".
};

export default config;
