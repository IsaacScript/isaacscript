import { TSESLint } from "@typescript-eslint/utils";
import {
  MessageIds,
  noExplicitArrayLoops,
} from "../../src/rules/no-explicit-array-loops";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

valid.push({
  name: "Implicit iteration over array",
  code: `
const myArray = [1, 2, 3];
for (const element of myArray) {}
  `,
});

valid.push({
  name: "Explicit iteration over set",
  code: `
const mySet = new Set();
for (const element of mySet.values()) {}
  `,
});

valid.push({
  name: "Explicit iteration over map",
  code: `
const myMap = new Map();
for (const element of myMap.values()) {}
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

ruleTester.run("no-explicit-array-loops", noExplicitArrayLoops, {
  valid,
  invalid,
});
