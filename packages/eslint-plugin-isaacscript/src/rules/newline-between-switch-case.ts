// The code here needs to detect the "fall through" switch case. Thus, we borrow heavily from the
// source code for the "no-fallthrough" rule.

import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import type { CodePath } from "../interfaces/CodePath";
import { createRule, isReachable } from "../utils";

export const newlineBetweenSwitchCase = createRule({
  name: "newline-between-switch-case",
  meta: {
    type: "layout",
    docs: {
      description: "Requires newlines between switch cases",
      recommended: "recommended",
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

      "SwitchCase:exit": (node) => {
        // Ignore the final switch case.
        if (
          node.parent.type === AST_NODE_TYPES.SwitchStatement &&
          node === node.parent.cases.at(-1)
        ) {
          return;
        }

        let isFallthrough = false;

        /*
         * A fallthrough is either if we are empty or if the end of the case is reachable
         */
        if (
          node.consequent.length === 0 ||
          (currentCodePath !== null &&
            currentCodePath.currentSegments.some(isReachable))
        ) {
          isFallthrough = true;
        }

        const nextToken = sourceCode.getTokenAfter(node);
        if (nextToken === null) {
          return;
        }

        const tokensWithBlankLinesBetween = getTokensWithNewlineBetween(
          sourceCode,
          node,
          nextToken,
        );
        const hasBlankLinesBetween = Boolean(tokensWithBlankLinesBetween);
        const isNewlineRequired = !isFallthrough;

        if (!hasBlankLinesBetween && isNewlineRequired) {
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

/** Checks if there is a blank line between tokens. */
function getTokensWithNewlineBetween(
  sourceCode: TSESLint.SourceCode,
  startNode: TSESTree.SwitchCase,
  endNode: TSESTree.Token,
): TSESTree.Node[] | null {
  const endLine = endNode.loc.start.line;

  let next: TSESTree.Node = startNode;
  let previous: TSESTree.Node = startNode;
  do {
    previous = next;

    const tokenAfter = sourceCode.getTokenAfter(next, {
      includeComments: true,
    });
    if (tokenAfter === null) {
      return null;
    }

    next = tokenAfter as unknown as TSESTree.Node;
    if (next.loc.start.line > previous.loc.end.line + 1) {
      return [previous, next];
    }
  } while (next.loc.start.line < endLine);

  return null;
}
