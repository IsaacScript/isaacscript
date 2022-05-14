import { getFormattedCommentText, isCommentOnOwnLine } from "../comments";
import {
  getJSDocComments,
  getTextBlocksFromJSDocComment,
  TextBlock,
} from "../jsdoc";
import { createRule, isStringsEqualExcludingTrailingSpaces } from "../utils";

const RULE_NAME = "format-jsdoc-comments";
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

    /**
     * We only look at `/**` style comments on their own line.
     *
     * - `//` style comments are handled by the "format-line-comments" rule.
     * - `/*` style comments are explicitly ignored, since those are conventionally used to comment
     *   out code. (Actual code documentation conventionally uses JSDoc-style comments, like `/**`.)
     */
    const jsDocCommentsAll = getJSDocComments(comments);
    const jsDocComments = jsDocCommentsAll.filter((comment) =>
      isCommentOnOwnLine(sourceCode, comment),
    );

    jsDocComments.forEach((comment) => {
      const textBlocks = getTextBlocksFromJSDocComment(comment);

      const firstBlock = textBlocks[0];
      if (firstBlock === undefined) {
        return;
      }

      const leftWhitespaceLength = comment.loc.start.column;
      const leftWhitespace = " ".repeat(leftWhitespaceLength);
      const originalText = `${leftWhitespace}/*${comment.value}*/`;
      const canFitOnSingleLine =
        textBlocks.length === 1 &&
        canFitIOnSingleJSDocLine(
          firstBlock.text,
          leftWhitespaceLength,
          maxLength,
        );
      const formattedText = canFitOnSingleLine
        ? getFormattedJSDocCommentSingleLine(firstBlock.text, leftWhitespace)
        : getFormattedJSDocCommentMultiLine(
            textBlocks,
            leftWhitespace,
            maxLength,
          );

      if (DEBUG) {
        console.log("originalText:"); // eslint-disable-line no-console
        console.log(originalText); // eslint-disable-line no-console
        console.log("formattedText:"); // eslint-disable-line no-console
        console.log(formattedText); // eslint-disable-line no-console
      }

      if (!isStringsEqualExcludingTrailingSpaces(originalText, formattedText)) {
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

            return fixer.replaceTextRange(range, formattedText);
          },
        });
      }
    });

    return {};
  },
});

/**
 * JSDoc can be either single-line or multi-line.
 *
 * For example:
 *
 * ```ts
 * /** This is a single-line JSDoc comment. * /
 * /**
 *  * This is a multi-line JSDoc comment.
 *  * /
 * ```
 */
function canFitIOnSingleJSDocLine(
  text: string,
  leftWhitespaceLength: number,
  maxLength: number,
) {
  const singleLineLength =
    leftWhitespaceLength + "/** ".length + text.length + " */".length;

  // JSDoc comments that specify parameter documentation should never be moved to a single line.
  // (But JSDoc tags with no additional information are okay to be in a single line.)
  const hasJSDocTag = text.startsWith("@");
  if (hasJSDocTag) {
    const tagHasSomethingAfterIt = text.includes(" ");
    if (tagHasSomethingAfterIt) {
      return false;
    }
  }

  return singleLineLength <= maxLength;
}

function getFormattedJSDocCommentSingleLine(
  text: string,
  leftWhitespace: string,
) {
  text = removeDuplicateAsterisks(text);
  return `${leftWhitespace}/** ${text} */`;
}

function getFormattedJSDocCommentMultiLine(
  textBlocks: TextBlock[],
  leftWhitespace: string,
  maxLength: number,
) {
  const header = `${leftWhitespace}/**`;
  const emptyLine = `${leftWhitespace} *`;
  const footer = `${leftWhitespace} */`;

  const linePrefix = `${emptyLine} `;

  let lines = "";
  let insideCodeBlock = false;
  for (let i = 0; i < textBlocks.length; i++) {
    const block = textBlocks[i]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const hasCodeBlock = block.text.includes("```");
    if (hasCodeBlock) {
      insideCodeBlock = !insideCodeBlock;
    }

    const linePrefixWithExtraIndent = linePrefix + block.subBulletIndent;

    const text = removeDuplicateAsterisks(block.text);
    const formattedText = getFormattedCommentText(
      text,
      linePrefixWithExtraIndent,
      maxLength,
    );

    let unformattedText = linePrefixWithExtraIndent + block.text;
    if (block.text === "") {
      // Since this is an empty line, we need to remove the superfluous trailing space.
      unformattedText = unformattedText.slice(0, -1);
    }

    const textToUse = insideCodeBlock ? unformattedText : formattedText;

    lines += textToUse;
    lines += "\n";

    const onLastElement = i === textBlocks.length - 1;
    if (!onLastElement && block.insertBlankLineBelow) {
      lines += emptyLine;
      lines += "\n";
    }
  }

  return `${header}\n${lines}${footer}`;
}

/**
 * Fix comments like:
 *
 * ```ts
 * /* * Foo * /
 * ```
 */
function removeDuplicateAsterisks(text: string) {
  while (text.startsWith("* ")) {
    text = text.replace(/^\* /, "");
  }

  return text;
}
