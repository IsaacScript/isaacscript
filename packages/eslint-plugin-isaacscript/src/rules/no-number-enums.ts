import { createRule } from "../utils.js";

export const noNumberEnums = createRule({
  name: "no-number-enums",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows number enums",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noNumberEnums:
        "Number enums are disallowed; use a string enum instead because they are safer.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      "TSEnumMember > :matches(Literal[raw>=0].initializer, UnaryExpression.initializer)":
        (node) => {
          context.report({
            node,
            messageId: "noNumberEnums",
          });
        },
    };
  },
});
