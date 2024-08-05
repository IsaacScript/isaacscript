import { noExplicitMapSetLoops } from "../../src/rules/no-explicit-map-set-loops.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-explicit-map-set-loops", noExplicitMapSetLoops, {
  valid: [
    {
      code: `
const myArray = [1, 2, 3];
for (const element of myArray) {}
            `,
    },
    {
      code: `
const MY_ARRAY = [1, 2, 3] as const;
for (const element of MY_ARRAY) {}
            `,
    },
    {
      code: `
const myMap = new Map<string, string>();
for (const [key, value] of myMap) {}
      `,
    },
    {
      code: `
const mySet = new Set<string>();
for (const value of mySet) {}
      `,
    },
    {
      code: `
const MY_MAP: ReadonlyMap<string, string> = new Map();
for (const [key, value] of myMap) {}
      `,
    },
    {
      code: `
const MY_SET: ReadonlySet<string> = new Set();
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
    {
      code: `
const MY_MAP: ReadonlyMap<string, string> = new Map();
for (const [key, value] of MY_MAP.entries()) {}
      `,
      errors: [{ messageId: "noExplicitMap" }],
      output: `
const MY_MAP: ReadonlyMap<string, string> = new Map();
for (const [key, value] of MY_MAP) {}
      `,
    },
    {
      code: `
const MY_SET: ReadonlySet<string> = new Set();
for (const value of MY_SET.values()) {}
      `,
      errors: [{ messageId: "noExplicitSet" }],
      output: `
const MY_SET: ReadonlySet<string> = new Set();
for (const value of MY_SET) {}
      `,
    },
  ],
});
