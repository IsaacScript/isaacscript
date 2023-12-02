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
  name: "void function returns void",
  code: `
function foo(): void {
  return;
}
  `,
});

valid.push({
  name: "void function returns nothing",
  code: `
function foo(): void {}
  `,
});

valid.push({
  name: "only number function returns 0",
  code: `
function foo(): number {
  return 0;
}
  `,
});

valid.push({
  name: "only undefined function returns undefined",
  code: `
function foo(): undefined {
  return undefined;
}
  `,
});

invalid.push({
  name: "only undefined function returns void",
  code: `
function foo(): undefined {
  return;
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "only undefined function returns nothing",
  code: `
function foo(): undefined {}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

valid.push({
  name: "number or undefined function returns undefined",
  code: `
function foo(): number | undefined {
  return undefined;
}
  `,
});

invalid.push({
  name: "number or undefined function returns void",
  code: `
function foo(): number | undefined {
  return;
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "number or undefined function returns nothing",
  code: `
function foo(): number | undefined {}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "number or undefined function with condition returns nothing",
  code: `
declare const someCondition: boolean;
function foo(): number | undefined {
  if (someCondition) {
    return undefined;
  }
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

invalid.push({
  name: "unannotated function with condition returns nothing",
  code: `
declare const someCondition: boolean;
function foo() {
  if (someCondition) {
    return undefined;
  }
}
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

valid.push({
  name: "unannotated arrow function returns undefined",
  code: `
const foo = () => undefined;
  `,
});

valid.push({
  name: "undefined arrow function returns undefined",
  code: `
const foo = (): undefined => undefined;
  `,
});

invalid.push({
  name: "undefined arrow function returns void",
  code: `
const foo = (): undefined => {
  return;
};
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});

// This test cannot work as long as "ArrowFunctionExpression:exit" is commented out (which causes
// other false positives).
/*
invalid.push({
  name: "unannotated arrow function with condition returns void",
  code: `
declare const someCondition: boolean;
const foo = (): undefined => {
  if (someCondition) {
    return undefined;
  }
};
  `,
  errors: [{ messageId: "mismatchedReturnType" }],
});
*/

valid.push({
  name: "declare interface arrow function with condition returns void",
  code: `
declare interface Foo {
  Get: (id: number) => number | undefined;
}
  `,
});

ruleTester.run("strict-undefined-functions", strictUndefinedFunctions, {
  valid,
  invalid,
});
