import { noEmptyLineComments } from "../../src/rules/no-empty-line-comments";
import { ruleTester } from "../utils";

ruleTester.run("no-empty-line-comments", noEmptyLineComments, {
  valid: [
    {
      code: `
// A
      `,
    },
    {
      code: `
const foo = 123; // A
      `,
    },
  ],

  invalid: [
    {
      code: `
//
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
//
//
      `,
      errors: [{ messageId: "isEmpty" }, { messageId: "isEmpty" }],
      output: `


      `,
    },
    {
      code: `
const foo = 123;//
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `
const foo = 123;
      `,
    },
  ],
});
