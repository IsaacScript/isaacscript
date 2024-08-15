import type { CompleteSentenceMessageIds } from "../completeSentence.js";
import { getIncompleteSentences } from "../completeSentence.js";
import { getJSDocComments, getTextFromJSDocComment } from "../jsdoc.js";
import { createRule } from "../utils.js";

export type Options = [];

export const completeSentencesJSDoc = createRule<
  Options,
  CompleteSentenceMessageIds
>({
  name: "complete-sentences-jsdoc",
  meta: {
    type: "problem",
    docs: {
      description: "Requires complete sentences for JSDoc comments",
      recommended: true,
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      missingCapital:
        "JSDoc comments must contain complete sentences with a capital letter.\n{{ sentence }}",
      missingPeriod:
        "JSDoc comments must contain complete sentences with a trailing period.\n{{ sentence }}",
      doublePeriod:
        "JSDoc comments must not end with a double period. Did you make a typo?.\n{{ sentence }}",
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
      const incompleteSentences = getIncompleteSentences(text);

      for (const incompleteSentence of incompleteSentences) {
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
      }
    }

    return {};
  },
});
