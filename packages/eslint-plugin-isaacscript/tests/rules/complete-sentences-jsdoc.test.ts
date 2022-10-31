import { TSESLint } from "@typescript-eslint/utils";
import { CompleteSentenceMessageIds } from "../../src/completeSentence";
import {
  completeSentencesJSDoc,
  Options,
} from "../../src/rules/complete-sentences-jsdoc";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<
  TSESLint.InvalidTestCase<CompleteSentenceMessageIds, Options>
> = [];

valid.push({
  name: "Single-line comment with complete sentence",
  code: `
/** This is a complete sentence. */
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
* This is a complete sentence.
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
  errors: [{ messageId: "missingPeriod" }],
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
  name: "Single-line comment with a URL (simple)",
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
 * "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * was born and I will."
 */
  `,
});

invalid.push({
  name: "Multi-line comment with a incomplete sentence in quotes",
  code: `
/**
 * "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * was born and I will"
 */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Function comment",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is a bar.
 * @returns This is a return value.
 */
function foo(bar: number) {}
  `,
});

invalid.push({
  name: "Function comment with missing period in param tag",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is a bar
 * @returns This is a return value.
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingPeriod" }],
});

invalid.push({
  name: "Function comment with missing period in returns tag",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is a bar.
 * @returns This is a return value
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingPeriod" }],
});

invalid.push({
  name: "Function comment with missing capital in param tag",
  code: `
/**
 * This is the foo function.
 *
 * @param bar this is a bar.
 * @returns This is a return value.
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingCapital" }],
});

invalid.push({
  name: "Function comment with missing capital in returns tag",
  code: `
/**
 * This is the foo function.
 *
 * @param bar This is a bar.
 * @returns this is a return value.
 */
function foo(bar: number) {}
  `,
  errors: [{ messageId: "missingCapital" }],
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
/** @noSelf Incomplete sentence here oh my */
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
/** The following is an example of foo \`foo()\` */
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment using e.g. and no period",
  code: `
/**
 * The static methods in this class can only be called by a global variable.
 *
 * e.g. \`Foo.Bar()\`
 */
  `,
});

valid.push({
  name: "Comment using a question",
  code: `
/** What is the meaning of life? */
  `,
});

valid.push({
  name: "Comment using an exclamation point",
  code: `
/** I love linting! */
  `,
});

valid.push({
  name: "Comment using a numeric literal",
  code: `
/**
 * This is a foo.
 *
 * 1 << 1
 */
  `,
});

valid.push({
  name: "Comment using a trailing number expression",
  code: `
/**
 * For EntityType.TEAR (2)
 *
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags. Furthermore, enums cannot be instantiated with \`BitSet128\` objects.
 *
 * This enum was renamed from "TearFlags" to be consistent with the other flag enums.
 */
  `,
});

valid.push({
  name: "Comment using an in-line URL",
  code: `
{
  {
    {
      {
        /**
         * We have to use \`leftTSNode.name\` instead of \`leftTSNode\` to avoid run-time errors
         * because the \`typeChecker.getTypeAtLocation\` method expects a \`ts.BindingName\` instead
         * of a \`ts.VariableDeclaration\`: https://github.com/microsoft/TypeScript/issues/48878
         */
      }
    }
  }
}
  `,
});

valid.push({
  name: "Comment with spillover number in parenthesis",
  code: `
/**
 * For EntityType.CONSTANT_STONE_SHOOTER (202), ConstantStoneShooterVariant.CONSTANT_STONE_SHOOTER
 * (0)
 *
 * This is the same as the \`Direction\` enum.
 */
  `,
});

valid.push({
  name: "Comment with date",
  code: `
/** January 1st */
  `,
});

valid.push({
  name: "Comment with JSDoc type on single line",
  code: `
/** @type {import('@docusaurus/types').DocusaurusConfig} */
  `,
});

valid.push({
  name: "Comment with JSDoc type on multi line",
  code: `
/**
 * @type {import('@docusaurus/types').DocusaurusConfig}
 */
  `,
});

valid.push({
  name: "Comment with JSDoc link with URL without trailing text",
  code: `
/**
 * This starts a debug session with ZeroBrane Studio. For more information, see the
 * [documentation](https://wofsauge.github.io/IsaacDocs/rep/tutorials/ZeroBraneStudio.html).
 */
  `,
});

valid.push({
  name: "Comment with JSDoc link with URL and trailing text",
  code: `
/**
 * Also see the [documentation for the socket
 * library](https://web.tecgraf.puc-rio.br/luasocket/old/luasocket-2.0-beta/tcp.html).
 *
 * @noSelf
 */
  `,
});

ruleTester.run("complete-sentences-jsdoc", completeSentencesJSDoc, {
  valid,
  invalid,
});
