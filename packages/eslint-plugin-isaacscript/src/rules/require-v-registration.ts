import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { createRule } from "../utils";

const REGISTRATION_LINES = [" v = v;", "saveDataManager("] as const;

export const requireVRegistration = createRule({
  name: "require-v-registration",
  meta: {
    type: "problem",
    docs: {
      description:
        'Require variables named "v" to be registered with the save data manager',
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      noRegistration:
        'Variables named "v" must be registered with the save data manager from "isaacscript-common".',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      VariableDeclarator(node) {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        if (node.id.name !== "v") {
          return;
        }

        if (!hasRegistrationLines(sourceCode.text)) {
          context.report({
            node,
            messageId: "noRegistration",
          });
        }
      },
    };
  },
});

function hasRegistrationLines(text: string) {
  return REGISTRATION_LINES.some((line) => text.includes(line));
}
