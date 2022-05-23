import { ESLintUtils } from "@typescript-eslint/utils";

export const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: `${__dirname}/fixtures`,
  },
});
