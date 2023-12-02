import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/strict-undefined-functions";
import { strictUndefinedFunctions } from "../../src/rules/strict-undefined-functions";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "only number returns 0",
  code: `
function foo(): number {
  return 0;
}
  `,
});

valid.push({
  name: "only undefined returns undefined",
  code: `
declare const someCondition: boolean;
function foo(): undefined {
  return undefined;
}
  `,
});

invalid.push({
  name: "only undefined returns void",
  code: `
function foo(): undefined {
  return;
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "only undefined returns nothing",
  code: `
declare const someCondition: boolean;
function foo(): undefined {
  if (someCondition) {
    return undefined;
  }
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

valid.push({
  name: "number or undefined returns undefined",
  code: `
function foo(): number | undefined {
  return undefined;
}
  `,
});

invalid.push({
  name: "number or undefined returns void",
  code: `
function foo(): number | undefined {
  return;
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "number or undefined returns nothing",
  code: `
function foo(): number | undefined {}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

ruleTester.run("strict-undefined-functions", strictUndefinedFunctions, {
  valid,
  invalid,
});
