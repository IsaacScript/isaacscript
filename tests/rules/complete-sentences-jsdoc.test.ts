import { TSESLint } from "@typescript-eslint/utils";
import {
  completeSentencesJSDoc,
  MessageIds,
} from "../../src/rules/complete-sentences-jsdoc";
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
  name: "Single-line blank comments",
  code: `
/**/
/***/
/****/
/*****/

/* */
/*  */
/*   */

/* **/
/*  **/
/*   **/

/** */
/**  */
/**   */

/** **/
/**  **/
/**   **/
  `,
});

valid.push({
  name: "Multi-line blank comments",
  code: `
/**
 */

/**
 *
 */

 /**
  *
  *
  */

  /**
   *
   *
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
  name: "Multi-line comment with a URL (combined)",
  code: `
/**
 * Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js
 */
    `,
});

valid.push({
  name: "Multi-line comment with a URL (separated)",
  code: `
/**
 * Taken from ESLint:
 * https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js
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

invalid.push({
  name: "Multi-line comment with a code block and trailing incomplete sentence",
  code: `
/**
 * An object containing one or more contiguous comments. For example:
 *
 * \`\`\`ts
 * // A comment.
 * // Another comment.
 * \`\`\`
 * this is an incomplete sentence.
 */
    `,
  errors: [{ messageId: "missingCapital" }],
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
  name: "Multi-line comment with a colon and bullet points of non-complete items",
  code: `
/**
 * This is my list of things:
 *
 * - first thing
 *   - sub-first thing
 * - second thing
 */
    `,
});

valid.push({
  name: "Single-line comment with complete sentence in quotes",
  code: `
/** "foo" refers to "baz". */
  `,
});

invalid.push({
  name: "Single-line comment with incomplete sentence in quotes",
  code: `
/** "foo" refers to "baz" */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Multi-line comment with a complete sentence in quotes",
  code: `
/**
 * The following is a quote:
 *
 * "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * was born and I will."
 */
  `,
});

valid.push({
  name: "Function comment",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is bar.
 * @returns This is a return value.
 */
function foo(bar: number) {}
  `,
});

invalid.push({
  name: "Function comment with missing periods",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is bar
 * @returns This is a return value
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingPeriod" }, { messageId: "missingPeriod" }],
});

invalid.push({
  name: "Function comment with missing capitals",
  code: `
/**
 * This is the foo function.
 *
 * @param bar this is bar.
 * @returns this is a return value.
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingCapital" }, { messageId: "missingCapital" }],
});

valid.push({
  name: "Comment with lone JSDoc tag",
  code: `
/** @noSelf */
  `,
});

invalid.push({
  name: "Comment with non-lone JSDoc tag",
  code: `
/** @noSelf Incomplete */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment with colon ending with code",
  code: `
/** For example: \`foo()\` */
  `,
});

invalid.push({
  name: "Comment without colon ending with code",
  code: `
/** For example \`foo()\` */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

ruleTester.run("complete-sentences-jsdoc", completeSentencesJSDoc, {
  valid,
  invalid,
});
