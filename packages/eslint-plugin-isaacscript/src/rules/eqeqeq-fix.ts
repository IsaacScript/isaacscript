/* eslint-disable */
// @ts-nocheck

/**
 * This rule is slightly modified from the original ESLint version:
 * https://github.com/eslint/eslint/blob/main/lib/rules/eqeqeq.js
 *
 * We disable all type-checking in this file in order to keep the code as close as possible to the
 * original.
 */

import { createRule } from "../utils";

export const eqeqeqFix = createRule({
  name: "eqeqeq-fix",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Requires the use of `===` and `!==` (and automatically fixes)",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      unexpected:
        "Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'.",
    },
    fixable: "code",
  },
  create(context) {
    const config = (context.options[0] as string | undefined) || "always";
    const options =
      (context.options[1] as Record<string, unknown> | undefined) || {};
    const sourceCode = context.getSourceCode();

    const nullOption =
      config === "always"
        ? (options.null as string | undefined) || "always"
        : "ignore";
    const enforceRuleForNull = nullOption === "always";
    const enforceInverseRuleForNull = nullOption === "never";

    /**
     * Determines whether the given node is a `null` literal.
     * @param {ASTNode} node The node to check
     * @returns {boolean} `true` if the node is a `null` literal
     */
    function isNullLiteral(node) {
      /*
       * Checking `node.value === null` does not guarantee that a literal is a null literal.
       * When parsing values that cannot be represented in the current environment (e.g. unicode
       * regexes in Node 4), `node.value` is set to `null` because it wouldn't be possible to
       * set `node.value` to a unicode regex. To make sure a literal is actually `null`, check
       * `node.regex` instead. Also see: https://github.com/eslint/eslint/issues/8020
       */
      return (
        node.type === "Literal" &&
        node.value === null &&
        !node.regex &&
        !node.bigint
      );
    }

    /**
     * Checks if an expression is a typeof expression
     * @param {ASTNode} node The node to check
     * @returns {boolean} if the node is a typeof expression
     */
    function isTypeOf(node) {
      return node.type === "UnaryExpression" && node.operator === "typeof";
    }

    /**
     * Checks if either operand of a binary expression is a typeof operation
     * @param {ASTNode} node The node to check
     * @returns {boolean} if one of the operands is typeof
     * @private
     */
    function isTypeOfBinary(node: TSESTree.BinaryExpression) {
      return isTypeOf(node.left) || isTypeOf(node.right);
    }

    /**
     * Checks if operands are literals of the same type (via typeof)
     * @param {ASTNode} node The node to check
     * @returns {boolean} if operands are of same type
     * @private
     */
    function areLiteralsAndSameType(node) {
      return (
        node.left.type === "Literal" &&
        node.right.type === "Literal" &&
        typeof node.left.value === typeof node.right.value
      );
    }

    /**
     * Checks if one of the operands is a literal null
     * @param {ASTNode} node The node to check
     * @returns {boolean} if operands are null
     * @private
     */
    function isNullCheck(node) {
      return isNullLiteral(node.right) || isNullLiteral(node.left);
    }

    /**
     * Reports a message for this rule.
     * @param {ASTNode} node The binary expression node that was checked
     * @param {string} expectedOperator The operator that was expected (either '==', '!=', '===', or '!==')
     * @returns {void}
     * @private
     */
    function report(node, expectedOperator) {
      const operatorToken = sourceCode.getFirstTokenBetween(
        node.left,
        node.right,
        (token) => token.value === node.operator,
      );

      context.report({
        node,
        loc: operatorToken.loc,
        messageId: "unexpected",
        data: { expectedOperator, actualOperator: node.operator },
        fix(fixer) {
          /*
          // If the comparison is a `typeof` comparison or both sides are literals with the same type, then it's safe to fix.
          if (isTypeOfBinary(node) || areLiteralsAndSameType(node)) {
            return fixer.replaceText(operatorToken, expectedOperator);
          }
          return null;
          */

          // Fix everything regardless of whether it is safe to fix.
          return fixer.replaceText(operatorToken, expectedOperator);
        },
      });
    }

    return {
      BinaryExpression(node) {
        const isNull = isNullCheck(node);

        if (node.operator !== "==" && node.operator !== "!=") {
          if (enforceInverseRuleForNull && isNull) {
            report(node, node.operator.slice(0, -1));
          }
          return;
        }

        if (
          config === "smart" &&
          (isTypeOfBinary(node) || areLiteralsAndSameType(node) || isNull)
        ) {
          return;
        }

        if (!enforceRuleForNull && isNull) {
          return;
        }

        report(node, `${node.operator}=`);
      },
    };
  },
});
