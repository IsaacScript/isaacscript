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
           * Skip declarations like:
           *
           * ```ts
           * let [, b] = myArray;
           * ```
           *
           * Situations like this will cause a runtime error in the "getTypeAtLocation" method below.
           */
          /*
          if (declaration) {
            continue;
          }
          */

          const type = checker.getTypeAtLocation(tsNode);
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
