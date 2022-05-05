import { ruleTester } from "../utils";
import { noLetAny } from "./no-let-any";

ruleTester.run("no-let-any", noLetAny, {
  valid: [
    {
      code: `
let foo: string[];
      `,
    },
    {
      code: `
let foo: unknown;
      `,
    },
    {
      code: `
const myArray = [0, 1];
let [, secondElement] = myArray;
      `,
    },
  ],
  invalid: [
    {
      code: `
let foo;
      `,
      errors: [{ messageId: "noType" }],
    },
    {
      code: `
let foo: any;
      `,
      errors: [{ messageId: "noType" }],
    },
  ],
});
