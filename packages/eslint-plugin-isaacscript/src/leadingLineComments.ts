import { TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { isCommentOnOwnLine, isSeparatorLine } from "./comments";

export function getLeadingLineComments(
  sourceCode: TSESLint.SourceCode,
  comments: TSESTree.Comment[],
): readonly TSESTree.Comment[] {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Line && // i.e. a "//" comment
      comment.value.trim() !== "" &&
      !comment.value.startsWith("/") && // Filter out triple slash directives
      isCommentOnOwnLine(sourceCode, comment),
  );
}

/**
 * An object containing one or more contiguous leading line comments. For example:
 *
 * ```ts
 * // The first line of the block.
 * // The second line of the block.
 * ```
 */
interface LeadingLineCommentBlock {
  mergedText: string;
  originalComments: TSESTree.Comment[];
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
export function getCommentBlocks(
  comments: readonly TSESTree.Comment[],
): readonly LeadingLineCommentBlock[] {
  const commentBlocks: LeadingLineCommentBlock[] = [];

  // We cannot use the `comments.entries` method because we mutate `i`.
  for (let i = 0; i < comments.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const comment = comments[i]!;

    /**
     * Remove the initial space that will always live in front of comment line.
     *
     * For example, the comment of:
     *
     * ```ts
     * // Foo.
     * ```
     *
     * Has a comment value of: " Foo."
     */
    const firstCharacter = comment.value[0];
    const firstCharacterIsSpace =
      firstCharacter !== undefined && firstCharacter === " ";
    const text = firstCharacterIsSpace ? comment.value.slice(1) : comment.value;

    const commentBlock: LeadingLineCommentBlock = {
      mergedText: text,
      originalComments: [comment],
    };

    const commentIndex = i; // Make a copy of the comment index since we will mutate i later.
    const firstCommentStartLine = comment.loc.start.line;

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

      // Break if this is a "separator" line.
      if (isSeparatorLine(nextComment.value)) {
        break;
      }

      commentBlock.mergedText += "\n";
      const nextText = nextComment.value.slice(1);
      commentBlock.mergedText += nextText;
      commentBlock.originalComments.push(nextComment);

      // Since we merged this comment, we can skip over examining it in the parent loop.
      i++;
    }

    commentBlocks.push(commentBlock);
  }

  return commentBlocks;
}

export function allCommentsInBlockAreCommentedOutArrayElements(
  commentBlock: LeadingLineCommentBlock,
): boolean {
  return commentBlock.originalComments.every(
    (comment) => comment.value.match(/^\s*"[^"]*",\s*$/) !== null,
  );
}
