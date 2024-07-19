import { noUndefinedReturnType } from "../../src/rules/no-undefined-return-type.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-undefined-return-type", noUndefinedReturnType, {
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
function foo() {
  return;
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
      errors: [{ messageId: "undefinedReturnType" }],
    },
    {
      code: `
function foo() {
  return undefined;
}
      `,
      errors: [{ messageId: "undefinedReturnType" }],
    },
  ],
});
