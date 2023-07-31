import { noForIn } from "../../src/rules/no-for-in";
import { ruleTester } from "../utils";

ruleTester.run("no-for-in", noForIn, {
  valid: [
    {
      code: `
const a = 1;
      `,
    },
  ],

  invalid: [
    {
      code: `
const a = 1;
      `,
      errors: [{ messageId: "foo" }],
    },
  ],
});
