import { noForIn } from "../../src/rules/no-for-in.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-for-in", noForIn, {
  valid: [
    {
      code: `
const array = [1, 2, 3];
for (const element of array) {}
      `,
    },
    {
      code: `
const object = { foo: "bar" };
for (const key of Object.keys(object)) {}
      `,
    },
  ],

  invalid: [
    {
      code: `
const array = [1, 2, 3];
for (const element in array) {}
      `,
      errors: [{ messageId: "noForIn" }],
    },
    {
      code: `
const object = { foo: "bar" };
for (const key in object) {}
      `,
      errors: [{ messageId: "noForIn" }],
    },
  ],
});
