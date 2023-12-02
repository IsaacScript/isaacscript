import { strictVoidFunctions } from "../../src/rules/strict-void-functions";
import { ruleTester } from "../utils";

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
