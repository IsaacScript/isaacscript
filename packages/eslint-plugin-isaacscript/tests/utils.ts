import { RuleTester } from "@typescript-eslint/rule-tester";
import path from "node:path";

export const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "fixtures", "tsconfig.json"),
  },
});
