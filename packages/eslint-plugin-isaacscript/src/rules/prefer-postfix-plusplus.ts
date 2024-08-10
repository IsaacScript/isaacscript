import { createRule } from "../utils.js";

export const preferPostfixPlusplus = createRule({
  name: "prefer-postfix-plusplus",
  meta: {
    type: "problem",
    docs: {
      description: 'Require "i++" instead of "++i"',
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      plusPlus: 'You must use postfix "++" instead of prefix "++".',
      minusMinus: 'You must use postfix "--" instead of prefix "--".',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      UpdateExpression(node) {
        if (!node.prefix) {
          return;
        }

        const messageId = node.operator === "++" ? "plusPlus" : "minusMinus";
        context.report({
          loc: node.loc,
          messageId,
        });
      },
    };
  },
});
