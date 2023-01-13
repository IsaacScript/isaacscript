import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule, isFirstLetterCapitalized } from "../utils";

type Options = [];
type MessageIds = "readOnlyMap" | "readOnlySet";

export const requireCapitalReadOnly = createRule<Options, MessageIds>({
  name: "require-capital-read-only",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires arrays/maps/sets with a capital letter to be read-only",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      readOnlyMap:
        'Maps with a capital letter must be explicitly annotated as "ReadOnlyMap".',
      readOnlySet:
        'Sets with a capital letter must be explicitly annotated as "ReadOnlySet".',
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
          if (!("name" in id)) {
            continue;
          }

          const variableName = id.name;
          if (!isFirstLetterCapitalized(variableName)) {
            continue;
          }

          const tsNode = parserServices.esTreeNodeToTSNodeMap.get(declaration);
          const type = checker.getTypeAtLocation(tsNode);

          const { symbol } = type;
          // The TypeScript definitions are incorrect here; symbol can be undefined.
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (symbol === undefined) {
            return;
          }

          const typeName = symbol.escapedName;
          // Checking this is necessary to type narrow the "__String" type.
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (typeName === undefined) {
            return;
          }

          const messageId = getErrorMessageId(typeName);
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

function getErrorMessageId(typeName: string): MessageIds | undefined {
  if (typeName === "Map") {
    return "readOnlyMap";
  }

  if (typeName === "Set") {
    return "readOnlySet";
  }

  return undefined;
}
