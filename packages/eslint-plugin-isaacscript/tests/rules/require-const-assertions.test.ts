import { TSESLint } from "@typescript-eslint/utils";
import {
  MessageIds,
  Options,
  requireConstAssertions,
} from "../../src/rules/require-const-assertions";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Normal object assignment with const assertion",
  code: `
const Foo = {
Value1: 1,
Value2: 2,
Value3: 3,
} as const;
  `,
});

invalid.push({
  name: "Normal object assignment without const assertion",
  code: `
const Foo = {
Value1: 1,
Value2: 2,
Value3: 3,
};
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const Foo = {
Value1: 1,
Value2: 2,
Value3: 3,
} as const;
  `,
});

invalid.push({
  name: "Empty object assignment without const assertion",
  code: `
const Foo = {};
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const Foo = {} as const;
  `,
});

valid.push({
  name: "Number constant declaration",
  code: `
const MY_CONSTANT = 123;
  `,
});

valid.push({
  name: "String constant declaration",
  code: `
const MY_CONSTANT = "foo";
  `,
});

valid.push({
  name: "Array constant declaration",
  code: `
const MY_CONSTANT = [];
  `,
});

ruleTester.run("require-const-assertions", requireConstAssertions, {
  valid,
  invalid,
});
