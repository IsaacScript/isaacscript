import { formatText } from "../format";
import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc";
import { areStringsEqualExcludingTrailingSpaces, createRule } from "../utils";

const RULE_NAME = "format-jsdoc-comments";
const EXTRA_NUM_CHARACTERS_TO_FIT_ON_JSDOC_SINGLE_LINE = 4;
const DEBUG = false;

type Options = [
  {
    maxLength: number;
  },
];

// ts-prune-ignore-next
export type MessageIds = "incorrectlyFormatted";

export const formatJSDocComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description:
        "Disallows `/**` comments longer than N characters and multi-line comments that can be merged together",
      recommended: "error",
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
   * It is not possible to get single-line comments in the AST:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   *
   * Thus, we need to write the rule in such a way that it operates on the entire source code
   * instead of individual AST nodes.
   */
  create(context, [options]) {
    const { maxLength } = options;

    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    // We only look at `/**` style comments on their own line.
    const jsDocComments = getJSDocComments(comments);

    jsDocComments.forEach((comment) => {
      const leftWhitespaceLength = comment.loc.start.column;
      const leftWhitespace = " ".repeat(leftWhitespaceLength);
      const originalComment = `${leftWhitespace}/*${comment.value}*/`;

      const text = getTextFromJSDocComment(comment.value);
      const effectiveMaxLength =
        maxLength - leftWhitespaceLength - " * ".length;
      const formattedText = formatText(text, effectiveMaxLength);

      const canFitOnSingleLine = canFitOnSingleJSDocLine(
        formattedText,
        effectiveMaxLength,
      );

      const formattedComment = canFitOnSingleLine
        ? getJSDocCommentSingleLine(formattedText, leftWhitespace)
        : getJSDocCommentMultiLine(formattedText, leftWhitespace);

      if (DEBUG) {
        console.log("originalComment:"); // eslint-disable-line no-console
        console.log(originalComment); // eslint-disable-line no-console
        console.log("formattedComment:"); // eslint-disable-line no-console
        console.log(formattedComment); // eslint-disable-line no-console
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
            const range: readonly [number, number] = [
              commentBeginningOfLine,
              commentEnd,
            ];

            return fixer.replaceTextRange(range, formattedComment);
          },
        });
      }
    });

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
  // As a special case, JSDoc comments that specify parameter documentation should never be moved to
  // a single line. (But JSDoc tags with no additional information are okay to be in a single line.)
  const hasJSDocTag = text.startsWith("@");
  if (hasJSDocTag) {
    const tagHasSomethingAfterIt = text.includes(" ");
    if (tagHasSomethingAfterIt) {
      return false;
    }
  }

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
