import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { isFlagSet } from "../typeUtils";
import { createRule } from "../utils";

export const noStringLength0 = createRule({
  name: "no-string-length-0",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows checking for empty strings via the length method in favor of direct comparison to an empty string",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noStringLength0:
        "Compare to an empty string directly instead of using the length method, as it is shorter and easier to read.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    function isStringLength(
      node: TSESTree.PrivateIdentifier | TSESTree.Expression,
    ): boolean {
      if (node.type !== AST_NODE_TYPES.MemberExpression) {
        return false;
      }

      if (
        node.property.type !== AST_NODE_TYPES.Identifier ||
        node.property.name !== "length"
      ) {
        return false;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.object);
      const type = checker.getTypeAtLocation(tsNode);

      // We don't use `isTypeFlagSet` because we don't want to iterate through any unions; we only
      // want to match exactly `string`.
      return isFlagSet(type.flags, ts.TypeFlags.String);
    }

    return {
      BinaryExpression(node) {
        if (
          (is0(node.left) && isStringLength(node.right)) ||
          (is0(node.right) && isStringLength(node.left))
        ) {
          context.report({
            node,
            messageId: "noStringLength0",
          });
        }
      },
    };
  },
});

function is0(node: TSESTree.PrivateIdentifier | TSESTree.Expression): boolean {
  return node.type === AST_NODE_TYPES.Literal && node.raw === "0";
}
