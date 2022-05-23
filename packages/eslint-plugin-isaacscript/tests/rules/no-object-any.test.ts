import { noObjectAny } from "../../src/rules/no-object-any";
import { ruleTester } from "../utils";

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
    {
      code: `
const mySet: Set<string> = new Set();
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
