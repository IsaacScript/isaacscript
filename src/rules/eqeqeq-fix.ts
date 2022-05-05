// Original code from:
// https://github.com/eslint/eslint/blob/main/lib/rules/eqeqeq.js

import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export const eqeqeqFix = createRule({
  name: "eqeqeq-fix",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Requires the use of `===` and `!==` (and automatically fixes)",
      recommended: "error",
    },
    schema: [],
    messages: {
      unexpected:
        "Expected '{{expectedOperator}}' and instead saw '{{actualOperator}}'.",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    const enforceRuleForNull = true;
    const enforceInverseRuleForNull = true;

    /**
     * Checks if one of the operands is a literal null
     * @param {ASTNode} node The node to check
     * @returns {boolean} if operands are null
     * @private
     */
    function isNullCheck(node: TSESTree.BinaryExpression) {
      return isNullLiteral(node.right) || isNullLiteral(node.left);
    }

    /**
     * Determines whether the given node is a `null` literal.
     * @param {ASTNode} node The node to check
     * @returns {boolean} `true` if the node is a `null` literal
     * @private
     */
    function isNullLiteral(
      node: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
      /*
       * Checking `node.value === null` does not guarantee that a literal is a null literal.
       * When parsing values that cannot be represented in the current environment (e.g. unicode
       * regexes in Node 4), `node.value` is set to `null` because it wouldn't be possible to
       * set `node.value` to a unicode regex. To make sure a literal is actually `null`, check
       * `node.regex` instead. Also see: https://github.com/eslint/eslint/issues/8020
       */
      return (
        node.type === "Literal" && // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        node.value === null && // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        !node.regex && // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        !node.bigint // eslint-disable-line @typescript-eslint/no-unsafe-member-access
      );
    }

    /**
     * Reports a message for this rule.
     * @param {ASTNode} node The binary expression node that was checked
     * @param {string} expectedOperator The operator that was expected (either '==', '!=', '===', or '!==')
     * @returns {void}
     * @private
     */
    function report(node: TSESTree.BinaryExpression, expectedOperator: string) {
      const operatorToken = sourceCode.getFirstTokenBetween(
        node.left,
        node.right,
        (token) => token.value === node.operator,
      );
      if (operatorToken === null) {
        return;
      }

      context.report({
        node,
        loc: operatorToken.loc,
        messageId: "unexpected",
        data: { expectedOperator, actualOperator: node.operator },
        fix(fixer) {
          // Fix everything regardless of whether or not it is safe to fix
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

        if (!enforceRuleForNull && isNull) {
          return;
        }

        report(node, `${node.operator}=`);
      },
    };
  },
});
