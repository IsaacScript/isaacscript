import { jsdocCodeBlock } from "../../src/rules/jsdoc-code-block";
import { ruleTester } from "../utils";

ruleTester.run("jsdoc-code-block", jsdocCodeBlock, {
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
