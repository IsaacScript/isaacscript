import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName, unionTypeParts } from "../typeUtils";
import { createRule } from "../utils";

export const noMutableArrayReturn = createRule({
  name: "no-mutable-array-return",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows returning mutable arrays from functions",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      mutableArray:
        "Arrays that are returned from functions must be read-only. (Use the `readonly` keyword prefix or the `Readonly` utility type.)",
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
          for (const t of unionTypeParts(returnType)) {
            const typeName = getTypeName(t);

            // This would be "ReadonlyArray" if it was the read-only version.
            if (typeName === "Array") {
              context.report({
                loc: {
                  start: node.loc.start,
                  end: node.loc.end,
                },
                messageId: "mutableArray",
              });
            }
          }
        }
      },
    };
  },
});
