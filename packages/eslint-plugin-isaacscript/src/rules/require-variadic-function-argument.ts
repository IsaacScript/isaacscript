import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "noArgument";

const JSDOC_EXCEPTION_TAG = "allowEmptyVariadic";

export const requireVariadicFunctionArgument = createRule<Options, MessageIds>({
  name: "require-variadic-function-argument",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires that variadic functions must be supplied with at least one argument",
      recommended: "recommended",
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

        if (
          isHardCodedException(node) ||
          hasJSDocExceptionTag(checker, declaration)
        ) {
          return;
        }

        for (let i = 0; i < declaration.parameters.length; i++) {
          const parameter = declaration.parameters[i];
          if (parameter === undefined) {
            continue;
          }

          if (
            ts.isRestParameter(parameter) &&
            node.arguments[i] === undefined
          ) {
            context.report({
              loc: node.loc,
              messageId: "noArgument",
            });
          }
        }
      },
    };
  },
});

function isHardCodedException(node: TSESTree.CallExpression): boolean {
  const { callee } = node;
  return isConsoleOrWindowFunction(callee) || isTimeoutFunction(callee);
}

function isConsoleOrWindowFunction(
  callee: TSESTree.LeftHandSideExpression,
): boolean {
  if (callee.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }

  const { object } = callee;
  if (object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  return object.name === "console" || object.name === "window";
}

function isTimeoutFunction(callee: TSESTree.LeftHandSideExpression): boolean {
  if (callee.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  return callee.name === "setTimeout" || callee.name === "setInterval";
}

function hasJSDocExceptionTag(
  checker: ts.TypeChecker,
  declaration: ts.SignatureDeclaration,
): boolean {
  const type = checker.getTypeAtLocation(declaration);
  const symbol = type.getSymbol();
  if (symbol === undefined) {
    return false;
  }
  const jsDocTagInfoArray = symbol.getJsDocTags(checker);
  console.log("LOL:", jsDocTagInfoArray);
  return jsDocTagInfoArray.some(
    (tagInfo) => tagInfo.name === JSDOC_EXCEPTION_TAG,
  );
}
