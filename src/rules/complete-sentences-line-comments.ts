import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { getMessageIDFromSentenceKind, getSentenceKind } from "../comments";
import {
  getCommentBlocks,
  getLeadingLineComments,
} from "../leadingLineComments";
import { createRule } from "../utils";

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
    const multiLineCommentBlocks = commentBlocks.filter(
      (commentBlock) => commentBlock.originalComments.length > 1,
    );

    multiLineCommentBlocks.forEach((commentBlock) => {
      const firstComment = commentBlock.originalComments[0];
      if (firstComment === undefined) {
        return;
      }

      const sentence = commentBlock.mergedText;
      const sentenceKind = getSentenceKind(sentence);
      const messageId = getMessageIDFromSentenceKind(sentenceKind);
      if (messageId !== undefined) {
        report(context, firstComment, messageId as MessageIds, sentence);
      }
    });

    return {};
  },
});

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
