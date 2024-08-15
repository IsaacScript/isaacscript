import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName } from "../typeUtils.js";
import { createRule } from "../utils.js";

export const noUndefinedReturnType = createRule({
  name: "no-undefined-return-type",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows `undefined` return types on functions",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      undefinedReturnType:
        "Functions cannot have an `undefined` return type. Change the return type to `void` instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      FunctionDeclaration(node) {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const type = checker.getTypeAtLocation(tsNode);
        const signatures = type.getCallSignatures();
        for (const signature of signatures) {
          const returnType = signature.getReturnType();
          const typeName = getTypeName(returnType);
          if (typeName === "undefined") {
            context.report({
              loc: node.loc,
              messageId: "undefinedReturnType",
            });
          }
        }
      },
    };
  },
});
