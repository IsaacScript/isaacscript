import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const jsdocDescriptionNewline = createRule({
  name: "jsdoc-description-newline",
  meta: {
    type: "problem",
    docs: {
      description: "Requires a newline between the JSDoc description and tags, if any",
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
