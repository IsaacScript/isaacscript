// The code here needs to detect the "fall through" switch case. Thus, we borrow heavily from the
// source code for the "no-fallthrough" rule.

import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "../utils.js";

export type Options = [];
export type MessageIds = "noNewline";

export const newlineBetweenSwitchCase = createRule<Options, MessageIds>({
  name: "newline-between-switch-case",
  meta: {
    type: "layout",
    docs: {
      description: "Requires newlines between switch cases",
      recommended: true,
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      noNewline: "Newline required between switch cases.",
    },
    fixable: "whitespace",
  },
  defaultOptions: [],
  create(context) {
    const { sourceCode } = context;

    return {
      SwitchCase(node) {
        const { parent } = node;
        if (parent.type !== AST_NODE_TYPES.SwitchStatement) {
          return;
        }

        // Ignore switch cases without a consequent (i.e. no brackets), as those should not have
        // newlines after them.
        if (node.consequent.length === 0) {
          return;
        }

        // Ignore the final case, as there should not be a newline between the final case and the
        // end of the switch statement.
        const finalCase = parent.cases.at(-1);
        const isFinalCase = node === finalCase;
        if (isFinalCase) {
          return;
        }

        const nextToken = sourceCode.getTokenAfter(node);
        if (nextToken === null) {
          return;
        }

        if (!hasBlankLinesBetween(node, nextToken)) {
          context.report({
            node,
            fix(fixer) {
              return fixer.insertTextAfter(node, "\n");
            },
            messageId: "noNewline",
          });
        }
      },
    };
  },
});

/**
 * Checks whether a node and a token are separated by blank lines.
 *
 * @param node The node to check.
 * @param token The token to compare against.
 * @returns `true` if there are blank lines between node and token.
 */
function hasBlankLinesBetween(
  node: TSESTree.Node,
  token: TSESTree.Token,
): boolean {
  return token.loc.start.line > node.loc.end.line + 1;
}
