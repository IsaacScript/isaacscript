import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc";
import { createRule } from "../utils";

export const jsdocCodeBlock = createRule({
  name: "jsdoc-code-block",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires a language specification for every JSDoc code block",
      recommended: "error",
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
    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();

    // We only look at `/**` style comments.
    const jsDocComments = getJSDocComments(comments);

    jsDocComments.forEach((comment) => {
      const text = getTextFromJSDocComment(comment.value);
      if (text.includes("```\n")) {
        context.report({
          loc: {
            start: comment.loc.start,
            end: comment.loc.end,
          },
          messageId: "noLanguage",
        });
      }
    });

    return {};
  },
});
