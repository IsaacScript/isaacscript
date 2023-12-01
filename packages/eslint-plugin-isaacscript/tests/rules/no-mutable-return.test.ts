import { noMutableReturn } from "../../src/rules/no-mutable-return";
import { ruleTester } from "../utils";

ruleTester.run("no-mutable-array-return", noMutableReturn, {
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
    {
      code: `
function getMap(): ReadonlyMap<string, string> {
  return new Map();
}
      `,
    },
    {
      code: `
function getSet(): ReadonlySet<string> {
  return new Set();
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
    {
      code: `
function getMap(): Map<string, string> {
  return new Map();
}
      `,
      errors: [{ messageId: "mutableMap" }],
    },
    {
      code: `
function getSet(): Set<string> {
  return new Set();
}
      `,
      errors: [{ messageId: "mutableSet" }],
    },
  ],
});
