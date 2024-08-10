import { noUselessReturn } from "../../src/rules/no-useless-return.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-useless-return", noUselessReturn, {
  valid: [
    {
      code: `
function foo() {
}
      `,
    },
  ],

  invalid: [
    {
      code: `
function foo() {
  return;
}
      `,
      errors: [{ messageId: "unnecessaryReturn" }],
    },
  ],
});
