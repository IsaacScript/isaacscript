import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "node:path";

export const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: path.join(__dirname, "fixtures"),
  },
});
