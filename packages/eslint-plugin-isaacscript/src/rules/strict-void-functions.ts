import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule, getParentFunction } from "../utils.js";

export const strictVoidFunctions = createRule({
  name: "strict-void-functions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows non-empty return statements in functions annotated as returning void",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      mismatchedReturnType:
        "You cannot return values in functions annotated as returning `void`. Either remove the value after the `return` keyword or change the function return type annotation.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ReturnStatement(node) {
        if (node.argument === null) {
          return;
        }

        const parentFunction = getParentFunction(node);
        if (parentFunction === undefined) {
          return;
        }

        const { returnType } = parentFunction;
        if (returnType === undefined) {
          return;
        }

        const { typeAnnotation } = returnType;
        if (typeAnnotation.type !== AST_NODE_TYPES.TSVoidKeyword) {
          return;
        }

        context.report({
          loc: node.loc,
          messageId: "mismatchedReturnType",
        });
      },
    };
  },
});
