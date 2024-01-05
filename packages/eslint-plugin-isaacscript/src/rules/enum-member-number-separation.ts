import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const enumMemberNumberSeparation = createRule({
  name: "enum-member-number-separation",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows numbers next to letters in enum members",
    },
    schema: [],
    messages: {
      notSeparated:
        "Enum member names must have numbers separated from letters by an underscore.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
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
            (lastCharacter !== undefined &&
              !isNumber(lastCharacter) &&
              lastCharacter !== "_") ||
            (nextCharacter !== undefined &&
              !isNumber(nextCharacter) &&
              nextCharacter !== "_")
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
    };
  },
});

function isNumber(character: string): boolean {
  return /^\d$/.test(character);
}
