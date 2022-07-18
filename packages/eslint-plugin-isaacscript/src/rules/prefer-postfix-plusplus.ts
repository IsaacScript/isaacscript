import { createRule } from "../utils";

export const preferPostfixPlusplus = createRule({
  name: "prefer-postfix-plusplus",
  meta: {
    type: "problem",
    docs: {
      description: 'Require "i++" instead of "++i"',
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      plusPlus: "Foo must be bar.",
      minusMinus: "Foo must be bar.",
    },
  },
  defaultOptions: [],
  create(_context) {
    return {};
  },
});
