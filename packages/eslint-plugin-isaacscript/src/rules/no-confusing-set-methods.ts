import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { getTypeName } from "../typeUtils";
import { createRule } from "../utils";

type Options = [];

type MessageIds = "noKeys" | "noEntries";

const METHOD_NAME_TO_MESSAGE_ID: ReadonlyMap<string, MessageIds> = new Map([
  ["keys", "noKeys"],
  ["entries", "noEntries"],
]);

export const noConfusingSetMethods = createRule<Options, MessageIds>({
  name: "no-confusing-set-methods",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows confusing methods for sets",
      recommended: "recommended",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noKeys:
        "Using the `Set.keys` method is confusing, since sets do not have keys. Use the `Set.values` method instead.",
      noEntries:
        "Using the `Set.entries` method is confusing, since sets only have values. Use the `Set.values` method instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      MemberExpression(node) {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.object);
        const type = checker.getTypeAtLocation(tsNode);

        const typeName = getTypeName(type);
        if (typeName !== "Set" && typeName !== "ReadonlySet") {
          return;
        }

        const { property } = node;
        if (property.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const methodName = property.name;
        const messageId = METHOD_NAME_TO_MESSAGE_ID.get(methodName);
        if (messageId === undefined) {
          return;
        }

        context.report({
          loc: node.loc,
          messageId,
        });
      },
    };
  },
});
