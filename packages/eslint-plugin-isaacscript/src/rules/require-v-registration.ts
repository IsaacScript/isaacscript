import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils.js";

const REGISTRATION_LINES = [" v = v;", "saveDataManager("] as const;

export const requireVRegistration = createRule({
  meta: {
    docs: {
      recommended: true,
      requiresTypeChecking: false,
      description:
        'Require variables named "v" to be registered with the save data manager',
    },
    messages: {
      noRegistration:
        'Variables named "v" must be registered with the save data manager from "isaacscript-common".',
    },
    schema: [],
    type: "problem",
  },
  name: "require-v-registration",
  create: (context) => ({
    VariableDeclarator(node) {
      if (node.id.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (node.id.name !== "v") {
        return;
      }

      if (!hasRegistrationLines(context.sourceCode.text)) {
        context.report({
          node,
          messageId: "noRegistration",
        });
      }
    },
  }),
  defaultOptions: [],
});

function hasRegistrationLines(text: string) {
  return REGISTRATION_LINES.some((line) => text.includes(line));
}
