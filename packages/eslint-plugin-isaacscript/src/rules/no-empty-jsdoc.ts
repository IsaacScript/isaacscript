import { getJSDocComments } from "../jsdoc";
import { createRule } from "../utils";

export const noEmptyJSDoc = createRule({
  name: "no-empty-jsdoc",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows empty JSDoc comments",
      recommended: "error",
    },
    schema: [],
    messages: {
      isEmpty: "Empty JSDoc comments are not allowed.",
    },
    fixable: "code",
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

    // We only look at `/**` style comments on their own line.
    const jsDocComments = getJSDocComments(comments);

    jsDocComments.forEach((comment) => {
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
    });

    return {};
  },
});
