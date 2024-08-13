import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName } from "../typeUtils.js";
import { createRule } from "../utils.js";

const ARRAY_METHODS_WITH_BOOLEAN_FUNCTIONS: ReadonlySet<string> = new Set([
  "every",
  "filter",
  "find",
  "findIndex",
  "findLast",
  "findLastIndex",
  "some",
]);

export const strictArrayMethods = createRule({
  name: "strict-array-methods",
  meta: {
    type: "problem",
    docs: {
      description: "Requires boolean return types on array method functions",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      conditionError:
        "Unexpected value in array method. A boolean expression is required.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    function isArrayMethodInvocationWithBooleanFunction(
      node: TSESTree.CallExpression,
    ): boolean {
      const { callee } = node;
      if (callee.type !== AST_NODE_TYPES.MemberExpression) {
        return false;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(callee.object);
      const type = checker.getTypeAtLocation(tsNode);

      const typeName = getTypeName(type);
      if (typeName !== "Array" && typeName !== "ReadonlyArray") {
        return false;
      }

      const { property } = callee;
      if (property.type !== AST_NODE_TYPES.Identifier) {
        return false;
      }

      const methodName = property.name;
      return ARRAY_METHODS_WITH_BOOLEAN_FUNCTIONS.has(methodName);
    }

    function firstArgumentHasBooleanReturnType(
      node: TSESTree.CallExpression,
    ): boolean {
      const argument = node.arguments[0];
      if (argument === undefined) {
        return false;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(argument);
      const type = checker.getTypeAtLocation(tsNode);
      const callSignatures = type.getCallSignatures();
      if (callSignatures.length === 0) {
        return false;
      }

      for (const callSignature of callSignatures) {
        const returnType = callSignature.getReturnType();
        const returnTypeName = getTypeName(returnType);
        if (
          returnTypeName !== "boolean" &&
          returnTypeName !== "true" &&
          returnTypeName !== "false"
        ) {
          return false;
        }
      }

      return true;
    }

    return {
      CallExpression(node) {
        if (
          isArrayMethodInvocationWithBooleanFunction(node) &&
          !firstArgumentHasBooleanReturnType(node)
        ) {
          context.report({
            loc: node.loc,
            messageId: "conditionError",
          });
        }
      },
    };
  },
});
