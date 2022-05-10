/* eslint-disable @typescript-eslint/no-unused-vars */

import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import {
  getFormattedCommentText,
  getSpacesBeforeBulletPoint,
  isCommentOnOwnLine,
  startsWithBulletPoint,
} from "../comments";
import { createRule } from "../utils";

type Options = [
  {
    maxLength: number;
  },
];

// ts-prune-ignore-next
export type MessageIds = "incorrectlyFormatted";

/**
 * An object containing one or more lines of text. For example:
 *
 * ```ts
 * /**
 *  * This is the first line of a block.
 *  * This is the second line of the block.
 *  *
 *  * This line is a separate block.
 *  * /
 * ```
 */
interface TextBlock {
  text: string;

  /**
   * The amount of spaces before a sub bullet. For example, the following bullet points would have
   * a `subBulletIndentLength` of "" and "  " respectively:
   *
   * - First bullet point.
   *   - Sub bullet point.
   */
  subBulletIndent: string;

  insertBlankLineBelow: boolean;
}

const RULE_NAME = "limit-jsdoc-comments";

export const limitJSDocComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: 'Disallows "/*" comments longer than N characters',
      recommended: "error",
      requiresTypeChecking: true,
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
      incorrectlyFormatted: `Comment is not formatted properly to the line length of {{ maxLength }} characters.`,
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
     * - `//` style comments are handled by the "limit-slash-slash-comment" rule.
     * - `/*` style comments are explicitly ignored, since those are conventionally used to comment
     * out code. (Actual code documentation conventionally uses JSDoc-style comments, like `/**`.)
     */
    const jsDocComments = getStandaloneJSDocComments(sourceCode, comments);

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

      if (originalText !== formattedText) {
        context.report({
          loc: {
            start: comment.loc.start,
            end: comment.loc.end,
          },
          messageId: "incorrectlyFormatted",
          data: {
            maxLength,
          },
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

function getStandaloneJSDocComments(
  sourceCode: TSESLint.SourceCode,
  comments: TSESTree.Comment[],
) {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Block && // i.e. a "/*" comment
      comment.value.trim().startsWith("*") && // i.e. a "/**" comment
      isCommentOnOwnLine(sourceCode, comment),
  );
}

/**
 * Returns an array of grouped comments.
 *
 * For example, the following code would return an array of three comment blocks:
 *
 * ```ts
 * /**
 *  * This is the first block.
 *  *
 *  * This is the second block.
 *  * We are still in the second block, because there has not been a newline separator yet.
 *  *
 *  * This is the third block.
 *  * /
 * ```
 *
 * The following code would return an array of four comment blocks, because bullets are
 * treated as a separate block:
 *
 * ```ts
 * /**
 *  * I have the following fruit:
 *  * - Apple
 *  * - Banana
 *  * - Pear
 *  * /
 * ```
 */
function getTextBlocksFromJSDocComment(comment: TSESTree.Comment): TextBlock[] {
  const lines = comment.value.split("\n");
  const linesWithRemovedAsterisk = lines.map((line) =>
    line.trim().replace(/^\*/, ""),
  );

  const textBlocks: TextBlock[] = [];
  let partialText = "";
  let partialSubBulletIndent = "";
  let insideCodeBlock = false;
  for (let i = 0; i < linesWithRemovedAsterisk.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lineRaw = linesWithRemovedAsterisk[i]!;

    // Remove the leading space from the line, if any
    // e.g. " Foo" --> "Foo"
    const firstCharacter = lineRaw[0];
    const lineBeforeTrim = firstCharacter === " " ? lineRaw.slice(1) : lineRaw;

    const isBlankLine = lineBeforeTrim.trim() === "";
    const isBulletPoint = startsWithBulletPoint(lineBeforeTrim);
    const hasJSDocTag = lineBeforeTrim.startsWith("@");
    const hasCodeBlock = lineBeforeTrim.includes("```");
    if (hasCodeBlock) {
      insideCodeBlock = !insideCodeBlock;
    }

    const spacesBeforeBulletPoint = getSpacesBeforeBulletPoint(lineBeforeTrim);
    const line = insideCodeBlock ? lineBeforeTrim : lineBeforeTrim.trim();

    // A blank line marks the end of the current block
    // (or a line that starts with a bullet point)
    // (or a line that starts with a JSDoc tag)
    // (or every line, if we are inside of a code block)
    if (
      isBlankLine ||
      isBulletPoint ||
      hasJSDocTag ||
      insideCodeBlock ||
      hasCodeBlock
    ) {
      // Before processing this line, record the block that we have been building
      // But don't record empty blocks
      if (partialText !== "") {
        const textBlock: TextBlock = {
          text: partialText,
          subBulletIndent: partialSubBulletIndent,
          insertBlankLineBelow:
            !isBulletPoint && !hasJSDocTag && !insideCodeBlock && !hasCodeBlock,
        };
        textBlocks.push(textBlock);
      }

      partialText = line;
      partialSubBulletIndent = spacesBeforeBulletPoint;
    } else {
      if (partialText !== "") {
        partialText += " ";
      }
      partialText += line;
    }
  }

  // In some cases, there may not be a blank line at the end of the JSDoc comment
  // Finish writing the section if this is the case
  if (partialText !== "") {
    const textBlock: TextBlock = {
      text: partialText,
      subBulletIndent: partialSubBulletIndent,
      insertBlankLineBelow: false,
    };
    textBlocks.push(textBlock);
  }

  return textBlocks;
}

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
  return singleLineLength <= maxLength;
}

function getFormattedJSDocCommentSingleLine(
  text: string,
  leftWhitespace: string,
) {
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

    const formattedText = getFormattedCommentText(
      block.text,
      linePrefixWithExtraIndent,
      maxLength,
    );

    const unformattedText = linePrefixWithExtraIndent + block.text;

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
