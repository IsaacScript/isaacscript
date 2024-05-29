import { noConfusingSetMethods } from "../../src/rules/no-confusing-set-methods.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-confusing-set-methods", noConfusingSetMethods, {
  valid: [
    {
      code: `
declare const mySet: Set<string>;
for (const key of mySet) {}
      `,
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const key of MY_SET) {}
      `,
    },
  ],

  invalid: [
    {
      code: `
declare const mySet: Set<string>;
for (const key of mySet.keys()) {}
      `,
      errors: [{ messageId: "noKeys" }],
    },
    {
      code: `
declare const mySet: Set<string>;
for (const [key, value] of mySet.entries()) {}
      `,
      errors: [{ messageId: "noEntries" }],
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const key of MY_SET.keys()) {}
      `,
      errors: [{ messageId: "noKeys" }],
    },
    {
      code: `
declare const MY_SET: ReadonlySet<string>;
for (const [key, value] of MY_SET.entries()) {}
      `,
      errors: [{ messageId: "noEntries" }],
    },
  ],
});
