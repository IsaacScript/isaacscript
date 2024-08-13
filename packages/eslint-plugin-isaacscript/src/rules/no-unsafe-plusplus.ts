import type { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils.js";

export const noUnsafePlusplus = createRule({
  name: "no-unsafe-plusplus",
  meta: {
    type: "problem",
    docs: {
      description:
        'Disallow unsafe and confusing uses of the "++" and "--" operators',
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      plusPlus:
        'Complex usages of the "++" operator can be confusing. You should only use it in contexts where it could be swapped with "+= 1".',
      minusMinus:
        'Complex usages of the "--" operator can be confusing. You should only use it in contexts where it could be swapped with "-= 1".',
    },
  },
  defaultOptions: [],
  create(context) {
    function unsafe(nodeNever: never) {
      // The type of the node is "never" for some reason, so cast it to something we can work with.
      const node = nodeNever as TSESTree.UpdateExpression;
      const { operator } = node;
      const messageId = operator === "--" ? "minusMinus" : "plusPlus";

      context.report({
        loc: node.loc,
        messageId,
      });
    }

    return {
      ":not(UnaryExpression[operator='void'],ExpressionStatement,SequenceExpression,ForStatement[update.type=UpdateExpression]) > UpdateExpression[prefix='false'], ForStatement[init.type=UpdateExpression] > UpdateExpression[prefix='false'], ForStatement[test.type=UpdateExpression] > UpdateExpression[prefix='false']":
        unsafe,

      "SequenceExpression > UpdateExpression[prefix='false']:last-child":
        unsafe,
    };
  },
});
