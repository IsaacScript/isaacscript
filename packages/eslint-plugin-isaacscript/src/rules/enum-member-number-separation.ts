import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils.js";

export const enumMemberNumberSeparation = createRule({
  meta: {
    docs: {
      recommended: true,
      requiresTypeChecking: false,
      description: "Disallows numbers next to letters in enum members",
    },
    messages: {
      notSeparated:
        "Enum member names must have numbers separated from letters by an underscore.",
    },
    schema: [],
    type: "problem",
  },
  name: "enum-member-number-separation",
  create: (context) => ({
    TSEnumMember(node) {
      const { id } = node;
      if (id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const { name } = id;

      // Whitelist member names that 4 characters or less.
      if (name.length <= 4) {
        return;
      }

      // Search through the name for numbers.
      for (let i = 0; i < name.length; i++) {
        const character = name[i];
        if (character === undefined) {
          continue;
        }

        if (!isNumber(character)) {
          continue;
        }

        const lastCharacter = name[i - 1];
        const nextCharacter = name[i + 1];
        if (
          (lastCharacter !== undefined
            && lastCharacter !== "_"
            && !isNumber(lastCharacter))
          || (nextCharacter !== undefined
            && nextCharacter !== "_"
            && !isNumber(nextCharacter))
        ) {
          context.report({
            loc: node.loc,
            messageId: "notSeparated",
            // There cannot be an auto-fixer because the user must rename the variable with F2 to
            // prevent having to change N enum references in M files.
          });
          break;
        }
      }
    },
  }),
  defaultOptions: [],
});

function isNumber(character: string): boolean {
  return /^\d$/v.test(character);
}
