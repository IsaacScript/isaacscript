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
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const [key, value] of MY_MAP.entries()) {
}
      `,
    },
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const key of MY_MAP.keys()) {
}
      `,
    },
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const value of MY_MAP.values()) {
}
      `,
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const entry of MY_SET.entries()) {
}
      `,
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const key of MY_SET.keys()) {
}
      `,
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const value of MY_SET.values()) {
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
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const [key, value] of Object.entries(MY_MAP)) {
}
      `,
      errors: [{ messageId: "noObjectEntriesMap" }],
    },
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const key of Object.keys(MY_MAP)) {
}
      `,
      errors: [{ messageId: "noObjectKeysMap" }],
    },
    {
      code: `
declare const MY_MAP: ReadonlyMap<string, string>;
for (const value of Object.values(MY_MAP)) {
}
      `,
      errors: [{ messageId: "noObjectValuesMap" }],
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const entry of Object.entries(MY_SET)) {
}
      `,
      errors: [{ messageId: "noObjectEntriesSet" }],
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const key of Object.keys(MY_SET)) {
}
      `,
      errors: [{ messageId: "noObjectKeysSet" }],
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const value of Object.values(MY_SET)) {
}
      `,
      errors: [{ messageId: "noObjectValuesSet" }],
    },
  ],
});
