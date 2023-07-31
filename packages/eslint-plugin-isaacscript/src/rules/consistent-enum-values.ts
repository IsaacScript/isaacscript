import { createRule } from "../utils";

export const consistentEnumValues = createRule({
  name: "consistent-enum-values",
  meta: {
    type: "problem",
    docs: {
      description: "Enforces consistent enum values",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      inconsistentValue: "Foo must be bar.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSEnumMember(node) {
        // Ignore computed enums; those are intended to be checked with the
        // `@typescript-eslint/prefer-enum-initializers` rule.
        const { initializer } = node;
        if (initializer === undefined || !("value" in initializer)) {
          return;
        }

        // Ignore number enums; those are intended to be checked with the
        // `isaacscript/no-number-enums` rule.
        const enumValue = initializer.value;
        if (typeof enumValue !== "string") {
          return;
        }

        const { id } = node;
        if (!("name" in id)) {
          return;
        }
        const enumName = id.name;

        if (enumValue !== enumName) {
          context.report({
            node,
            messageId: "inconsistentValue",
          });
        }
      },
    };
  },
});
