import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { capitalizeFirstLetter, trimPrefix } from "../isaacScriptCommon.js";
import { getTypeName } from "../typeUtils.js";
import { createRule } from "../utils.js";

type Options = [];

type MessageIds =
  | "noObjectEntriesMap"
  | "noObjectKeysMap"
  | "noObjectValuesMap"
  | "noObjectEntriesSet"
  | "noObjectKeysSet"
  | "noObjectValuesSet";

const PROBLEM_METHODS: ReadonlySet<string> = new Set([
  "entries",
  "keys",
  "values",
]);

const PROBLEM_TYPES: ReadonlySet<string> = new Set([
  "Map",
  "Set",
  "ReadonlyMap",
  "ReadonlySet",
]);

export const noObjectMethodsWithMapSet = createRule<Options, MessageIds>({
  name: "no-object-methods-with-map-set",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows using object methods with maps and sets",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noObjectEntriesMap:
        "You cannot use the `Object.entries` method with a map. Consider using the `entries` method on the map instead.",
      noObjectKeysMap:
        "You cannot use the `Object.keys` method with a map. Consider using the `keys` method on the map instead.",
      noObjectValuesMap:
        "You cannot use the `Object.values` method with a map. Consider using the `values` method on the map instead.",
      noObjectEntriesSet:
        "You cannot use the `Object.entries` method with a set. Consider using the `entries` method on the set instead.",
      noObjectKeysSet:
        "You cannot use the `Object.keys` method with a set. Consider using the `keys` method on the set instead.",
      noObjectValuesSet:
        "You cannot use the `Object.values` method with a set. Consider using the `values` method on the set instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      /** When a function or method is called. */
      CallExpression(node) {
        // First, check if this is invoking a method on an object.
        const { callee } = node;
        if (callee.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        // Second, check if the object is `Object`.
        const { object } = callee;
        if (
          object.type !== AST_NODE_TYPES.Identifier ||
          object.name !== "Object"
        ) {
          return;
        }

        // Third, check if this is one of the problem methods.
        const { property } = callee;
        if (
          property.type !== AST_NODE_TYPES.Identifier ||
          !PROBLEM_METHODS.has(property.name)
        ) {
          return;
        }
        const methodName = property.name;

        // Fourth, check the type of the thing being passed.
        const firstArgument = node.arguments[0];
        if (firstArgument === undefined) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(firstArgument);
        const type = checker.getTypeAtLocation(tsNode);

        const typeName = getTypeName(type);
        if (typeName === undefined) {
          return;
        }

        if (!PROBLEM_TYPES.has(typeName)) {
          return;
        }

        const capitalMethodName = capitalizeFirstLetter(methodName);
        const trimmedTypeName = trimPrefix(typeName, "Readonly");
        const messageId =
          `noObject${capitalMethodName}${trimmedTypeName}` as MessageIds;

        context.report({
          loc: node.loc,
          messageId,
        });
      },
    };
  },
});
