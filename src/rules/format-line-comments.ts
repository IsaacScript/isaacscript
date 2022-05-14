import { TSESTree } from "@typescript-eslint/utils";
import { getFormattedCommentText } from "../format";
import {
  getCommentBlocks,
  getLeadingLineComments,
} from "../leadingLineComments";
import { createRule, isStringsEqualExcludingTrailingSpaces } from "../utils";

const RULE_NAME = "format-line-comments";
const SLASH_SLASH = "//";
const DEBUG = false;

type Options = [
  {
    maxLength: number;
  },
];

// ts-prune-ignore-next
export type MessageIds = "incorrectlyFormatted";

export const formatLineComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description:
        "Disallows `//` comments longer than N characters and multi-line comments that can be merged together",
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
     * We only look at `//` style comments on their own line. `/*` style comments are handled by the
     * "format-jsdoc-comment" rule.
     */
    const leadingLineComments = getLeadingLineComments(sourceCode, comments);

    // Sort the comments by blocks.
    const commentBlocks = getCommentBlocks(leadingLineComments);

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

      if (DEBUG) {
        console.log("originalText:"); // eslint-disable-line no-console
        console.log(originalText); // eslint-disable-line no-console
        console.log("formattedText:"); // eslint-disable-line no-console
        console.log(formattedText); // eslint-disable-line no-console
      }

      if (!isStringsEqualExcludingTrailingSpaces(originalText, formattedText)) {
        context.report({
          loc: {
            start: firstComment.loc.start,
            end: lastComment.loc.end,
          },
          messageId: "incorrectlyFormatted",
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
     * It is assumed that `comment.value` will always have a leading space, due to Prettier changing
     * `//Comment` to `// Comment`.
     */
    (comment) => `${leftWhitespace}${SLASH_SLASH}${comment.value}`,
  );
  return lines.join("\n");
}
