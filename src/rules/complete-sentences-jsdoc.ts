import { TSESTree } from "@typescript-eslint/types";
import { TSESLint } from "@typescript-eslint/utils";
import { BulletPointKind, getBulletPointKind } from "../comments";
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

function getSentenceKind(text: string): SentenceKind {
  // Trim the parenthesis surrounding the sentence, if any.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const textBeforeModifications = text;
    text = text.trim().replace(/^\(*/, "").replace(/\)*$/, "").trim();
    if (text === textBeforeModifications) {
      break;
    }
  }

  if (text === "") {
    return SentenceKind.NonSentence;
  }

  // Ignore comments that only contain asterisks.
  if (/^\*+$/.test(text)) {
    return SentenceKind.NonSentence;
  }

  const bulletPointKind = getBulletPointKind(text);

  if (
    // Whitelist bullets.
    bulletPointKind !== BulletPointKind.NonBulletPoint ||
    // Whitelist text with URLS.
    hasURL(text) ||
    // Whitelist code blocks.
    text.includes("```") ||
    // Whitelist single JSDoc tags.
    /^@\w+$/.test(text)
  ) {
    return SentenceKind.NonSentence;
  }

  if (/^[a-z]/.test(text)) {
    return SentenceKind.MissingCapital;
  }

  if (
    !text.endsWith(".") &&
    // Allow ending with a period inside of a single quote or double quote, since it is implied that
    // this is a fully quoted sentence.
    !text.endsWith('."') &&
    !text.endsWith(".'") &&
    // Allow ending with a colon, since it is implied that there is an example of something on the
    // subsequent block.
    !text.endsWith(":") &&
    // Allow ending with a quote or backtick if this is an example of something indicated with a
    // colon, like: "Use the following code: `foo()`"
    !(
      text.includes(":") &&
      (text.endsWith('"') || text.endsWith("'") || text.endsWith("`"))
    )
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
