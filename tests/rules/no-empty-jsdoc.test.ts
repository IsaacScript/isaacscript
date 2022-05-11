import { noEmptyJSDoc } from "../../src/rules/no-empty-jsdoc";
import { ruleTester } from "../utils";

ruleTester.run("no-empty-jsdoc", noEmptyJSDoc, {
  valid: [
    {
      code: `
/** A */
      `,
    },
  ],
  invalid: [
    {
      code: `
/***/
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/** */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/**  */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/**   */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/**
 *
 */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/**
 *
 *
 */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
    {
      code: `
/**
 *
 *
 *
 */
      `,
      errors: [{ messageId: "isEmpty" }],
      output: `

      `,
    },
  ],
});
