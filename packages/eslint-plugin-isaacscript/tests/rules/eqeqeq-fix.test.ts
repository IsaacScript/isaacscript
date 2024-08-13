import { eqeqeqFix } from "../../src/rules/eqeqeq-fix.js";
import { ruleTester } from "../utils.js";

ruleTester.run("eqeqeq-fix", eqeqeqFix, {
  valid: [
    {
      code: `
if (foo === bar) {
}
      `,
      only: true,
    },
    {
      code: `
if (foo !== bar) {
}
      `,
    },
  ],

  invalid: [
    {
      code: `
if (foo == bar) {
}
      `,
      errors: [{ messageId: "unexpected" }],
      output: `
if (foo === bar) {
}
      `,
    },
    {
      code: `
if (foo != bar) {
}
      `,
      errors: [{ messageId: "unexpected" }],
      output: `
if (foo !== bar) {
}
      `,
    },
  ],
});
