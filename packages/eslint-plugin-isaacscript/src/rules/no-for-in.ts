import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const noForIn = createRule({
  name: "no-for-in",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows "for x in y" statements",
      recommended: "recommended",
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
