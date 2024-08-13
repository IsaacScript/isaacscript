import { getJSDocComments } from "../jsdoc.js";
import { createRule } from "../utils.js";

export const noEmptyJSDoc = createRule({
  name: "no-empty-jsdoc",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows empty JSDoc comments",
      recommended: true,
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      isEmpty: "Empty JSDoc comments are not allowed.",
    },
    fixable: "code",
  },
  defaultOptions: [],

  /**
   * We need to write the rule in such a way that it operates on the entire source code instead of
   * individual AST nodes:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   */
  create(context) {
    const comments = context.sourceCode.getAllComments();

    // We only look at `/**` style comments on their own line.
    const jsDocComments = getJSDocComments(comments);

    for (const comment of jsDocComments) {
      const text = comment.value.trim();
      const textWithoutAsterisks = text.replaceAll("*", "");
      const commentBody = textWithoutAsterisks.trim();

      if (commentBody === "") {
        context.report({
          loc: {
            start: comment.loc.start,
            end: comment.loc.end,
          },
          messageId: "isEmpty",
          fix: (fixer) => fixer.replaceTextRange(comment.range, ""),
        });
      }
    }

    return {};
  },
});
