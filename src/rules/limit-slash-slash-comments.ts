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
 * An object containing one or more contiguous comments. For example:
 *
 * ```ts
 * // A comment.
 * // Another comment.
 * ```
 */
interface CommentBlock {
  mergedText: string;
  originalComments: TSESTree.Comment[];

  /**
   * The amount of spaces before a sub bullet. For example, the following bullet points would have
   * a `subBulletIndentLength` of "" and "  " respectively:
   *
   * - First bullet point.
   *   - Sub bullet point.
   */
  subBulletIndent: string;
}

const RULE_NAME = "limit-slash-slash-comments";

const SLASH_SLASH = "//";

export const limitSlashSlashComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: "Disallows `//` comments longer than N characters",
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
     * We only look at `//` style comments on their own line. `/*` style comments are handled by the
     * "limit-jsdoc-comment" rule.
     */
    const slashSlashComments = getStandaloneSlashSlashComments(
      sourceCode,
      comments,
    );

    // Sort the comments by blocks
    const commentBlocks = getCommentBlocks(slashSlashComments);

    commentBlocks.forEach((commentBlock) => {
      const firstComment = commentBlock.originalComments.at(0);
      if (firstComment === undefined) {
        throw new Error("Failed to get the first comment.");
      }

      const lastComment = commentBlock.originalComments.at(-1);
      if (lastComment === undefined) {
        throw new Error("Failed to get the last comment");
      }

      const leftWhitespaceLength = firstComment.loc.start.column;
      const leftWhitespace = " ".repeat(leftWhitespaceLength);

      const originalText = getTextFromComments(
        commentBlock.originalComments,
        leftWhitespace,
      );
      const text = commentBlock.subBulletIndent + commentBlock.mergedText;
      const linePrefix = `${leftWhitespace}${SLASH_SLASH} `;
      const formattedText = getFormattedCommentText(
        text,
        linePrefix,
        maxLength,
      );

      if (originalText !== formattedText) {
        context.report({
          loc: {
            start: firstComment.loc.start,
            end: lastComment.loc.end,
          },
          messageId: "incorrectlyFormatted",
          data: {
            maxLength,
          },
          fix: (fixer) => {
            const [firstCommentStart, _firstCommentEnd] = firstComment.range;
            const [_lastCommentStart, lastCommentEnd] = lastComment.range;
            const firstCommentBeginningOfLine =
              firstCommentStart - firstComment.loc.start.column;
            const range: readonly [number, number] = [
              firstCommentBeginningOfLine,
              lastCommentEnd,
            ];

            return fixer.replaceTextRange(range, formattedText);
          },
        });
      }
    });

    return {};
  },
});

function getStandaloneSlashSlashComments(
  sourceCode: TSESLint.SourceCode,
  comments: TSESTree.Comment[],
) {
  return comments.filter(
    (comment) =>
      comment.type === TSESTree.AST_TOKEN_TYPES.Line && // i.e. a "//" comment
      comment.value.trim() !== "" &&
      comment.value[0] !== "/" && // Filter out triple slash directives
      isCommentOnOwnLine(sourceCode, comment),
  );
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
function getCommentBlocks(comments: TSESTree.Comment[]): CommentBlock[] {
  const commentBlocks: CommentBlock[] = [];

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment === undefined) {
      continue;
    }

    /**
     * Remove the initial space that will always live in front of comment line.
     *
     * For example, the comment of:
     *
     * // Foo
     *
     * Has a comment value of " Foo".
     */
    const text = comment.value.slice(1);
    const subBulletIndent = getSpacesBeforeBulletPoint(text);

    const commentBlock: CommentBlock = {
      mergedText: comment.value.trim(),
      originalComments: [comment],
      subBulletIndent,
    };

    const commentIndex = i; // Make a copy of the comment index since we will mutate i later
    const firstCommentStartLine = comment.loc.start.line;

    // Ignore "block" comments
    const hasAllHyphens = /^\s*-+\s*$/.test(text);
    if (!hasAllHyphens) {
      // Look for one or more "connecting" comments on the next subsequent lines
      for (let j = i + 1; j < comments.length; j++) {
        const nextComment = comments[j];
        if (nextComment === undefined) {
          break;
        }

        // Break if we are on a non-contiguous line
        const nextCommentStartLine = nextComment.loc.start.line;
        const lineDelta = j - commentIndex;
        if (nextCommentStartLine !== firstCommentStartLine + lineDelta) {
          break;
        }

        // Break if the next line starts with a bullet point
        if (startsWithBulletPoint(nextComment.value)) {
          break;
        }

        commentBlock.mergedText += " ";
        commentBlock.mergedText += nextComment.value.trim();
        commentBlock.originalComments.push(nextComment);

        // Since we merged this comment, we can skip over examining it in the parent for loop
        i += 1;
      }
    }

    commentBlocks.push(commentBlock);
  }

  return commentBlocks;
}

/**
 * Given an array of comments, transform the text back into how it would look in the real source
 * code.
 *
 * Note that this should not include the left whitespace before the comment actually begins, because
 * we need to compare the vanilla source code to the formatted source code without worrying about
 * any leading whitespace.
 */
function getTextFromComments(
  comments: TSESTree.Comment[],
  leftWhitespace: string,
) {
  const lines = comments.map(
    /**
     * It is assumed that `comment.value` will always have a leading space, due to Prettier
     * changing `//Comment` to `// Comment`.
     */
    (comment) => `${leftWhitespace}${SLASH_SLASH}${comment.value}`,
  );
  return lines.join("\n");
}
