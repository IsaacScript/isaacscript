import { createRule } from "../utils";

export const noVoidReturnType = createRule({
  name: "no-void-return-type",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows void return types on non-exported functions",
      recommended: "error",
    },
    schema: [],
    messages: {
      voidReturnType: "Non-exported functions cannot have a void return types.",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      FunctionDeclaration(node) {
        // Exported functions are exempt from this rule
        const { parent } = node;
        if (
          parent !== undefined &&
          (parent.type === "ExportNamedDeclaration" ||
            parent.type === "ExportDefaultDeclaration")
        ) {
          return;
        }

        const { returnType } = node;
        if (
          returnType === undefined ||
          returnType.type !== "TSTypeAnnotation"
        ) {
          return;
        }

        const { typeAnnotation } = returnType;
        if (
          typeAnnotation === undefined ||
          typeAnnotation.type !== "TSVoidKeyword"
        ) {
          return;
        }

        context.report({
          node,
          messageId: "voidReturnType",
          fix(fixer) {
            return fixer.remove(returnType);
          },
        });
      },
    };
  },
});
