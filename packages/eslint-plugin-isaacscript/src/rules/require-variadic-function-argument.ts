import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import ts from "typescript";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "noArgument";

export const requireVariadicFunctionArgument = createRule<Options, MessageIds>({
  name: "require-variadic-function-argument",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires that variadic functions must be supplied with at least one argument",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noArgument: "You must pass at least one argument to a variadic function.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      CallExpression(node) {
        if (node.arguments.length > 0) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const signature = checker.getResolvedSignature(tsNode);
        if (signature === undefined) {
          return;
        }

        const declaration = signature.getDeclaration();
        // The `getDeclaration` method actually returns `ts.SignatureDeclaration | undefined`, not
        // `ts.SignatureDeclaration`.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (declaration === undefined) {
          return;
        }

        if (!ts.hasRestParameter(declaration)) {
          return;
        }

        if (isHardCodedException(node)) {
          return;
        }

        context.report({
          loc: node.loc,
          messageId: "noArgument",
        });
      },
    };
  },
});

function isHardCodedException(node: TSESTree.CallExpression): boolean {
  const { callee } = node;
  if (callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }

  const { object, property } = callee;
  if (
    object.type !== AST_NODE_TYPES.Identifier ||
    property.type !== AST_NODE_TYPES.Identifier
  ) {
    return false;
  }

  return object.name === "console" && property.name === "log";
}
