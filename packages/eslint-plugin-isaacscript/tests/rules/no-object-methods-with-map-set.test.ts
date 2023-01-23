import { noObjectMethodsWithMapSet } from "../../src/rules/no-object-methods-with-map-set";
import { ruleTester } from "../utils";

ruleTester.run("no-object-methods-with-map-set", noObjectMethodsWithMapSet, {
  valid: [
    {
      code: `
declare const myMap: Map<string, string>;
for (const [key, value] of myMap.entries()) {
}
      `,
    },
    {
      code: `
declare const myMap: Map<string, string>;
for (const key of myMap.keys()) {
}
      `,
    },
    {
      code: `
declare const myMap: Map<string, string>;
for (const value of myMap.values()) {
}
      `,
    },
    {
      code: `
declare const mySet: Set<string>;
for (const entry of mySet.entries()) {
}
      `,
    },
    {
      code: `
declare const mySet: Set<string>;
for (const key of mySet.keys()) {
}
      `,
    },
    {
      code: `
declare const mySet: Set<string>;
for (const value of mySet.values()) {
}
      `,
    },
  ],

  invalid: [
    {
      code: `
declare const myMap: Map<string, string>;
for (const [key, value] of Object.entries(myMap)) {
}
      `,
      errors: [{ messageId: "noObjectEntriesMap" }],
    },
    {
      code: `
declare const myMap: Map<string, string>;
for (const key of Object.keys(myMap)) {
}
      `,
      errors: [{ messageId: "noObjectKeysMap" }],
    },
    {
      code: `
declare const myMap: Map<string, string>;
for (const value of Object.values(myMap)) {
}
      `,
      errors: [{ messageId: "noObjectValuesMap" }],
    },
    {
      code: `
declare const mySet: Set<string>;
for (const entry of Object.entries(mySet)) {
}
      `,
      errors: [{ messageId: "noObjectEntriesSet" }],
    },
    {
      code: `
declare const mySet: Set<string>;
for (const key of Object.keys(mySet)) {
}
      `,
      errors: [{ messageId: "noObjectKeysSet" }],
    },
    {
      code: `
declare const mySet: Set<string>;
for (const value of Object.values(mySet)) {
}
      `,
      errors: [{ messageId: "noObjectValuesSet" }],
    },
  ],
});
