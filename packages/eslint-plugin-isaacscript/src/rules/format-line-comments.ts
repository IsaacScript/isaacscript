import { TSESTree } from "@typescript-eslint/utils";
import { formatText } from "../format";
import {
  getCommentBlocks,
  getLeadingLineComments,
} from "../leadingLineComments";
import { areStringsEqualExcludingTrailingSpaces, createRule } from "../utils";

const RULE_NAME = "format-line-comments";
const SLASH_SLASH = "//";
const DEBUG = false as boolean;

type Options = [
  {
    maxLength: number;
  },
];

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
   * We need to write the rule in such a way that it operates on the entire source code instead of
   * individual AST nodes:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   */
  create(context, [options]) {
    const { maxLength } = options;

    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    // We only look at `//` style comments on their own line.
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

      const effectiveMaxLength =
        maxLength - leftWhitespaceLength - "// ".length;
      const formattedTextRaw = formatText(
        commentBlock.mergedText,
        effectiveMaxLength,
        false,
      );
      const formattedText = convertTextToLeadingLineComments(
        formattedTextRaw,
        leftWhitespace,
      );

      if (DEBUG) {
        console.log("originalText:");
        console.log(originalText);
        console.log("formattedText:");
        console.log(formattedText);
      }

      if (
        !areStringsEqualExcludingTrailingSpaces(originalText, formattedText)
      ) {
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

/** Converts "Foo" to "// Foo". */
function convertTextToLeadingLineComments(
  text: string,
  leftWhitespace: string,
) {
  const lines = text.split("\n");
  const linesWithPrefix = lines.map(
    (line) => `${leftWhitespace}${SLASH_SLASH} ${line}`,
  );
  return linesWithPrefix.join("\n");
}
