import { getJSDocComments, getTextBlocksFromJSDocComment } from "../jsdoc";
import { createRule, hasURL } from "../utils";

type Options = [];

// ts-prune-ignore-next
export type MessageIds = "notComplete";

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
      notComplete:
        "JSDoc comments must contain complete sentences with a capital letter and a period.\n{{ sentence }}",
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

        // If this is a JSDoc tag, we need to extract the description out of it
        const sentence = getSentenceFromJSDocTag(text);

        if (!isCompleteSentence(sentence) && !insideCodeBlock) {
          context.report({
            loc: {
              start: comment.loc.start,
              end: comment.loc.end,
            },
            messageId: "notComplete",
            data: {
              sentence: textBlock.text,
            },
          });
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

function isCompleteSentence(text: string) {
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

  if (
    // Whitelist bullets.
    text.startsWith("-") ||
    // Whitelist text with URLS.
    hasURL(text) ||
    // Whitelist code blocks.
    text.includes("```")
  ) {
    return true;
  }

  // Starts with a capital letter or a number.
  if (!/^[A-Z0-9]/.test(text)) {
    return false;
  }

  return (
    // Ends with a period.
    text.endsWith(".") ||
    // Allow ending with a colon, since it is implied that there is an example of something on the
    // subsequent block.
    text.endsWith(":")
  );
}
