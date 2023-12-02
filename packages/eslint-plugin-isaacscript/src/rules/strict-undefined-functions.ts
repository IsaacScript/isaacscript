import type { TSESTree } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { CodePath } from "@typescript-eslint/utils/ts-eslint";
import { getTypeName, unionTypeParts } from "../typeUtils";
import { createRule, getParentFunction, isReachable } from "../utils";

export type Options = [];
export type MessageIds = "mismatchedReturnType";

export const strictUndefinedFunctions = createRule<Options, MessageIds>({
  name: "strict-undefined-functions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows empty return statements in functions annotated as returning undefined",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      mismatchedReturnType:
        "You must explicitly return `undefined` in in functions annotated as returning `undefined`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    let currentCodePath: CodePath | null = null;

    function functionExit(node: TSESTree.Node) {
      if (currentCodePath === null) {
        return;
      }

      // We use the same logic as the `require-break` rule.
      const lastLineOfFunctionIsReturnStatement =
        // eslint-disable-next-line deprecation/deprecation
        !currentCodePath.currentSegments.some(isReachable);

      if (lastLineOfFunctionIsReturnStatement) {
        return;
      }

      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      const signatures = type.getCallSignatures();
      for (const signature of signatures) {
        const returnType = signature.getReturnType();
        for (const t of unionTypeParts(returnType)) {
          const typeName = getTypeName(t);
          if (typeName === "undefined") {
            context.report({
              loc: node.loc,
              messageId: "mismatchedReturnType",
            });
          }
        }
      }
    }

    return {
      ReturnStatement(node) {
        if (node.argument !== null) {
          return;
        }

        const parentFunction = getParentFunction(node);
        if (parentFunction === undefined) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(parentFunction);
        const type = checker.getTypeAtLocation(tsNode);
        const signatures = type.getCallSignatures();
        for (const signature of signatures) {
          const returnType = signature.getReturnType();
          for (const t of unionTypeParts(returnType)) {
            const typeName = getTypeName(t);
            if (typeName === "undefined") {
              context.report({
                loc: node.loc,
                messageId: "mismatchedReturnType",
              });
            }
          }
        }
      },

      onCodePathStart(codePath) {
        currentCodePath = codePath;
      },

      onCodePathEnd() {
        if (currentCodePath !== null && "upper" in currentCodePath) {
          currentCodePath = currentCodePath.upper;
        }
      },

      // We need one entry for each function node type. (This is copied from the
      // "@typescript-eslint/prefer-readonly-parameter-types" rule.)
      "ArrowFunctionExpression:exit": functionExit,
      "FunctionDeclaration:exit": functionExit,
      "FunctionExpression:exit": functionExit,
      "TSCallSignatureDeclaration:exit": functionExit,
      "TSConstructSignatureDeclaration:exit": functionExit,
      "TSDeclareFunction:exit": functionExit,
      "TSEmptyBodyFunctionExpression:exit": functionExit,
      "TSFunctionType:exit": functionExit,
      "TSMethodSignature:exit": functionExit,
    };
  },
});
