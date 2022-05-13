import { TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import {
  BulletPointKind,
  getAdjustedBulletPointKind,
  getBulletPointKind,
  getSpacesBeforeBulletPoint,
  isCommentOnOwnLine,
  isSpecialComment,
  startsWithExample,
} from "./comments";
import { hasURL } from "./utils";

/**
 * An object containing one or more contiguous comments. For example:
 *
 * ```ts
 * // A comment.
 * // Another comment.
 * ```
 */
export interface CommentBlock {
  mergedText: string;
  originalComments: TSESTree.Comment[];
  bulletPointKind: BulletPointKind;

  /**
   * The amount of spaces before a sub bullet. For example, the following bullet points would have a
   * `subBulletIndentLength` of "" and "  " respectively:
   *
   * - First bullet point.
   *   - Sub bullet point.
   */
  subBulletIndent: string;
}

/**
 * Returns an array of grouped comments. For example, the following code would return an array of
 * three comment blocks:
 *
 * ```ts
 * // This is the first block.
 *
 * // This is the second block.
 * // We are still in the second block, because there has not been a newline separator yet.
 *
 * // This is the third block.
 * ```
 */
export function getCommentBlocks(comments: TSESTree.Comment[]): CommentBlock[] {
  const commentBlocks: CommentBlock[] = [];

  for (let i = 0; i < comments.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const comment = comments[i]!;

    /**
     * Remove the initial space that will always live in front of comment line.
     *
     * For example, the comment of:
     *
     * // Foo.
     *
     * Has a comment value of: " Foo."
     */
    const text = comment.value.slice(1);

    const bulletPointKind = getBulletPointKind(text);
    const subBulletIndent = getSpacesBeforeBulletPoint(text);

    const commentBlock: CommentBlock = {
      mergedText: comment.value.trim(),
      originalComments: [comment],
      bulletPointKind,
      subBulletIndent,
    };

    const commentIndex = i; // Make a copy of the comment index since we will mutate i later.
    const firstCommentStartLine = comment.loc.start.line;

    // Gather information about this line.
    const isBlankLine = text.trim() === "";
    const endsWithColon = text.trimEnd().endsWith(":");
    const separatorLine = isSeparatorLine(text);
    const hasURLInside = hasURL(text);

    // Always put certain kinds of comments on their own blocks.
    const shouldBeInSelfContainedBlock = separatorLine || hasURLInside;

    if (!shouldBeInSelfContainedBlock) {
      // Look for one or more "connecting" comments on the next subsequent lines.
      for (let j = i + 1; j < comments.length; j++) {
        const nextComment = comments[j];
        if (nextComment === undefined) {
          break;
        }

        // Break if we are on a non-contiguous line.
        const nextCommentStartLine = nextComment.loc.start.line;
        const lineDelta = j - commentIndex;
        if (nextCommentStartLine !== firstCommentStartLine + lineDelta) {
          break;
        }

        const nextCommentBulletPointKind = getAdjustedBulletPointKind(
          nextComment.value,
          isBlankLine,
          endsWithColon,
          bulletPointKind,
        );

        // Break if we are not in a bulleted list and we encounter a bullet point.
        if (
          bulletPointKind === BulletPointKind.NonBulletPoint &&
          nextCommentBulletPointKind !== BulletPointKind.NonBulletPoint
        ) {
          break;
        }

        // Break if we are in a bullet point list and we encounter the same kind of bullet point
        if (
          bulletPointKind !== BulletPointKind.NonBulletPoint &&
          nextCommentBulletPointKind === bulletPointKind
        ) {
          break;
        }

        // Break if the next line is an example.
        if (startsWithExample(nextComment.value)) {
          break;
        }

        // Break if the next line is a "special" comment like "eslint-disable-next-line".
        if (isSpecialComment(nextComment.value)) {
          break;
        }

        // Break if the next line is a "separator" line.
        const nextCommentIsSeparator = isSeparatorLine(nextComment.value);
        if (nextCommentIsSeparator) {
          break;
        }

        // Break if the next line has a URL.
        const nextCommentHasURL = hasURL(nextComment.value);
        if (nextCommentHasURL) {
          break;
        }

        commentBlock.mergedText += " ";
        commentBlock.mergedText += nextComment.value.trim();
        commentBlock.originalComments.push(nextComment);

        // Since we merged this comment, we can skip over examining it in the parent for loop.
        i += 1;

        // If we just merged a URL, then we need to break, since text should never follow URLs.
        if (hasURL(nextComment.value)) {
          break;
        }
      }
    }

    commentBlocks.push(commentBlock);
  }

  return commentBlocks;
}

export function getLeadingLineComments(
  sourceCode: TSESLint.SourceCode,
  comments: TSESTree.Comment[],
): TSESTree.Comment[] {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Line && // i.e. a "//" comment
      comment.value.trim() !== "" &&
      comment.value[0] !== "/" && // Filter out triple slash directives
      isCommentOnOwnLine(sourceCode, comment),
  );
}

/**
 * A "separator" line is a line with all hyphens like the following:
 *
 * ```ts
 * // ----------------
 * // Getter functions
 * // ----------------
 * ```
 */
export function isSeparatorLine(text: string): boolean {
  return /^\s*-+\s*$/.test(text);
}
