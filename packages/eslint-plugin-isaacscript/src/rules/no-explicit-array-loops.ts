import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export type Options = [];

export type MessageIds = "noExplicitArray";

export const noExplicitArrayLoops = createRule<Options, MessageIds>({
  name: "no-explicit-array-loops",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows explicit iteration for arrays",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noExplicitArray:
        'Explicit iteration over arrays is disallowed. (Get rid of the ".values()".)',
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      ForOfStatement(node) {
        const callExpression = node.right;
        if (callExpression.type !== AST_NODE_TYPES.CallExpression) {
          return;
        }

        const memberExpression = callExpression.callee;
        if (memberExpression.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        const potentialArray = memberExpression.object;
        const potentialArrayTSNode =
          parserServices.esTreeNodeToTSNodeMap.get(potentialArray);
        const potentialArrayType =
          checker.getTypeAtLocation(potentialArrayTSNode);

        // The TypeScript definitions are incorrect here; symbol can be undefined.
        const potentialArraySymbol = potentialArrayType.symbol;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (potentialArraySymbol === undefined) {
          return;
        }

        const potentialArrayName = potentialArraySymbol.escapedName;
        if (potentialArrayName !== "Array") {
          return;
        }

        const methodIdentifier = memberExpression.property;
        if (methodIdentifier.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const methodName = methodIdentifier.name;
        if (methodName !== "values") {
          return;
        }

        const callExpressionEnd = callExpression.range[1];
        const replacementStart = callExpressionEnd - ".values()".length;
        const replacementEnd = callExpressionEnd;

        context.report({
          node,
          messageId: "noExplicitArray",
          fix: (fixer) =>
            fixer.replaceTextRange([replacementStart, replacementEnd], ""),
        });
      },
    };
  },
});
