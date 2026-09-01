import { createRule } from "../utils.js";

export const noThrow = createRule({
  meta: {
    docs: {
      recommended: true,
      requiresTypeChecking: false,
      description: 'Disallows the usage of "throw"',
    },
    messages: {
      noThrow:
        'The "throw" keyword is forbidden. Use the "error" function instead.',
    },
    schema: [],
    type: "problem",
  },
  name: "no-throw",
  create: (context) => ({
    ThrowStatement(node) {
      context.report({
        node,
        messageId: "noThrow",
      });
    },
  }),
  defaultOptions: [],
});
