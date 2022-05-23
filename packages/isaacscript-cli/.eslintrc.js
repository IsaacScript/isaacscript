module.exports = {
  extends: [
    "../eslint-config-isaacscript/base.js",
    "../eslint-config-isaacscript/monorepo.js",
  ],

  ignorePatterns: ["./file-templates/**"],

  parserOptions: {
    project: "./tsconfig.json",
  },
};
