import { noUselessReturnNoFix } from "../../src/rules/no-useless-return-no-fix";
import { ruleTester } from "../utils";

ruleTester.run("no-useless-return-no-fix", noUselessReturnNoFix, {
  valid: [
    {
      code: `
function foo() {
  doSomething();
}
      `,
    },
  ],
  invalid: [
    {
      code: `
function foo() {
  doSomething();
  return;
}
      `,
      errors: [{ messageId: "unnecessaryReturn" }],
    },
  ],
});
