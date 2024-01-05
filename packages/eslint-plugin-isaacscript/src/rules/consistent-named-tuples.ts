import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const consistentNamedTuples = createRule({
  name: "consistent-named-tuples",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires that if one or more tuple elements are named, all of them are named",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      notNamed:
        "If one element in a tuple has a label, then all of them must have a label.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSTupleType(node) {
        const hasNamedElements = node.elementTypes.some(
          (typeNode) => typeNode.type === AST_NODE_TYPES.TSNamedTupleMember,
        );
        if (hasNamedElements) {
          const hasAllNamedElements = node.elementTypes.every(
            (typeNode) => typeNode.type === AST_NODE_TYPES.TSNamedTupleMember,
          );
          if (!hasAllNamedElements) {
            context.report({
              loc: node.loc,
              messageId: "notNamed",
            });
          }
        }
      },
    };
  },
});
