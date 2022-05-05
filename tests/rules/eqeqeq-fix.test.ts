import { eqeqeqFix } from "../../src/rules/eqeqeq-fix";
import { ruleTester } from "../utils";

ruleTester.run("eqeqeq-fix", eqeqeqFix, {
  valid: [
    {
      code: `
if (foo === bar) {
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
  ],
});
