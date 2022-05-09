import { TSESTree } from "@typescript-eslint/utils";
import { SourceCode } from "@typescript-eslint/utils/dist/ts-eslint";
import { isCommentOnOwnLine } from "../comments";
import { createRule } from "../utils";

type Options = [
  {
    maxLength: number;
  },
];

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
}

const RULE_NAME = "limit-slash-slash-comments";

const SLASH_SLASH = "//";

export const limitSlashSlashComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: 'Disallows "//" comments longer than N characters',
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
    const commentBlocks = getCommentBlocks(sourceCode, comments);

    commentBlocks.forEach((commentBlock) => {
      const firstComment = commentBlock.originalComments.at(0);
      if (firstComment === undefined) {
        throw new Error("Failed to get the first comment.");
      }

      const lastComment = commentBlock.originalComments.at(-1);
      if (lastComment === undefined) {
        throw new Error("Failed to get the last comment");
      }

      const leftWhitespace = firstComment.loc.start.column;
      const originalText = getTextFromComments(commentBlock.originalComments);
      const formattedText = getFormattedText(
        commentBlock.mergedText,
        leftWhitespace,
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
            const range: readonly [number, number] = [
              firstCommentStart,
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
 * Returns an array of grouped comments. For example, the following code would return an array of
 * three comment blocks:
 *
 * ```ts
 * // This is a comment.
 *
 * // This is another comment.
 * // This is yet another comment.
 *
 * // This is a variable.
 * const abc = 123;
 * ```
 */
function getCommentBlocks(
  sourceCode: SourceCode,
  comments: TSESTree.Comment[],
): CommentBlock[] {
  const commentBlocks: CommentBlock[] = [];

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment === undefined || !shouldLintComment(sourceCode, comment)) {
      continue;
    }

    const commentBlock: CommentBlock = {
      mergedText: comment.value.trim(),
      originalComments: [comment],
    };

    const commentIndex = i; // Make a copy of the comment index since we will mutate i later
    const firstCommentStartLine = comment.loc.start.line;

    // Look for one or more "connecting" comments on the next subsequent lines
    for (let j = i + 1; j < comments.length; j++) {
      const nextComment = comments[j];
      if (
        nextComment === undefined ||
        !shouldLintComment(sourceCode, nextComment)
      ) {
        break;
      }

      const nextCommentStartLine = nextComment.loc.start.line;
      const lineDelta = j - commentIndex;
      if (nextCommentStartLine !== firstCommentStartLine + lineDelta) {
        break;
      }

      commentBlock.mergedText += " ";
      commentBlock.mergedText += nextComment.value.trim();
      commentBlock.originalComments.push(nextComment);

      // Since we merged this comment, we can skip over examining it in the parent for loop
      i += 1;
    }

    commentBlocks.push(commentBlock);
  }

  return commentBlocks;
}

function shouldLintComment(sourceCode: SourceCode, comment: TSESTree.Comment) {
  return (
    comment !== undefined &&
    comment.value.trim() !== "" &&
    comment.type === TSESTree.AST_TOKEN_TYPES.Line &&
    isCommentOnOwnLine(sourceCode, comment)
  );
}

function getFormattedText(
  text: string,
  leftWhitespaceLength: number,
  maxLength: number,
): string {
  const lineStartSize = leftWhitespaceLength + SLASH_SLASH.length;
  const whitespace = " ".repeat(leftWhitespaceLength);
  const words = text.split(" ");

  const formattedWordsObject = words.reduce(
    (accumulator, word) => {
      const numAddedCharacters = " ".length + word.length;
      const lineLengthIfAdded =
        accumulator.currentLineLength + numAddedCharacters;

      // We can safely split to a new line if:
      // 1) we are reaching an overflowing line
      // 2) and there is at least one word on the current line
      const splitToNewline =
        lineLengthIfAdded > maxLength &&
        accumulator.currentLineLength !== lineStartSize;

      if (splitToNewline) {
        return {
          value: `${accumulator.value}\n${whitespace}${SLASH_SLASH} ${word}`,
          currentLineLength: lineStartSize + numAddedCharacters,
        };
      }

      return {
        value: `${accumulator.value} ${word}`,
        currentLineLength: lineLengthIfAdded,
      };
    },
    { value: SLASH_SLASH, currentLineLength: lineStartSize },
  );

  return formattedWordsObject.value;
}

/**
 * Given an array of comments, transform the text back into how it would look in the real source
 * code.
 */
function getTextFromComments(comments: TSESTree.Comment[]) {
  const lines = comments.map((comment) => `${SLASH_SLASH}${comment.value}`);
  return lines.join("\n");
}
