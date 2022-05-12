import { createRule } from "../utils";

export const enumMemberNumberSeparation = createRule({
  name: "enum-member-number-separation",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows numbers next to letters in enum members",
      recommended: false,
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
        if (!("name" in node.id)) {
          return;
        }

        const memberName = node.id.name;

        // Search through the name for numbers
        for (let i = 0; i < memberName.length; i++) {
          const character = memberName[i];
          if (character === undefined) {
            continue;
          }

          if (!/^[0-9]$/.test(character)) {
            continue;
          }

          const lastCharacter = memberName[i - 1];
          const nextCharacter = memberName[i + 1];
          if (
            (lastCharacter !== undefined && lastCharacter !== "_") ||
            (nextCharacter !== undefined && nextCharacter !== "_")
          ) {
            context.report({
              loc: {
                start: node.loc.start,
                end: node.loc.end,
              },
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
