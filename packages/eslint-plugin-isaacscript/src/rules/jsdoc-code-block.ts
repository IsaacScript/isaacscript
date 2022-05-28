import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const jsdocCodeBlock = createRule({
  name: "jsdoc-code-block",
  meta: {
    type: "problem",
    docs: {
      description: "Requires a language for every JSDoc code block",
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
