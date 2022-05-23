import {
  CompleteSentenceMessageIds,
  getIncompleteSentences,
} from "../completeSentence";
import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc";
import { createRule } from "../utils";

type Options = [];

export const completeSentencesJSDoc = createRule<
  Options,
  CompleteSentenceMessageIds
>({
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
      const text = getTextFromJSDocComment(comment.value);
      const incompleteSentences = getIncompleteSentences(text);
      incompleteSentences.forEach((incompleteSentence) => {
        context.report({
          loc: {
            start: comment.loc.start,
            end: comment.loc.end,
          },
          messageId: incompleteSentence.messageId,
          data: {
            sentence: incompleteSentence.sentence,
          },
        });
      });
    });

    return {};
  },
});
