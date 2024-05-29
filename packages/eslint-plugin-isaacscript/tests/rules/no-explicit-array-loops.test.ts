import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/no-explicit-array-loops.js";
import { noExplicitArrayLoops } from "../../src/rules/no-explicit-array-loops.js";
import { ruleTester } from "../utils.js";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Implicit iteration over array",
  code: `
const myArray = [1, 2, 3];
for (const element of myArray) {}
  `,
});

valid.push({
  name: "Implicit iteration over read-only array",
  code: `
const MY_ARRAY = [1, 2, 3] as const;
for (const element of MY_ARRAY) {}
  `,
});

valid.push({
  name: "Implicit iteration over map",
  code: `
const myMap = new Map<string, string>();
for (const [key, value] of myMap) {}
  `,
});

valid.push({
  name: "Implicit iteration over read-only map",
  code: `
const MY_MAP: ReadonlyMap<string, string> = new Map();
for (const [key, value] of MY_MAP) {}
  `,
});

valid.push({
  name: "Implicit iteration over set",
  code: `
const mySet = new Set<string>();
for (const value of mySet) {}
  `,
});

valid.push({
  name: "Implicit iteration over read-only set",
  code: `
const MY_SET = new ReadonlySet<string>();
for (const value of MY_SET) {}
  `,
});

valid.push({
  name: "Explicit iteration over map",
  code: `
const myMap = new Map<string, string>();
for (const element of myMap.entries()) {}
  `,
});

valid.push({
  name: "Explicit iteration over read-only map",
  code: `
const MY_MAP: ReadonlyMap<string, string> = new Map();
for (const [key, value] of MY_MAP.entries()) {}
  `,
});

valid.push({
  name: "Explicit iteration over set",
  code: `
const mySet = new Set<string>();
for (const value of mySet.values()) {}
  `,
});

valid.push({
  name: "Explicit iteration over read-only set",
  code: `
const MY_SET: ReadonlySet<string> = new Set();
for (const value of MY_SET.values()) {}
  `,
});

invalid.push({
  name: "Explicit iteration over array",
  code: `
const myArray = [1, 2, 3];
for (const element of myArray.values()) {}
  `,
  errors: [{ messageId: "noExplicitArray" }],
  output: `
const myArray = [1, 2, 3];
for (const element of myArray) {}
  `,
});

invalid.push({
  name: "Explicit iteration over read-only array",
  code: `
const MY_ARRAY: readonly number[] = [1, 2, 3];
for (const element of MY_ARRAY.values()) {}
  `,
  errors: [{ messageId: "noExplicitArray" }],
  output: `
const MY_ARRAY: readonly number[] = [1, 2, 3];
for (const element of MY_ARRAY) {}
  `,
});

invalid.push({
  name: "Explicit iteration over array as const",
  code: `
const MY_ARRAY = [1, 2, 3] as const;
for (const element of MY_ARRAY.values()) {}
  `,
  errors: [{ messageId: "noExplicitArray" }],
  output: `
const MY_ARRAY = [1, 2, 3] as const;
for (const element of MY_ARRAY) {}
  `,
});

valid.push({
  name: "Iterating over a method with an argument",
  code: `
const data = "1a2a3";
for (const line of data.split("a")) {}
  `,
});

invalid.push({
  name: "Using Object.values",
  code: `
const myArray = [1, 2, 3];
for (const element of Object.values(myArray)) {}
  `,
  errors: [{ messageId: "noExplicitArray" }],
  output: `
const myArray = [1, 2, 3];
for (const element of myArray) {}
  `,
});

ruleTester.run("no-explicit-array-loops", noExplicitArrayLoops, {
  valid,
  invalid,
});
