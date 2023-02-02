import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { isTypeFlagSet } from "../typeUtils";
import { createRule, isFunction } from "../utils";

export type Options = [];

export type NoInvalidDefaultMapMessageIds = "invalidType";

export const noInvalidDefaultMap = createRule<
  Options,
  NoInvalidDefaultMapMessageIds
>({
  name: "no-invalid-default-map",
  meta: {
    type: "problem",
    docs: {
      description: "Disallows invalid constructors for the DefaultMap class",
      recommended: false,
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      invalidType:
        "The only valid types for a default value are `boolean`, `number`, `string`, and `function`.\nIf you want to have a default value of an array, a map, or some other complex data structure, you must return it as part of a factory function. See the `DefaultMap` documentation for more details.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      NewExpression(node) {
        const { callee } = node;
        if (!("name" in callee)) {
          return;
        }

        const { name } = callee;
        if (name !== "DefaultMap") {
          return;
        }

        const firstArgument = node.arguments[0];
        if (firstArgument === undefined) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(firstArgument);
        const type = checker.getTypeAtLocation(tsNode);

        const isBoolean = isTypeFlagSet(type, ts.TypeFlags.BooleanLike);
        if (isBoolean) {
          return;
        }

        const isNumber = isTypeFlagSet(type, ts.TypeFlags.NumberLike);
        if (isNumber) {
          return;
        }

        const isString = isTypeFlagSet(type, ts.TypeFlags.StringLike);
        if (isString) {
          return;
        }

        const isFunctionLike = isFunction(type, checker);
        if (isFunctionLike) {
          return;
        }

        context.report({
          node,
          messageId: "invalidType",
        });
      },
    };
  },
});
