import { jsdocFullSentences } from "../../src/rules/jsdoc-full-sentences";
import { ruleTester } from "../utils";

ruleTester.run("jsdoc-full-sentences", jsdocFullSentences, {
  valid: [
    {
      code: `
/** Sometimes I forget to put a period on my comments. */
      `,
    },
    {
      code: `
/**
 * Sometimes I forget to put a period on my comments.
 */
      `,
    },
    {
      code: `
/**
 * Sometimes I forget to put a period on my comments.
 *
 * This is another block that stretches
 * between two lines.
 */
      `,
    },
    {
      code: `
/** Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js */
      `,
    },
    {
      code: `
/**
 * An object containing one or more contiguous comments. For example:
 *
 * \`\`\`ts
 * // A comment.
 * // Another comment.
 * \`\`\`
 */
      `,
    },
    {
      code: `
/**
 * The amount of spaces before a sub bullet. For example, the following bullet points would have a
 * \`subBulletIndentLength\` of "" and "  " respectively:
 *
 * - First bullet point.
 *   - Sub bullet point.
 */
      `,
    },
    {
      code: `
/**
 * The TypeScript config extends it:
 * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
 * (This includes the "parser" declaration of "@typescript-eslint/parser".)
 */
      `,
    },
    {
      code: `
/**
 * This is the foo function.
 *
 * @param bar This is bar.
 */
function foo(bar: number) {}
      `,
    },
  ],
  invalid: [
    {
      code: `
/** Sometimes I forget to put a period on my comments */
      `,
      errors: [{ messageId: "notComplete" }],
    },
    {
      code: `
/**
 * Sometimes I forget to put a period on my comments
 */
      `,
      errors: [{ messageId: "notComplete" }],
    },
    {
      code: `
/**
 * Sometimes I forget to put a period on my comments
 *
 * This is another block that stretches
 * between two lines
 */
      `,
      errors: [{ messageId: "notComplete" }, { messageId: "notComplete" }],
    },
    {
      code: `
/** "This is not a complete sentence" */
      `,
      errors: [{ messageId: "notComplete" }],
    },
  ],
});
