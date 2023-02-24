import { TSESLint } from "@typescript-eslint/utils";
import {
  MessageIds,
  Options,
  requireVariadicFunctionArgument,
} from "../../src/rules/require-variadic-function-argument";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Normal array.push",
  code: `
const array = [1, 2, 3];
array.push(4);
  `,
});

invalid.push({
  name: "Empty array.push",
  code: `
const array = [1, 2, 3];
array.push();
  `,
  errors: [{ messageId: "noArgument" }],
});

valid.push({
  name: "Normal variadic function call",
  code: `
function foo(...things: string[]) {}
foo("thing");
  `,
});

invalid.push({
  name: "Empty variadic function call",
  code: `
function foo(...things: string[]) {}
foo();
  `,
  errors: [{ messageId: "noArgument" }],
});

ruleTester.run(
  "require-variadic-function-argument",
  requireVariadicFunctionArgument,
  {
    valid,
    invalid,
  },
);
