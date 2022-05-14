import { TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import {
  getMessageIDFromSentenceKind,
  getSentenceKind,
  isSpecialComment,
} from "../comments";
import { getJSDocComments, getTextBlocksFromJSDocComment } from "../jsdoc";
import { createRule, hasURL } from "../utils";

type Options = [];

// ts-prune-ignore-next
export type MessageIds = "missingCapital" | "missingPeriod";

export const completeSentencesJSDoc = createRule<Options, MessageIds>({
  name: "complete-sentences-jsdoc",
  meta: {
    type: "problem",
    docs: {
      description: "Enforces complete sentences for JSDoc comments",
      recommended: "error",
    },
    schema: [],
    messages: {
      missingCapital:
        "JSDoc comments must contain complete sentences with a capital letter.\n{{ sentence }}",
      missingPeriod:
        "JSDoc comments must contain complete sentences with a trailing period.\n{{ sentence }}",
    },
  },
  defaultOptions: [],

  /**
   * It is not possible to get single-line comments in the AST:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   *
   * Thus, we need to write the rule in such a way that it operates on the entire source code
   * instead of individual AST nodes.
   */
  create(context) {
    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    // We only look at `/**` style comments.
    const jsDocComments = getJSDocComments(comments);

    jsDocComments.forEach((comment) => {
      const textBlocks = getTextBlocksFromJSDocComment(comment);

      for (let i = 0; i < textBlocks.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const textBlock = textBlocks[i]!;
        const { text, insideCodeBlock } = textBlock;

        // Everything in a code block is whitelisted.
        if (insideCodeBlock) {
          continue;
        }

        // URLs are whitelisted.
        const nextTextBlock = textBlocks[i + 1];
        if (hasURL(text)) {
          continue;
        }
        if (
          !textBlock.insertBlankLineBelow &&
          nextTextBlock !== undefined &&
          hasURL(nextTextBlock.text)
        ) {
          continue;
        }

        // Special comments are whitelisted.
        if (isSpecialComment(text)) {
          continue;
        }

        // If this is a JSDoc tag, we need to extract the description out of it.
        const sentence = getSentenceFromJSDocTag(text);

        const sentenceKind = getSentenceKind(sentence);
        const messageId = getMessageIDFromSentenceKind(sentenceKind);
        if (messageId !== undefined) {
          report(context, comment, messageId as MessageIds, sentence);
        }
      }
    });

    return {};
  },
});

function getSentenceFromJSDocTag(text: string) {
  text = text.trim();

  // Base case: ignore non-JSDoc tags.
  const hasJSDocTag = text.startsWith("@");
  if (!hasJSDocTag) {
    return text;
  }

  // Lone JSDoc tags do not contain any sentences that we want to parse.
  const loneTagMatch = text.match(/^@\w+$/);
  if (loneTagMatch !== null) {
    return "";
  }

  // Extract the name of the JSDoc tag.
  const tagMatch = text.match(/^@(\w+) /);
  if (tagMatch === null) {
    return "";
  }

  const tag = tagMatch[1];
  if (tag === undefined) {
    return "";
  }

  // Specific JSDoc tags have words after them that we want to ignore. For example, we want to
  // ignore the variable name after a "@param" tag.
  if (tag === "param") {
    const paramMatch = text.match(/^@\w+ \w+ (.*)/);
    if (paramMatch === null) {
      return "";
    }

    const sentence = paramMatch[1];
    if (sentence === undefined) {
      return "";
    }

    return sentence;
  }

  const sentenceMatch = text.match(/^@\w+ (.*)/);
  if (sentenceMatch === null) {
    return "";
  }

  const sentence = sentenceMatch[1];
  if (sentence === undefined) {
    return "";
  }

  return sentence;
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
