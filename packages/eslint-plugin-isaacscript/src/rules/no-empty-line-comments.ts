import { TSESTree } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const noEmptyLineComments = createRule({
  name: "no-empty-line-comments",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows empty line comments",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      isEmpty: "Empty line comments comments are not allowed.",
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
    const sourceCode = context.getSourceCode();
    const comments = sourceCode.getAllComments();
    const emptyLeadingLineComments = comments.filter(
      (comment) =>
        comment.type === TSESTree.AST_TOKEN_TYPES.Line && // i.e. a "//" comment
        comment.value.trim() === "",
    );

    for (const comment of emptyLeadingLineComments) {
      context.report({
        loc: {
          start: comment.loc.start,
          end: comment.loc.end,
        },
        messageId: "isEmpty",
        fix: (fixer) => fixer.replaceTextRange(comment.range, ""),
      });
    }

    return {};
  },
});
