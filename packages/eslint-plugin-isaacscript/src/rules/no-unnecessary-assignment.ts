import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { isFlagSet, unionTypeParts } from "../typeUtils.js";
import { createRule } from "../utils.js";

const USELESS_OPERATORS_WITH_ZERO: ReadonlySet<string> = new Set([
  "+",
  "-",
  "|",
  // "<<" is technically a useless operator, but we whitelist it so that bit flag enums will not
  // cause false positives.
  ">>",
  ">>>",
]);

const USELESS_ASSIGNMENT_OPERATORS_WITH_ZERO: ReadonlySet<string> = new Set(
  [...USELESS_OPERATORS_WITH_ZERO].map((value) => `${value}=`),
);

export type Options = [];

export type MessageIds =
  | "unnecessary"
  | "unnecessaryZero"
  | "unnecessaryEmptyString"
  | "unnecessaryShortCircuit";

export const noUnnecessaryAssignment = createRule<Options, MessageIds>({
  name: "no-unnecessary-assignment",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows useless assignments",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      unnecessary:
        "This assignment is unnecessary because it would have no effect on the variable.",
      unnecessaryZero:
        'This assignment is unnecessary because the "{{ operator }}" operator in combination with 0 would have no effect on a number variable.',
      unnecessaryEmptyString:
        "This assignment is unnecessary because adding an empty string would have no effect on a string variable.",
      unnecessaryShortCircuit:
        'This short circuit assignment using the "{{operator}}" operator is unnecessary because it would have no effect on the variable.',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    function nodeHasFlagSet(node: TSESTree.Node, flag: ts.TypeFlags): boolean {
      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);

      // We cannot use `isTypeFlagSet` because we do not want to penetrate unions.
      return isFlagSet(type.flags, flag);
    }

    function isBoolean(node: TSESTree.Node): boolean {
      return nodeHasFlagSet(node, ts.TypeFlags.BooleanLike);
    }

    function isNumber(node: TSESTree.Node): boolean {
      return nodeHasFlagSet(node, ts.TypeFlags.NumberLike);
    }

    function isString(node: TSESTree.Node): boolean {
      return nodeHasFlagSet(node, ts.TypeFlags.StringLike);
    }

    function isNull(node: TSESTree.Node): boolean {
      return nodeHasFlagSet(node, ts.TypeFlags.Null);
    }

    function isUndefined(node: TSESTree.Node): boolean {
      return nodeHasFlagSet(node, ts.TypeFlags.Undefined);
    }

    function isTrue(node: TSESTree.Expression): boolean {
      // Checking for the literal value is fast, so we do that first.
      if (node.type === AST_NODE_TYPES.Literal && node.value === true) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      return "intrinsicName" in type && type.intrinsicName === "true";
    }

    function isFalse(node: TSESTree.Expression): boolean {
      // Checking for the literal value is fast, so we do that first.
      if (node.type === AST_NODE_TYPES.Literal && node.value === false) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      return "intrinsicName" in type && type.intrinsicName === "false";
    }

    function isZero(
      node: TSESTree.PrivateIdentifier | TSESTree.Expression,
    ): boolean {
      // Checking for the literal value is fast, so we do that first.
      if (isLiteralZero(node)) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      return "value" in type && type.value === 0;
    }

    function isEmptyString(
      node: TSESTree.PrivateIdentifier | TSESTree.Expression,
    ): boolean {
      // Checking for the literal value is fast, so we do that first.
      if (isLiteralEmptyString(node)) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      return "value" in type && type.value === "";
    }

    function hasNullAndNotUndefined(node: TSESTree.Expression): boolean {
      if (isNull(node)) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      const types = unionTypeParts(type);
      return (
        types.some((t) => isFlagSet(t.flags, ts.TypeFlags.Null)) &&
        !types.some((t) => isFlagSet(t.flags, ts.TypeFlags.Undefined))
      );
    }

    function hasUndefinedAndNotNull(node: TSESTree.Expression): boolean {
      if (isUndefined(node)) {
        return true;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      const types = unionTypeParts(type);
      return (
        types.some((t) => isFlagSet(t.flags, ts.TypeFlags.Undefined)) &&
        !types.some((t) => isFlagSet(t.flags, ts.TypeFlags.Null))
      );
    }

    function checkEqualSign(node: TSESTree.AssignmentExpression) {
      const leftTSNode = parserServices.esTreeNodeToTSNodeMap.get(node.left);
      const rightTSNode = parserServices.esTreeNodeToTSNodeMap.get(node.right);

      const leftType = checker.getTypeAtLocation(leftTSNode);
      const rightType = checker.getTypeAtLocation(rightTSNode);

      const isLeftLiteral = isFlagSet(leftType.flags, ts.TypeFlags.Literal);
      const isRightLiteral = isFlagSet(rightType.flags, ts.TypeFlags.Literal);

      if (isLeftLiteral && isRightLiteral && leftType === rightType) {
        context.report({
          loc: node.loc,
          messageId: "unnecessary",
        });
      }
    }

    return {
      AssignmentExpression(node) {
        if (node.operator === "=") {
          checkEqualSign(node);
        } else if (
          USELESS_ASSIGNMENT_OPERATORS_WITH_ZERO.has(node.operator) &&
          isNumber(node.left) &&
          isLiteralZero(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryZero",
            data: {
              operator: node.operator,
            },
          });
        } else if (
          node.operator === "+=" &&
          isString(node.left) &&
          isLiteralEmptyString(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryEmptyString",
          });
        }
      },

      BinaryExpression(node) {
        if (
          USELESS_OPERATORS_WITH_ZERO.has(node.operator) &&
          ((isNumber(node.left) && isLiteralZero(node.right)) ||
            (isNumber(node.right) && isLiteralZero(node.left)))
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryZero",
            data: {
              operator: node.operator,
            },
          });
        }

        // Plus is the only operator valid for strings.
        if (
          node.operator === "+" &&
          ((isString(node.left) && isLiteralEmptyString(node.right)) ||
            (isString(node.right) && isLiteralEmptyString(node.left)))
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryEmptyString",
          });
        }
      },

      LogicalExpression(node) {
        const { parent } = node;
        if (
          parent.type !== AST_NODE_TYPES.AssignmentExpression &&
          parent.type !== AST_NODE_TYPES.VariableDeclarator
        ) {
          return;
        }

        if (
          node.operator === "||" &&
          isBoolean(node.left) &&
          isFalse(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }

        if (
          node.operator === "&&" &&
          isBoolean(node.left) &&
          isTrue(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }

        if (
          node.operator === "||" &&
          isNumber(node.left) &&
          isZero(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }

        if (
          node.operator === "||" &&
          isString(node.left) &&
          isEmptyString(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }

        if (
          node.operator === "??" &&
          hasNullAndNotUndefined(node.left) &&
          isNull(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }

        if (
          node.operator === "??" &&
          hasUndefinedAndNotNull(node.left) &&
          isUndefined(node.right)
        ) {
          context.report({
            loc: node.loc,
            messageId: "unnecessaryShortCircuit",
            data: {
              operator: node.operator,
            },
          });
        }
      },
    };
  },
});

function isLiteralZero(
  node: TSESTree.PrivateIdentifier | TSESTree.Expression,
): boolean {
  return node.type === AST_NODE_TYPES.Literal && node.value === 0;
}

function isLiteralEmptyString(
  node: TSESTree.PrivateIdentifier | TSESTree.Expression,
): boolean {
  return node.type === AST_NODE_TYPES.Literal && node.raw === '""';
}
