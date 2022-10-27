import { TSESLint } from "@typescript-eslint/utils";
import {
  MessageIds,
  noExplicitArrayLoops,
  Options,
} from "../../src/rules/no-explicit-array-loops";
import { ruleTester } from "../utils";

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

valid.push({
  name: "Iterating over a method with an argument",
  code: `
const data = "1a2a3";
for (const line of data.split("a")) {}
  `,
});

ruleTester.run("no-explicit-array-loops", noExplicitArrayLoops, {
  valid,
  invalid,
});
