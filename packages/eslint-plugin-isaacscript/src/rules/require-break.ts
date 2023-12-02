// This rule is mostly copied from the `no-fallthrough` ESLint core rule:
// https://github.com/eslint/eslint/blob/main/lib/rules/no-fallthrough.js

import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "noBreak";

export const requireBreak = createRule<Options, MessageIds>({
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
    const codePathSegments: Array<Set<TSESLint.CodePathSegment>> = [];
    let currentCodePathSegments = new Set<TSESLint.CodePathSegment>();

    return {
      onCodePathStart() {
        codePathSegments.push(currentCodePathSegments);
        currentCodePathSegments = new Set();
      },

      onCodePathEnd() {
        const codePathSegmentsSet = codePathSegments.pop();
        if (codePathSegmentsSet !== undefined) {
          currentCodePathSegments = codePathSegmentsSet;
        }
      },

      onUnreachableCodePathSegmentStart(segment) {
        currentCodePathSegments.add(segment);
      },

      onUnreachableCodePathSegmentEnd(segment) {
        currentCodePathSegments.delete(segment);
      },

      onCodePathSegmentStart(segment) {
        currentCodePathSegments.add(segment);
      },

      onCodePathSegmentEnd(segment) {
        currentCodePathSegments.delete(segment);
      },

      "SwitchCase:exit"(node) {
        /*
         * `reachable` means fallthrough because statements preceded by
         * `break`, `return`, or `throw` are unreachable.
         * And allows empty cases and the last case.
         */
        const thisNodeIsReachable = isAnySegmentReachable(
          currentCodePathSegments,
        );
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

/**
 * Checks all segments in a set and returns true if any are reachable.
 *
 * @param segments The segments to check.
 * @returns True if any segment is reachable; false otherwise.
 */
function isAnySegmentReachable(
  segments: ReadonlySet<TSESLint.CodePathSegment>,
): boolean {
  for (const segment of segments) {
    if (segment.reachable) {
      return true;
    }
  }

  return false;
}
