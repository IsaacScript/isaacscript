import { trimPrefix } from "isaacscript-common-ts";
import { formatText } from "../format.js";
import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc.js";
import {
  areStringsEqualExcludingTrailingSpaces,
  createRule,
} from "../utils.js";

const EXTRA_NUM_CHARACTERS_TO_FIT_ON_JSDOC_SINGLE_LINE = 4;
const DEBUG = false as boolean;

export type Options = [
  {
    maxLength: number;
  },
];

export type MessageIds = "incorrectlyFormatted";

export const formatJSDocComments = createRule<Options, MessageIds>({
  name: "format-jsdoc-comments",
  meta: {
    type: "layout",
    docs: {
      description:
        "Disallows `/**` comments longer than N characters and multi-line comments that can be merged together",
      recommended: "recommended",
    },
    schema: [
      {
        type: "object",
        properties: {
          maxLength: { type: "number" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      incorrectlyFormatted: "Comment is not formatted correctly.",
    },
    fixable: "whitespace",
  },
  defaultOptions: [
    {
      /**
       * Matches the Airbnb style guide, which is the most popular JavaScript style guide in the
       * world.
       */
      maxLength: 100,
    },
  ],

  /**
   * We need to write the rule in such a way that it operates on the entire source code instead of
   * individual AST nodes:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   */
  create(context, [options]) {
    const { maxLength } = options;

    const comments = context.sourceCode.getAllComments();

    // We only look at `/**` style comments on their own line.
    const jsDocComments = getJSDocComments(comments);

    for (const comment of jsDocComments) {
      const leftWhitespaceLength = comment.loc.start.column;
      const leftWhitespace = " ".repeat(leftWhitespaceLength);
      const originalComment = `${leftWhitespace}/*${comment.value}*/`;

      const text = getTextFromJSDocComment(comment.value);
      const effectiveMaxLength =
        maxLength - leftWhitespaceLength - " * ".length;
      let formattedText = formatText(text, effectiveMaxLength);

      // - Disallow comments like: `/** *foo */`
      // - We must escape the asterisk to avoid a run-time error.
      formattedText = trimPrefix(formattedText, String.raw`\*`, true);

      const canFitOnSingleLine = canFitOnSingleJSDocLine(
        formattedText,
        effectiveMaxLength,
      );

      const formattedComment = canFitOnSingleLine
        ? getJSDocCommentSingleLine(formattedText, leftWhitespace)
        : getJSDocCommentMultiLine(formattedText, leftWhitespace);

      if (DEBUG && originalComment !== formattedComment) {
        console.log("originalComment:");
        console.log(originalComment);
        console.log("formattedComment:");
        console.log(formattedComment);
      }

      if (
        !areStringsEqualExcludingTrailingSpaces(
          originalComment,
          formattedComment,
        )
      ) {
        context.report({
          loc: {
            start: comment.loc.start,
            end: comment.loc.end,
          },
          messageId: "incorrectlyFormatted",
          fix: (fixer) => {
            const [commentStart, commentEnd] = comment.range;
            const commentBeginningOfLine =
              commentStart - comment.loc.start.column;
            const range = [commentBeginningOfLine, commentEnd] as const;

            return fixer.replaceTextRange(range, formattedComment);
          },
        });
      }
    }

    return {};
  },
});

/**
 * JSDoc can be either single-line or multi-line. For example:
 *
 * ```ts
 * /** This is a single-line JSDoc comment. * /
 *
 * /**
 *  * This is a multi-line JSDoc comment.
 *  * /
 * ```
 */
function canFitOnSingleJSDocLine(text: string, effectiveMaxLength: number) {
  const textLines = text.split("\n");
  return (
    textLines.length === 1 &&
    text.length + EXTRA_NUM_CHARACTERS_TO_FIT_ON_JSDOC_SINGLE_LINE <=
      effectiveMaxLength
  );
}

function getJSDocCommentSingleLine(text: string, leftWhitespace: string) {
  return `${leftWhitespace}/** ${text} */`;
}

function getJSDocCommentMultiLine(text: string, leftWhitespace: string) {
  const header = `${leftWhitespace}/**`;
  const emptyLine = `${leftWhitespace} *`;
  const footer = `${leftWhitespace} */`;

  const linePrefix = `${emptyLine} `;

  const lines = text.split("\n");
  const commentLines = lines.map((line) =>
    line.trim() === "" ? emptyLine : `${linePrefix}${line}`,
  );
  const comments = commentLines.join("\n");

  return `${header}\n${comments}\n${footer}`;
}
