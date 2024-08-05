import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc.js";
import { createRule } from "../utils.js";

export const jsdocCodeBlockLanguage = createRule({
  name: "jsdoc-code-block-language",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires a language specification for every JSDoc code block",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noLanguage: "You must specify a language for the code block.",
    },
  },
  defaultOptions: [],

  /**
   * We need to write the rule in such a way that it operates on the entire source code instead of
   * individual AST nodes:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   */
  create(context) {
    const comments = context.sourceCode.getAllComments();

    // We only look at `/**` style comments.
    const jsDocComments = getJSDocComments(comments);

    for (const comment of jsDocComments) {
      const text = getTextFromJSDocComment(comment.value);
      const lines = text.split("\n");

      // We only want to match the opening backticks of a code block.
      let insideCodeBlock = false;
      for (const line of lines) {
        if (line.includes("```")) {
          insideCodeBlock = !insideCodeBlock;
        }

        if (!insideCodeBlock) {
          continue;
        }

        if (line.endsWith("```")) {
          context.report({
            loc: {
              start: comment.loc.start,
              end: comment.loc.end,
            },
            messageId: "noLanguage",
          });
        }
      }
    }

    return {};
  },
});
