import { TSESTree } from "@typescript-eslint/types";
import {
  BulletPointKind,
  getAdjustedBulletPointKind,
  getSpacesBeforeBulletPoint,
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
  let previousLineWasBlank = false;
  let previousLineEndedInColon = false;
  let previousLineBulletPointKind = BulletPointKind.NonBulletPoint;
  let insideBulletedListKind = BulletPointKind.NonBulletPoint;
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
    const endsInColon = lineBeforeTrim.trimEnd().endsWith(":");
    const bulletPointKind = getAdjustedBulletPointKind(
      lineBeforeTrim,
      previousLineWasBlank,
      previousLineEndedInColon,
      insideBulletedListKind,
    );
    const isNewOrContinuingBulletPoint =
      bulletPointKind !== BulletPointKind.NonBulletPoint &&
      (previousLineBulletPointKind === BulletPointKind.NonBulletPoint ||
        previousLineBulletPointKind === bulletPointKind);
    const isFirstBulletPoint =
      bulletPointKind !== BulletPointKind.NonBulletPoint &&
      insideBulletedListKind === BulletPointKind.NonBulletPoint;
    const hasExample = startsWithExample(lineBeforeTrim);
    const hasJSDocTag = lineBeforeTrim.startsWith("@");
    const hasURLInside = hasURL(lineBeforeTrim);
    const hasNumberParenthesisSuffix = /\(\d+\)$/.test(
      lineBeforeTrim.trimEnd(),
    );
    const hasCodeBlock = lineBeforeTrim.includes("```");
    const spacesBeforeBulletPoint = getSpacesBeforeBulletPoint(lineBeforeTrim);

    const line = insideCodeBlock ? lineBeforeTrim : lineBeforeTrim.trim();

    // Certain things mark the end of the current block:
    if (
      isBlankLine ||
      isNewOrContinuingBulletPoint ||
      hasExample ||
      hasJSDocTag ||
      hasURLInside ||
      previousLineHadURL ||
      insideCodeBlock ||
      hasNumberParenthesisSuffix ||
      hasCodeBlock ||
      previousLineHadCodeBlock
    ) {
      // Before processing this line, record the block that we have been building. (But don't record
      // empty blocks, unless we are inside of a code block.)
      if (partialText !== "" || insideCodeBlock) {
        const insertBlankLineBelow = shouldInsertBlankLineBelowTextBlock(
          isNewOrContinuingBulletPoint,
          isFirstBulletPoint,
          hasExample,
          hasJSDocTag,
          insideCodeBlock,
          hasCodeBlock,
          previousLineHadURL,
          hasURLInside,
          isBlankLine,
          previousLineEndedInColon,
          hasNumberParenthesisSuffix,
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
      insideBulletedListKind = bulletPointKind;
    } else {
      if (partialText !== "") {
        partialText += " ";
      }
      partialText += line;
    }

    previousLineWasBlank = isBlankLine;
    previousLineEndedInColon = endsInColon;
    previousLineBulletPointKind = bulletPointKind;
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
  nextLineIsFirstBulletPoint: boolean,
  nextLineHasExample: boolean,
  nextLineHasJSDocTag: boolean,
  insideCodeBlock: boolean,
  nextLineHasCodeBlock: boolean,
  thisBlockHasURL: boolean,
  nextLineHasURL: boolean,
  nextLineIsBlank: boolean,
  endsInColon: boolean,
  nextLineHasNumberParenthesisSuffix: boolean,
): boolean {
  if (
    nextLineHasExample ||
    nextLineHasJSDocTag ||
    insideCodeBlock ||
    nextLineHasCodeBlock
  ) {
    return false;
  }

  if (nextLineHasURL) {
    // It is optional to have blank lines between URLs. Match the existing comment.
    return nextLineIsBlank;
  }

  if (nextLineHasNumberParenthesisSuffix) {
    // It is optional to have blank lines between number parenthesis suffixes. Match the existing
    // comment.
    return nextLineIsBlank;
  }

  if (nextLineIsBulletPoint) {
    // It is mandatory to have a blank line in between a non-bullet point and the first bullet point
    // in a list, unless the previous line ended in a colon. (This is because without a blank line,
    // it is difficult to tell where bulleted lists begin.)
    if (nextLineIsFirstBulletPoint && !endsInColon) {
      return true;
    }

    // It is optional to have blank lines between bullet points. Match the existing comment.
    return nextLineIsBlank;
  }

  // It is valid to have blank lines after URLs (or not). Match the existing comment.
  if (thisBlockHasURL) {
    return nextLineIsBlank;
  }

  return true;
}
