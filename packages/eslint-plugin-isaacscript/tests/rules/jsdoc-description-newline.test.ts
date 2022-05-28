import { jsdocDescriptionNewline } from "../../src/rules/jsdoc-description-newline";
import { ruleTester } from "../utils";

ruleTester.run("jsdoc-description-newline", jsdocDescriptionNewline, {
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
