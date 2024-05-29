import { noEmptyJSDoc } from "../../src/rules/no-empty-jsdoc.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-empty-jsdoc", noEmptyJSDoc, {
  valid: [
    {
      code: `
/** A */
      `,
    },
    {
      code: `
/**
 * A
 */
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
