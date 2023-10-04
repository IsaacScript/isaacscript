import type { TSESTree } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type ts from "typescript";
import { isFunction } from "../typeUtils";
import { createRule } from "../utils";

export const consistentReturnUndefined = createRule({
  name: "consistent-return-undefined",
  meta: {
    type: "problem",
    docs: {
      description:
        "Require return statements to specify undefined to match the function type annotation",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      missingUndefined: "The return statement must include undefined.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    function getFunctionParent(node: TSESTree.ReturnStatement) {
      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);

      let examinedTSNode: ts.Node = tsNode;
      while (true) {
        examinedTSNode = examinedTSNode.parent;
        if (isFunction(type, checker)) {
        }
      }
    }

    return {
      ReturnStatement(node) {
        // The argument will be `null` when it is a bare `return` statement.
        if (node.argument !== null) {
          return;
        }
      },
    };
  },
});
