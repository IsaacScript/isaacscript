import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/require-variadic-function-argument";
import { requireVariadicFunctionArgument } from "../../src/rules/require-variadic-function-argument";
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
  name: "Empty variadic function call with mandatory argument",
  code: `
function foo(mandatoryArg: string, ...things: string[]) {}
foo("mandatory");
  `,
  errors: [{ messageId: "noArgument" }],
});

valid.push({
  name: "Normal variadic function call with mandatory argument",
  code: `
function foo(mandatoryArg: string, ...things: string[]) {}
foo("mandatory", "thing");
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

valid.push({
  name: "Using console.log to print a newline",
  code: `
console.log();
  `,
});

valid.push({
  name: "Using console.log normally",
  code: `
console.log("foo");
  `,
});

valid.push({
  name: "Using console.error to print a newline",
  code: `
console.error();
  `,
});

valid.push({
  name: "Using console.error normally",
  code: `
console.error("foo");
  `,
});

valid.push({
  name: "Using setTimeout normally",
  code: `
setTimeout(() => {
  console.error("foo");
}, 1000);
  `,
});

valid.push({
  name: "Using window.setTimeout normally",
  code: `
window.setTimeout(() => {
  console.error("foo");
}, 1000);
  `,
});

valid.push({
  name: "Using setTimeout with arguments",
  code: `
setTimeout((arg) => {
  console.error("foo");
}, 1000, "foo");
  `,
});

valid.push({
  name: "Using window.setTimeout with arguments",
  code: `
window.setTimeout((arg) => {
  console.error("foo");
}, 1000, "foo");
  `,
});

valid.push({
  name: "Using setInterval normally",
  code: `
setInterval(() => {
  console.error("foo");
}, 1000);
  `,
});

valid.push({
  name: "Using window.setInterval normally",
  code: `
setInterval(() => {
  console.error("foo");
}, 1000);
  `,
});

valid.push({
  name: "Using setInterval with arguments",
  code: `
setInterval((arg) => {
  console.error("foo");
}, 1000, "foo");
  `,
});

valid.push({
  name: "Using window.setInterval with arguments",
  code: `
setInterval((arg) => {
  console.error("foo");
}, 1000, "foo");
  `,
});

invalid.push({
  name: "Empty variadic function call with JSDoc comment without tag",
  code: `
/**
 * Helper function to get all of the cars in the database. By default, it will return every car.
 *
 * You can optionally specify one or more car types to return only the cars that match the specified
 * car types.
 */
function foo(...things: string[]) {}
foo();
  `,
  errors: [{ messageId: "noArgument" }],
});

valid.push({
  name: "Empty variadic function call with JSDoc comment with tag",
  code: `
/**
 * Helper function to get all of the cars in the database. By default, it will return every car.
 *
 * You can optionally specify one or more car types to return only the cars that match the specified
 * car types.
 *
 * @allowEmptyVariadic
 */
function foo(...things: string[]) {}
foo();
  `,
});

valid.push({
  name: "Empty variadic function call with bare tag",
  code: `
/** @allowEmptyVariadic */
function foo(...things: string[]) {}
foo();
  `,
});

ruleTester.run(
  "require-variadic-function-argument",
  requireVariadicFunctionArgument,
  {
    valid,
    invalid,
  },
);
