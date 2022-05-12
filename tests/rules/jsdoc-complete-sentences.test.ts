import { TSESLint } from "@typescript-eslint/utils";
import {
  jsdocCompleteSentences,
  MessageIds,
} from "../../src/rules/jsdoc-complete-sentences";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

valid.push({
  name: "Single-line comment with complete sentence",
  code: `
/** Sometimes I forget to put a period on my comments. */
  `,
});

invalid.push({
  name: "Single-line comment without a capital",
  code: `
/** sometimes I forget to capitalize my sentences. */
  `,
  errors: [{ messageId: "missingCapital" }],
});

invalid.push({
  name: "Single-line comment without a period",
  code: `
/** Sometimes I forget to put a period on my comments */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Multi-line comment with complete sentence",
  code: `
/**
 * Sometimes I forget to put a period on my comments.
 */
  `,
});

invalid.push({
  name: "Multi-line comment without a period",
  code: `
/**
* Sometimes I forget to put a period on my comments
*/
  `,
  errors: [{ messageId: "missingPeriod" }],
});

invalid.push({
  name: "Multi-line comment without a capital",
  code: `
/**
 * sometimes I forget to capitalize my sentences.
 */
  `,
  errors: [{ messageId: "missingCapital" }],
});

valid.push({
  name: "Multi-line comment with complete sentences and two blocks",
  code: `
/**
* Sometimes I forget to put a period on my comments.
*
* This is another block that stretches
* between two lines.
*/
  `,
});

invalid.push({
  name: "Multi-line comment with incomplete sentences and two blocks",
  code: `
/**
* Sometimes I forget to put a period on my comments
*
* This is another block that stretches
* between two lines
*/
  `,
  errors: [{ messageId: "missingPeriod" }, { messageId: "missingPeriod" }],
});

valid.push({
  name: "Multi-line comment with blank lines",
  code: `
/**
 *
 */
  `,
});

valid.push({
  name: "Single-line comment with a URL",
  code: `
/** Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js */
    `,
});

valid.push({
  name: "Multi-line comment with a code block",
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
});

valid.push({
  name: "Multi-line comment with a colon and bullet points",
  code: `
/**
 * The amount of spaces before a sub bullet. For example, the following bullet points would have a
 * \`subBulletIndentLength\` of "" and "  " respectively:
 *
 * - First bullet point.
 *   - Sub bullet point.
 */

    `,
});

valid.push({
  name: "Multi-line comment with a URL and trailing text",
  code: `
/**
 * The TypeScript config extends it:
 * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
 * (This includes the "parser" declaration of "@typescript-eslint/parser".)
 */
    `,
});

valid.push({
  name: "Single-line comment with complete sentence in quotes",
  code: `
/** "This is not a complete sentence." */
  `,
});

invalid.push({
  name: "Single-line comment with incomplete sentence in quotes",
  code: `
/** "This is not a complete sentence" */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Function comment with @param and complete sentence",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is bar.
 */
function foo(bar: number) {}
  `,
});

invalid.push({
  name: "Function comment with @param and missing period",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is bar
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingPeriod" }],
});

invalid.push({
  name: "Function comment with @param and missing capital",
  code: `
/**
 * This is the foo function.
 *
 * @param bar this is bar.
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingCapital" }],
});

ruleTester.run("jsdoc-complete-sentences", jsdocCompleteSentences, {
  valid,
  invalid,
});
