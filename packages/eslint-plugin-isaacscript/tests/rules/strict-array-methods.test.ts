import { strictArrayMethods } from "../../src/rules/strict-array-methods";
import { ruleTester } from "../utils";

ruleTester.run("strict-array-methods", strictArrayMethods, {
  valid: [
    {
      code: `
const numbers: number[] = [];
const filteredNumbers = numbers.filter((element) => {
  return element !== 0;
});
      `,
    },
    {
      code: `
const numbers: number[] = [];
function filterFunc(element: number) {
  return element !== 0;
}
const filteredNumbers = numbers.filter(filterFunc);
      `,
    },
    {
      code: `
const numbers: number[] = [];
function filterFunc(element: number): boolean {
  return element !== 0;
}
const filteredNumbers = numbers.filter(filterFunc);
      `,
    },
  ],

  invalid: [
    {
      code: `
const numbers: number[] = [];
const filteredNumbers = numbers.filter((element) => {
  return element;
});
      `,
      errors: [{ messageId: "conditionError" }],
    },
    {
      code: `
const numbers: number[] = [];
function filterFunc(element: number) {
  return element;
}
const filteredNumbers = numbers.filter(filterFunc);
      `,
      errors: [{ messageId: "conditionError" }],
    },
    {
      code: `
const numbers: number[] = [];
function filterFunc(element: number): number {
  return element;
}
const filteredNumbers = numbers.filter(filterFunc);
      `,
      errors: [{ messageId: "conditionError" }],
    },
  ],
});
