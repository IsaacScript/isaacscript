import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils.js";

export const noVoidReturnType = createRule({
  name: "no-void-return-type",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows `void` return types on non-exported functions",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      voidReturnType:
        "Non-exported functions cannot have a `void` return type. Remove the `void` keyword.",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      FunctionDeclaration(node) {
        // Exported functions are exempt from this rule.
        const { parent } = node;
        if (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          parent !== undefined &&
          (parent.type === AST_NODE_TYPES.ExportNamedDeclaration ||
            parent.type === AST_NODE_TYPES.ExportDefaultDeclaration)
        ) {
          return;
        }

        const { returnType } = node;
        if (returnType === undefined) {
          return;
        }

        const { typeAnnotation } = returnType;
        if (typeAnnotation.type !== AST_NODE_TYPES.TSVoidKeyword) {
          return;
        }

        context.report({
          loc: typeAnnotation.loc,
          messageId: "voidReturnType",
          fix(fixer) {
            return fixer.remove(returnType);
          },
        });
      },
    };
  },
});
