import { isSeparatorLine } from "../comments";
import type { CompleteSentenceMessageIds } from "../completeSentence";
import { getIncompleteSentences } from "../completeSentence";
import { JAVASCRIPT_RESERVED_WORDS_SET } from "../constants";
import {
  getCommentBlocks,
  getLeadingLineComments,
} from "../leadingLineComments";
import { createRule } from "../utils";

export type Options = [];

export const completeSentencesLineComments = createRule<
  Options,
  CompleteSentenceMessageIds
>({
  name: "complete-sentences-line-comments",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces complete sentences for multi-line leading line comments",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      missingCapital:
        "Leading line comments must contain complete sentences with a capital letter.\n{{ sentence }}",
      missingPeriod:
        "Leading line comments must contain complete sentences with a trailing period.\n{{ sentence }}",
      doublePeriod:
        "Leading line comments must not end with a double period. Did you make a typo?\n{{ sentence }}",
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    // We only look at `//` style comments on their own line.
    const leadingLineComments = getLeadingLineComments(sourceCode, comments);

    // Sort the comments by blocks.
    const commentBlocks = getCommentBlocks(leadingLineComments);

    for (const [i, commentBlock] of commentBlocks.entries()) {
      const firstComment = commentBlock.originalComments.at(0);
      if (firstComment === undefined) {
        throw new Error("Failed to get the first comment.");
      }

      const lastComment = commentBlock.originalComments.at(-1);
      if (lastComment === undefined) {
        throw new Error("Failed to get the last comment");
      }

      // Comments in-between "separator lines" are whitelisted.
      const previousCommentBlock = commentBlocks[i - 1];
      if (
        previousCommentBlock !== undefined &&
        isSeparatorLine(previousCommentBlock.mergedText)
      ) {
        continue;
      }
      const nextCommentBlock = commentBlocks[i + 1];
      if (
        nextCommentBlock !== undefined &&
        isSeparatorLine(nextCommentBlock.mergedText)
      ) {
        continue;
      }

      // Unlike JSDoc comments, we want to whitelist comment blocks that begin with JavaScript
      // keywords. This is to make commenting out code less painful. e.g. `// const foo = 123;`
      const text = commentBlock.mergedText;
      const firstWord = getFirstWord(text);
      if (JAVASCRIPT_RESERVED_WORDS_SET.has(firstWord)) {
        continue;
      }

      const incompleteSentences = getIncompleteSentences(text);
      for (const incompleteSentence of incompleteSentences) {
        context.report({
          loc: {
            start: firstComment.loc.start,
            end: lastComment.loc.end,
          },
          messageId: incompleteSentence.messageId,
          data: {
            sentence: incompleteSentence.sentence,
          },
        });
      }
    }

    return {};
  },
});

function getFirstWord(text: string): string {
  const words = text.split(" ");
  const firstWord = words[0];
  return firstWord ?? "";
}
