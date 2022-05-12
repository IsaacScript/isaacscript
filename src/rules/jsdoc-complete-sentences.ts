import { TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import { getJSDocComments, getTextBlocksFromJSDocComment } from "../jsdoc";
import { createRule, ensureAllCases, hasURL } from "../utils";

type Options = [];

// ts-prune-ignore-next
export type MessageIds = "missingCapital" | "missingPeriod";

enum SentenceKind {
  Complete,
  MissingCapital,
  MissingPeriod,
  NonSentence,
}

/**
 * From:
 * https://stackoverflow.com/questions/69335072/javascript-regex-to-match-jsdoc-tags-inside-a-documentation-block
 */
const JSDOC_TAG_REGEX =
  /^@(?<tag>\w+)(?:[ \t]+{(?<type>[^{}]*)})?[ \t]+(?<name>\w+)(?:[ \t]+(?<desc>.*(?:\n(?!\/{3} @\w).*)*))?/gm;

export const jsdocCompleteSentences = createRule<Options, MessageIds>({
  name: "jsdoc-complete-sentences",
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

      textBlocks.forEach((textBlock) => {
        const { text, insideCodeBlock } = textBlock;

        // Everything in a code block is whitelisted
        if (insideCodeBlock) {
          return;
        }

        // If this is a JSDoc tag, we need to extract the description out of it
        const sentence = getSentenceFromJSDocTag(text);

        const sentenceKind = getSentenceKind(sentence);
        switch (sentenceKind) {
          case SentenceKind.Complete:
          case SentenceKind.NonSentence: {
            return;
          }

          case SentenceKind.MissingCapital: {
            report(context, comment, "missingCapital", sentence);
            return;
          }

          case SentenceKind.MissingPeriod: {
            report(context, comment, "missingPeriod", sentence);
            return;
          }

          default: {
            ensureAllCases(sentenceKind);
          }
        }
      });
    });

    return {};
  },
});

function getSentenceFromJSDocTag(text: string) {
  text = text.trim();

  const hasJSDocTag = text.startsWith("@");
  if (!hasJSDocTag) {
    return text;
  }

  const match = JSDOC_TAG_REGEX.exec(text);
  if (match === null) {
    return text;
  }

  const { groups } = match;
  if (groups === undefined) {
    return text;
  }

  const description = groups["desc"];
  if (description === undefined) {
    return text;
  }

  return description;
}

function getSentenceKind(text: string): SentenceKind {
  // Trim the parenthesis and quotes surrounding the sentence, if any.
  text = text
    .trim()
    .replace(/^\(*/, "")
    .replace(/^'*/, "")
    .replace(/^"*/, "")
    .replace(/\)*$/, "")
    .replace(/'*$/, "")
    .replace(/"*$/, "")
    .trim();

  if (text === "") {
    return SentenceKind.NonSentence;
  }

  if (
    // Whitelist bullets.
    text.startsWith("-") ||
    // Whitelist text with URLS.
    hasURL(text) ||
    // Whitelist code blocks.
    text.includes("```")
  ) {
    return SentenceKind.NonSentence;
  }

  if (/^[a-z]/.test(text)) {
    return SentenceKind.MissingCapital;
  }

  if (
    !text.endsWith(".") &&
    // Allow ending with a colon, since it is implied that there is an example of something on the
    // subsequent block.
    !text.endsWith(":")
  ) {
    return SentenceKind.MissingPeriod;
  }

  return SentenceKind.Complete;
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
