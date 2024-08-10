import { ESLintUtils } from "@typescript-eslint/utils";
import { isAny } from "../typeUtils.js";
import { createRule } from "../utils.js";

export const noLetAny = createRule({
  name: "no-let-any",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows declaring variables with let that do not have a type",
      recommended: true,
      requiresTypeChecking: true,
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

    return {
      VariableDeclaration(node) {
        if (node.kind !== "let") {
          return;
        }

        for (const declaration of node.declarations) {
          const tsNode = parserServices.esTreeNodeToTSNodeMap.get(declaration);

          /**
           * We have to use `leftTSNode.name` instead of `leftTSNode` to avoid run-time errors
           * because the `typeChecker.getTypeAtLocation` method expects a `ts.BindingName` instead
           * of a `ts.VariableDeclaration`: https://github.com/microsoft/TypeScript/issues/48878
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
