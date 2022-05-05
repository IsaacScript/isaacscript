import { ruleTester } from "../utils";
import { eqeqeqFix } from "./eqeqeq-fix";

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
