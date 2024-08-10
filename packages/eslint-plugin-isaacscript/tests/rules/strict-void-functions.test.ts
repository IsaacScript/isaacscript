import { strictVoidFunctions } from "../../src/rules/strict-void-functions.js";
import { ruleTester } from "../utils.js";

ruleTester.run("strict-void-functions", strictVoidFunctions, {
  valid: [
    {
      code: `
function foo(): void {
  return;
}
      `,
    },
    {
      code: `
function foo(): undefined {
  return undefined;
}
      `,
    },
  ],

  invalid: [
    {
      code: `
function foo(): void {
  return undefined;
}
      `,
      errors: [{ messageId: "mismatchedReturnType" }],
    },
  ],
});
