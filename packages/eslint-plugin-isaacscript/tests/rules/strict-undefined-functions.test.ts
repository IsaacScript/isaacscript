import { strictUndefinedFunctions } from "../../src/rules/strict-undefined-functions";
import { ruleTester } from "../utils";

ruleTester.run("strict-undefined-functions", strictUndefinedFunctions, {
  valid: [
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
function foo(): undefined {
  return;
}
      `,
      errors: [{ messageId: "mismatchedReturnType" }],
    },

    /*
    {
      code: `
function foo(): undefined {}
      `,
      errors: [{ messageId: "mismatchedReturnType" }],
    },
    */
  ],
});
