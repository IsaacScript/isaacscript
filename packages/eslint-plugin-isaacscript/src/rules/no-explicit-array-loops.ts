import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { isTypeArrayTupleTypeOrUnionOfArrayTupleTypes } from "../typeUtils.js";
import { createRule } from "../utils.js";

export type Options = [];
export type MessageIds = "noExplicitArray";

export const noExplicitArrayLoops = createRule<Options, MessageIds>({
  name: "no-explicit-array-loops",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows explicit iteration for arrays",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noExplicitArray:
        'Explicit iteration over arrays is disallowed. (Get rid of the "Object.values()".)',
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    /** Checks for `array.values()`. */
    function checkArrayValuesForm(node: TSESTree.ForOfStatement) {
      const callExpression = node.right;
      if (callExpression.type !== AST_NODE_TYPES.CallExpression) {
        return;
      }

      const memberExpression = callExpression.callee;
      if (memberExpression.type !== AST_NODE_TYPES.MemberExpression) {
        return;
      }

      if (memberExpression.object.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const potentialArrayType = getConstrainedTypeAtLocation(
        parserServices,
        memberExpression.object,
      );
      if (
        !isTypeArrayTupleTypeOrUnionOfArrayTupleTypes(
          potentialArrayType,
          checker,
        )
      ) {
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
        loc: methodIdentifier.loc,
        messageId: "noExplicitArray",
        fix: (fixer) =>
          fixer.replaceTextRange([replacementStart, replacementEnd], ""),
      });
    }

    /** Checks for `Object.values(array)`. */
    function checkObjectValuesForm(node: TSESTree.ForOfStatement) {
      const callExpression = node.right;
      if (callExpression.type !== AST_NODE_TYPES.CallExpression) {
        return;
      }

      const memberExpression = callExpression.callee;
      if (memberExpression.type !== AST_NODE_TYPES.MemberExpression) {
        return;
      }

      if (memberExpression.object.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (memberExpression.object.name !== "Object") {
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

      const firstArgument = callExpression.arguments[0];
      if (firstArgument === undefined) {
        return;
      }

      if (firstArgument.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const potentialArrayType = getConstrainedTypeAtLocation(
        parserServices,
        firstArgument,
      );
      if (
        !isTypeArrayTupleTypeOrUnionOfArrayTupleTypes(
          potentialArrayType,
          checker,
        )
      ) {
        return;
      }

      const [callExpressionStart, callExpressionEnd] = callExpression.range;
      const firstReplacementStart = callExpressionStart;
      const firstReplacementEnd = callExpressionStart + "Object.values(".length;
      const secondReplacementStart = callExpressionEnd - ")".length;
      const secondReplacementEnd = callExpressionEnd;

      context.report({
        loc: methodIdentifier.loc,
        messageId: "noExplicitArray",
        fix: (fixer) => [
          fixer.replaceTextRange(
            [firstReplacementStart, firstReplacementEnd],
            "",
          ),
          fixer.replaceTextRange(
            [secondReplacementStart, secondReplacementEnd],
            "",
          ),
        ],
      });
    }

    return {
      ForOfStatement(node) {
        checkObjectValuesForm(node);
        checkArrayValuesForm(node);
      },
    };
  },
});
