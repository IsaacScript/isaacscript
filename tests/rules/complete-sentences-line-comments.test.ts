import { completeSentencesLineComments } from "../../src/rules/complete-sentences-line-comments";
import { ruleTester } from "../utils";

ruleTester.run("complete-sentences-line-comments", completeSentencesLineComments, {
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
