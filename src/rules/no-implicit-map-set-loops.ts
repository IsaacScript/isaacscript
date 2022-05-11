import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

type Options = [];
type MessageIds = "noImplicitMap" | "noImplicitSet";

export const noImplicitMapSetLoops = createRule<Options, MessageIds>({
  name: "no-implicit-map-set-loops",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows implicit iteration for `Maps` and `Sets`",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noImplicitMap:
        "Implicit iteration over Maps is disallowed. (Use .entries() instead.)",
      noImplicitSet:
        "Implicit iteration over Sets is disallowed. (Use .values() instead.)",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      ForOfStatement(node) {
        const thingToIterateOver = node.right;

        // From: https://github.com/typescript-eslint/typescript-eslint/issues/781
        const tsNode =
          parserServices.esTreeNodeToTSNodeMap.get(thingToIterateOver);
        const type = checker.getTypeAtLocation(tsNode);

        if (
          type.symbol === undefined ||
          type.symbol.escapedName === undefined
        ) {
          return;
        }

        const typeName = type.symbol.escapedName;
        const tuple = getTypeTuple(typeName);
        if (tuple === undefined) {
          return;
        }
        const [messageId, replacement] = tuple;

        context.report({
          node,
          messageId,
          fix: (fixer) =>
            fixer.insertTextAfter(thingToIterateOver, replacement),
        });
      },
    };
  },
});

function getTypeTuple(
  typeName: string,
): [messageId: MessageIds, replacement: string] | undefined {
  if (typeName === "Map") {
    return ["noImplicitMap", ".entries()"];
  }

  if (typeName === "Set") {
    return ["noImplicitSet", ".values()"];
  }

  return undefined;
}
