import { createRule } from "../utils.js";

export const noForIn = createRule({
  name: "no-for-in",
  meta: {
    type: "problem",
    docs: {
      description: 'Disallows "for x in y" statements',
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noForIn:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use a "for of" loop instead.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ForInStatement(node) {
        context.report({
          node,
          messageId: "noForIn",
        });
      },
    };
  },
});
