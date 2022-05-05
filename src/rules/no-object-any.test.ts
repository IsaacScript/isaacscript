import { ruleTester } from "../utils";
import { noObjectAny } from "./no-object-any";

ruleTester.run("no-object-any", noObjectAny, {
  valid: [
    {
      code: `
const myMap = new Map<string, string>();
      `,
    },
    {
      code: `
const myArray: string[] = [];
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
const myMap = new Map();
      `,
      errors: [{ messageId: "noType" }, { messageId: "noType" }],
    },
    {
      code: `
const myArray = [];
      `,
      errors: [{ messageId: "noType" }],
    },
  ],
});
