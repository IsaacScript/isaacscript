import { isTypeReferenceType } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { isAny } from "../typeUtils";
import { createRule, getOrdinalSuffix } from "../utils";

export const noObjectAny = createRule({
  name: "no-object-any",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows declaring objects and arrays that do not have a type",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noType:
        "Objects/arrays must be declared with a type. (The {{ ordinal }} type parameter is `any`.)",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      VariableDeclarator(node) {
        // From: https://github.com/typescript-eslint/typescript-eslint/issues/781
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);

        /**
         * We have to use `leftTSNode.name` instead of `leftTSNode` to avoid run-time errors because
         * the `typeChecker.getTypeAtLocation` method expects a `ts.BindingName` instead
         * of a`ts.VariableDeclaration`: https://github.com/microsoft/TypeScript/issues/48878
         */
        const type = checker.getTypeAtLocation(tsNode.name);

        if (!isTypeReferenceType(type)) {
          return;
        }

        const typeArguments = checker.getTypeArguments(type);
        for (const [i, typeArgument] of typeArguments.entries()) {
          if (isAny(typeArgument)) {
            context.report({
              node,
              messageId: "noType",
              data: {
                ordinal: getOrdinalSuffix(i + 1), // e.g. 0 --> 1st
              },
            });
          }
        }
      },
    };
  },
});
