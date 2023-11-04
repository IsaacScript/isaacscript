import type { TSESTree } from "@typescript-eslint/utils";
import { formatText } from "../format";
import { assertDefined } from "../isaacScriptCommonTS";
import {
  allCommentsInBlockAreCommentedOutArrayElements,
  getCommentBlocks,
  getLeadingLineComments,
} from "../leadingLineComments";
import { areStringsEqualExcludingTrailingSpaces, createRule } from "../utils";

const SLASH_SLASH = "//";
const DEBUG = false as boolean;

export type Options = [
  {
    maxLength: number;
  },
];

export type MessageIds = "incorrectlyFormatted";

export const formatLineComments = createRule<Options, MessageIds>({
  name: "format-line-comments",
  meta: {
    type: "layout",
    docs: {
      description:
        "Disallows `//` comments longer than N characters and multi-line comments that can be merged together",
      recommended: "recommended",
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

    for (const commentBlock of commentBlocks) {
      const firstComment = commentBlock.originalComments.at(0);
      assertDefined(firstComment, "Failed to get the first comment.");

      const lastComment = commentBlock.originalComments.at(-1);
      assertDefined(lastComment, "Failed to get the last comment.");

      // Commented out array elements are whitelisted.
      if (allCommentsInBlockAreCommentedOutArrayElements(commentBlock)) {
        continue;
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

      if (DEBUG && originalText !== formattedText) {
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
            const range = [
              firstCommentBeginningOfLine,
              lastCommentEnd,
            ] as const;

            return fixer.replaceTextRange(range, formattedText);
          },
        });
      }
    }

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
): string {
  const lines = comments.map(
    // `comment.value` will almost always have a leading leading space, due to Prettier changing
    // `//Comment` to `// Comment`. But it is also possible that the rule is running before Prettier
    // has had a chance to format the code. Either way, we want this function to represent the text
    // as it really is in the source code.
    (comment) => `${leftWhitespace}${SLASH_SLASH}${comment.value}`,
  );
  return lines.join("\n");
}

/** Converts "Foo" to "// Foo". */
function convertTextToLeadingLineComments(
  text: string,
  leftWhitespace: string,
): string {
  const lines = text.split("\n");
  const linesWithPrefix = lines.map(
    (line) => `${leftWhitespace}${SLASH_SLASH} ${line}`,
  );
  return linesWithPrefix.join("\n");
}
