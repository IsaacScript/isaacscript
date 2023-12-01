import { noMutableArrayReturn } from "../../src/rules/no-mutable-array-return";
import { ruleTester } from "../utils";

ruleTester.run("no-mutable-array-return", noMutableArrayReturn, {
  valid: [
    {
      code: `
function getArray(): readonly number[] {
  return [];
}
      `,
    },
    {
      code: `
function getArray(): readonly number[] | readonly string[] {
  return [];
}
      `,
    },
    {
      code: `
function getArray<T>(): ReadonlyArray<T> {
  return [];
}
      `,
    },
  ],

  invalid: [
    {
      code: `
function getArray(): number[] {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
    {
      code: `
function getArray(): string[] {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
    {
      code: `
function getArray(): boolean[] {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
    {
      code: `
function getArray(): readonly number[] | string[] {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
    {
      code: `
function getArray(): number[] | readonly string[] {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
    {
      code: `
function getArray<T>(): Array<T> {
  return [];
}
      `,
      errors: [{ messageId: "mutableArray" }],
    },
  ],
});
