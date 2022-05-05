import { ESLintUtils } from "@typescript-eslint/utils";

const urlCreator = (name: string) =>
  `https://github.com/IsaacScript/eslint-plugin-isaacscript/blob/main/docs/rules/${name}.md`;
export const createRule = ESLintUtils.RuleCreator(urlCreator);

export const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: `${__dirname}/fixtures`,
  },
});
