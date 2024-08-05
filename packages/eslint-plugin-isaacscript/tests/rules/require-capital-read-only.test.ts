import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/require-capital-read-only.js";
import { requireCapitalReadOnly } from "../../src/rules/require-capital-read-only.js";
import { ruleTester } from "../utils.js";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Read-only map",
  code: `
const MY_MAP: ReadonlyMap<number, number> = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
  `,
});

valid.push({
  name: "Read-only set",
  code: `
const MY_SET: ReadonlySet<number> = new Set([1, 2, 3]);
  `,
});

valid.push({
  name: "Read-only array",
  code: `
const MY_ARRAY: readonly number[] = [1, 2, 3];
  `,
});

valid.push({
  name: "Read-only object",
  code: `
interface Foo {
  foo: number;
  bar: number;
}

const MY_OBJECT: Readonly<Foo> = {
  foo: 123,
  bar: 456,
};
  `,
});

invalid.push({
  name: "Writable map",
  code: `
const MY_MAP = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
  `,
  errors: [{ messageId: "readOnlyMap" }],
});

invalid.push({
  name: "Writable set",
  code: `
const MY_SET = new Set([1, 2, 3]);
  `,
  errors: [{ messageId: "readOnlySet" }],
});

invalid.push({
  name: "Writable array",
  code: `
const MY_ARRAY = [1, 2, 3];
  `,
  errors: [{ messageId: "readOnlyArray" }],
});

invalid.push({
  name: "Writable object",
  code: `
interface Foo {
  foo: number;
  bar: number;
}

const MY_OBJECT = {
  foo: 123,
  bar: 456,
};
  `,
  errors: [{ messageId: "readOnlyObject" }],
});

ruleTester.run("require-capital-read-only", requireCapitalReadOnly, {
  valid,
  invalid,
});
