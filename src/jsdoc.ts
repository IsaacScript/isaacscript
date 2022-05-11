import { TSESTree } from "@typescript-eslint/types";
import {
  getSpacesBeforeBulletPoint,
  startsWithBulletPoint,
  startsWithExample,
} from "./comments";
import { hasURL } from "./utils";

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
export interface TextBlock {
  text: string;

  /**
   * The amount of spaces before a sub bullet. For example, the following bullet points would have a
   * `subBulletIndentLength` of "" and "  " respectively:
   *
   * - First bullet point.
   *   - Sub bullet point.
   */
  subBulletIndent: string;

  insertBlankLineBelow: boolean;
  insideCodeBlock: boolean;
}

export function getJSDocComments(
  comments: TSESTree.Comment[],
): TSESTree.Comment[] {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Block && // i.e. a "/*" comment
      comment.value.startsWith("*"), // i.e. a "/**" comment
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
 * The following code would return an array of four comment blocks, because bullets are treated as a
 * separate block:
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
export function getTextBlocksFromJSDocComment(
  comment: TSESTree.Comment,
): TextBlock[] {
  const lines = comment.value.split("\n");
  const linesWithRemovedAsterisk = lines.map((line) =>
    line.trim().replace(/^\*/, ""),
  );

  const textBlocks: TextBlock[] = [];
  let partialText = "";
  let partialSubBulletIndent = "";
  let insideCodeBlock = false;
  let previousLineHadURL = false;
  let previousLineHadCodeBlock = false;
  for (let i = 0; i < linesWithRemovedAsterisk.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lineRaw = linesWithRemovedAsterisk[i]!;

    // Remove the leading space from the line, if any. e.g. " Foo" --> "Foo"
    const firstCharacter = lineRaw[0];
    const lineBeforeTrim = firstCharacter === " " ? lineRaw.slice(1) : lineRaw;

    // Gather information about this line.
    const isBlankLine = lineBeforeTrim.trim() === "";
    const isBulletPoint = startsWithBulletPoint(lineBeforeTrim);
    const hasExample = startsWithExample(lineBeforeTrim);
    const hasJSDocTag = lineBeforeTrim.startsWith("@");
    const hasURLInside = hasURL(lineBeforeTrim);
    const hasCodeBlock = lineBeforeTrim.includes("```");
    const spacesBeforeBulletPoint = getSpacesBeforeBulletPoint(lineBeforeTrim);

    const line = insideCodeBlock ? lineBeforeTrim : lineBeforeTrim.trim();

    // Certain things mark the end of the current block:
    // - a blank line
    // - a line that starts with a bullet point
    // - a line that starts with an example
    // - a line that starts with a JSDoc tag
    // - the end of a line that had a URL
    // - every line, if we are inside of a code block
    if (
      isBlankLine ||
      isBulletPoint ||
      hasExample ||
      hasJSDocTag ||
      previousLineHadURL ||
      insideCodeBlock ||
      hasCodeBlock ||
      previousLineHadCodeBlock
    ) {
      // Before processing this line, record the block that we have been building. (But don't record
      // empty blocks, unless we are inside of a code block.)
      if (partialText !== "" || insideCodeBlock) {
        const insertBlankLineBelow = shouldInsertBlankLineBelowTextBlock(
          isBulletPoint,
          hasExample,
          hasJSDocTag,
          insideCodeBlock,
          hasCodeBlock,
          previousLineHadURL,
          isBlankLine,
        );

        const textBlock: TextBlock = {
          text: partialText,
          subBulletIndent: partialSubBulletIndent,
          insertBlankLineBelow,
          insideCodeBlock,
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

    previousLineHadURL = hasURLInside;
    if (hasCodeBlock) {
      insideCodeBlock = !insideCodeBlock;
    }
    previousLineHadCodeBlock = hasCodeBlock;
  }

  // In some cases, there may not be a blank line at the end of the JSDoc comment. Finish writing
  // the section if this is the case.
  if (partialText !== "") {
    const textBlock: TextBlock = {
      text: partialText,
      subBulletIndent: partialSubBulletIndent,
      insertBlankLineBelow: false,
      insideCodeBlock,
    };
    textBlocks.push(textBlock);
  }

  return textBlocks;
}

/**
 * By default, text blocks should be separated by a blank line. This function has logic for all of
 * the exceptions to the rule.
 */
function shouldInsertBlankLineBelowTextBlock(
  nextLineIsBulletPoint: boolean,
  nextLineHasExample: boolean,
  nextLineHasJSDocTag: boolean,
  insideCodeBlock: boolean,
  nextLineHasCodeBlock: boolean,
  thisBlockHasURL: boolean,
  isBlankLine: boolean,
): boolean {
  if (
    nextLineHasExample ||
    nextLineHasJSDocTag ||
    insideCodeBlock ||
    nextLineHasCodeBlock
  ) {
    return false;
  }

  // It is valid to have blank lines between bullet points (or not). Match the existing comment.
  if (nextLineIsBulletPoint) {
    return isBlankLine;
  }

  // It is valid to have blank lines after URLs (or not). Match the existing comment.
  if (thisBlockHasURL) {
    return isBlankLine;
  }

  return true;
}
