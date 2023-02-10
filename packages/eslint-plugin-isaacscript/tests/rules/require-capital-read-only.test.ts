import { requireCapitalReadOnly } from "../../src/rules/require-capital-read-only";
import { ruleTester } from "../utils";

ruleTester.run("require-capital-read-only", requireCapitalReadOnly, {
  valid: [
    {
      code: `
const MY_MAP: ReadonlyMap<number, number> = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
      `,
    },
    {
      code: `
const MY_SET: ReadonlySet<number> = new Set([1, 2, 3]);
      `,
    },
    {
      code: `
const MY_ARRAY: readonly number[] = [1, 2, 3];
      `,
    },
  ],

  invalid: [
    {
      code: `
const MY_MAP = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);
      `,
      errors: [{ messageId: "readOnlyMap" }],
    },
    {
      code: `
const MY_SET = new Set([1, 2, 3]);
      `,
      errors: [{ messageId: "readOnlySet" }],
    },
    {
      code: `
const MY_ARRAY = [1, 2, 3];
      `,
      errors: [{ messageId: "readOnlyArray" }],
    },
  ],
});
