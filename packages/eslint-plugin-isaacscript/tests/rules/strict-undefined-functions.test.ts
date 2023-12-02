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

valid.push({
  name: "declare interface arrow function",
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
