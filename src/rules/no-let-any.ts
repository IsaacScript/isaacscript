import { isTypeFlagSet } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import * as ts from "typescript";
import { createRule } from "../utils";

export const noLetAny = createRule({
  name: "no-let-any",
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent declaring variables with let that do not have a type",
      recommended: "error",
    },
    schema: [],
    messages: {
      noType: "Variables must be declared with a type.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    function isAny(type: ts.Type): boolean {
      return isTypeFlagSet(type, ts.TypeFlags.Any);
    }

    return {
      VariableDeclaration(node) {
        if (node.kind !== "let") {
          return;
        }

        for (const declaration of node.declarations) {
          const tsNode = parserServices.esTreeNodeToTSNodeMap.get(declaration);

          /**
           * We have to use `leftTSNode.name` instead of `leftTSNode` to avoid
           * runtime errors because the `typeChecker.getTypeAtLocation` method
           * expects a `ts.BindingName` instead of a`ts.VariableDeclaration`.
           * https://github.com/microsoft/TypeScript/issues/48878
           */
          const type = checker.getTypeAtLocation(tsNode.name);

          if (isAny(type)) {
            context.report({
              node,
              messageId: "noType",
            });
          }
        }
      },
    };
  },
});
