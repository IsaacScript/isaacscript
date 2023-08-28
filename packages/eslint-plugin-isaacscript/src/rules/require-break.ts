// This rule is mostly copied from the `no-fallthrough` ESLint core rule:
// https://github.com/eslint/eslint/blob/main/lib/rules/no-fallthrough.js

import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CodePath } from "../interfaces/CodePath";
import { createRule, isReachable } from "../utils";

export const requireBreak = createRule({
  name: "require-break",
  meta: {
    type: "layout",
    docs: {
      description:
        "Requires that each case of a switch statement has a `break` statement",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noBreak: "Expected a 'break' statement.",
    },
  },
  defaultOptions: [],
  create(context) {
    let currentCodePath: CodePath | null = null;

    return {
      onCodePathStart(codePath) {
        currentCodePath = codePath;
      },

      onCodePathEnd() {
        if (currentCodePath !== null && "upper" in currentCodePath) {
          currentCodePath = currentCodePath.upper;
        }
      },

      "SwitchCase:exit"(node) {
        if (currentCodePath === null) {
          return;
        }

        /*
         * `reachable` means fallthrough because statements preceded by
         * `break`, `return`, or `throw` are unreachable.
         * And allows empty cases and the last case.
         */
        const thisNodeIsReachable =
          currentCodePath.currentSegments.some(isReachable);
        const thisNodeIsFinalCase =
          node.parent.type === AST_NODE_TYPES.SwitchStatement &&
          node === node.parent.cases.at(-1);

        if (thisNodeIsReachable && thisNodeIsFinalCase) {
          context.report({
            messageId: "noBreak",
            node,
          });
        }
      },
    };
  },
});
