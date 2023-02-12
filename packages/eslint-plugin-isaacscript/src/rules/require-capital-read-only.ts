import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { getTypeName } from "../typeUtils";
import { createRule, isFirstLetterCapitalized } from "../utils";

type Options = [];
type MessageIds = "readOnlyMap" | "readOnlySet" | "readOnlyArray";

export const requireCapitalReadOnly = createRule<Options, MessageIds>({
  name: "require-capital-read-only",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires maps/sets/arrays with a capital letter to be read-only",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      readOnlyMap:
        'Maps with a capital letter must be explicitly annotated as "ReadOnlyMap".',
      readOnlySet:
        'Sets with a capital letter must be explicitly annotated as "ReadOnlySet".',
      readOnlyArray:
        'Arrays with a capital letter must be explicitly annotated as "readonly" or "ReadonlyArray".',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      VariableDeclaration(node) {
        if (node.kind !== "const") {
          return;
        }

        for (const declaration of node.declarations) {
          const { id } = declaration;
          if (id.type !== AST_NODE_TYPES.Identifier) {
            continue;
          }

          const variableName = id.name;
          if (!isFirstLetterCapitalized(variableName)) {
            continue;
          }

          const tsNode = parserServices.esTreeNodeToTSNodeMap.get(declaration);
          const type = checker.getTypeAtLocation(tsNode);

          const messageId = getErrorMessageId(type);
          if (messageId === undefined) {
            return;
          }

          context.report({
            loc: {
              start: node.loc.start,
              end: node.loc.end,
            },
            messageId,
          });
        }
      },
    };
  },
});

function getErrorMessageId(type: ts.Type): MessageIds | undefined {
  const typeName = getTypeName(type);
  if (typeName === undefined) {
    return undefined;
  }

  // This would be "ReadonlyMap" if it was the read-only version.
  if (typeName === "Map") {
    return "readOnlyMap";
  }

  // This would be "ReadonlySet" if it was the read-only version.
  if (typeName === "Set") {
    return "readOnlySet";
  }

  // This would be "ReadonlyArray" if it was the read-only version.
  if (typeName === "Array") {
    return "readOnlyArray";
  }

  return undefined;
}
