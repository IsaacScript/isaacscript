import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const completeSentencesLineComments = createRule({
  name: "complete-sentences-line-comments",
  meta: {
    type: "problem",
    docs: {
      description: "Enforces complete sentences for multi-line leading line comments",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      foo: "Foo must be bar.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
    };
  },
});
