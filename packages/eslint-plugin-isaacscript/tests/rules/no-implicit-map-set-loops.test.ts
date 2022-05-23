import { noImplicitMapSetLoops } from "../../src/rules/no-implicit-map-set-loops";
import { ruleTester } from "../utils";

ruleTester.run("no-implicit-map-set-loops", noImplicitMapSetLoops, {
  valid: [
    {
      code: `
const myMap = new Map();
for (const [key, value] of myMap.entries()) {}
      `,
    },
    {
      code: `
const mySet = new Set();
for (const value of mySet.values()) {}
      `,
    },
  ],
  invalid: [
    {
      code: `
const myMap = new Map();
for (const [key, value] of myMap) {}
      `,
      errors: [{ messageId: "noImplicitMap" }],
      output: `
const myMap = new Map();
for (const [key, value] of myMap.entries()) {}
      `,
    },
    {
      code: `
const mySet = new Set();
for (const value of mySet) {}
      `,
      errors: [{ messageId: "noImplicitSet" }],
      output: `
const mySet = new Set();
for (const value of mySet.values()) {}
      `,
    },
  ],
});
