import { noExplicitMapSetLoops } from "../../src/rules/no-explicit-map-set-loops";
import { ruleTester } from "../utils";

ruleTester.run("no-explicit-map-set-loops", noExplicitMapSetLoops, {
  valid: [
    {
      code: `
const myMap = new Map();
for (const [key, value] of myMap) {}
      `,
    },
    {
      code: `
const mySet = new Set();
for (const value of mySet) {}
      `,
    },
  ],

  invalid: [
    {
      code: `
const myMap = new Map();
for (const [key, value] of myMap.entries()) {}
      `,
      errors: [{ messageId: "noExplicitMap" }],
      output: `
const myMap = new Map();
for (const [key, value] of myMap) {}
      `,
    },
    {
      code: `
const mySet = new Set();
for (const value of mySet.values()) {}
      `,
      errors: [{ messageId: "noExplicitSet" }],
      output: `
const mySet = new Set();
for (const value of mySet) {}
      `,
    },
  ],
});
