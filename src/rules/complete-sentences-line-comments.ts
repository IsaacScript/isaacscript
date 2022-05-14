import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { getMessageIDFromSentenceKind, getSentenceKind } from "../comments";
import {
  CommentBlock,
  getCommentBlocks,
  getLeadingLineComments,
  isSeparatorLine,
} from "../leadingLineComments";
import { createRule, hasURL } from "../utils";

type Options = [];

// ts-prune-ignore-next
export type MessageIds = "missingCapital" | "missingPeriod";

export const completeSentencesLineComments = createRule<Options, MessageIds>({
  name: "complete-sentences-line-comments",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces complete sentences for multi-line leading line comments",
      recommended: "error",
    },
    schema: [],
    messages: {
      missingCapital:
        "Leading line comments must contain complete sentences with a capital letter.\n{{ sentence }}",
      missingPeriod:
        "Leading line comments must contain complete sentences with a trailing period.\n{{ sentence }}",
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

    for (let i = 0; i < commentBlocks.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const commentBlock = commentBlocks[i]!;

      const firstComment = commentBlock.originalComments[0];
      if (firstComment === undefined) {
        continue;
      }

      // Single line comments are whitelisted.
      const nextCommentBlock = commentBlocks[i + 1];
      if (isSingleLineComment(commentBlock, nextCommentBlock)) {
        continue;
      }

      // URLs are whitelisted.
      if (hasURL(commentBlock.mergedText)) {
        continue;
      }
      if (
        nextCommentBlock !== undefined &&
        hasURL(nextCommentBlock.mergedText)
      ) {
        continue;
      }

      // Comments in-between separators are whitelisted.
      if (
        nextCommentBlock !== undefined &&
        isSeparatorLine(nextCommentBlock.mergedText)
      ) {
        continue;
      }

      const sentence = commentBlock.mergedText;
      const sentenceKind = getSentenceKind(sentence);
      const messageId = getMessageIDFromSentenceKind(sentenceKind);
      if (messageId !== undefined) {
        report(context, firstComment, messageId as MessageIds, sentence);
      }
    }

    return {};
  },
});

function isSingleLineComment(
  commentBlock: CommentBlock,
  nextCommentBlock: CommentBlock | undefined,
) {
  if (commentBlock.originalComments.length > 1) {
    return false;
  }

  const comment = commentBlock.originalComments[0];
  if (comment === undefined) {
    return true;
  }

  if (nextCommentBlock === undefined) {
    return true;
  }

  const nextComment = nextCommentBlock.originalComments[0];
  if (nextComment === undefined) {
    return true;
  }

  const nextCommentIsOnNextLine =
    comment.loc.end.line + 1 === nextComment.loc.start.line;
  return !nextCommentIsOnNextLine;
}

function report(
  context: TSESLint.RuleContext<MessageIds, []>,
  comment: TSESTree.Comment,
  messageId: MessageIds,
  sentence: string,
) {
  context.report({
    loc: {
      start: comment.loc.start,
      end: comment.loc.end,
    },
    messageId,
    data: {
      sentence,
    },
  });
}
