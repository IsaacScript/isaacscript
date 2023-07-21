import { RuleTester } from "@typescript-eslint/rule-tester";

export const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: `${__dirname}/fixtures`,
  },
});
