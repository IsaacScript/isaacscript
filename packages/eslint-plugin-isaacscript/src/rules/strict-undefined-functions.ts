import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName, unionTypeParts } from "../typeUtils";
import { createRule, getParentFunction } from "../utils";

export const strictUndefinedFunctions = createRule({
  name: "strict-undefined-functions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows empty return statements in functions annotated as returning undefined",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      mismatchedReturnType:
        "You must explicitly return `undefined` in in functions annotated as returning `undefined`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      ReturnStatement(node) {
        if (node.argument !== null) {
          return;
        }

        const parentFunction = getParentFunction(node);
        if (parentFunction === undefined) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(parentFunction);
        const type = checker.getTypeAtLocation(tsNode);
        const signatures = type.getCallSignatures();
        for (const signature of signatures) {
          const returnType = signature.getReturnType();
          for (const t of unionTypeParts(returnType)) {
            const typeName = getTypeName(t);
            if (typeName === "undefined") {
              context.report({
                loc: node.loc,
                messageId: "mismatchedReturnType",
              });
            }
          }
        }
      },
    };
  },
});
