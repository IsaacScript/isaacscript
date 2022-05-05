import { ESLintUtils } from "@typescript-eslint/utils";

const urlCreator = () => "";
export const createRule = ESLintUtils.RuleCreator(urlCreator);

export const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: `${__dirname}/fixtures`,
  },
});
