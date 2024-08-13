// cspell:ignore readonlyness

import type { TypeOrValueSpecifier } from "@typescript-eslint/type-utils";
import {
  isTypeReadonly,
  readonlynessOptionsDefaults,
  readonlynessOptionsSchema,
} from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getParserServices } from "@typescript-eslint/utils/eslint-utils";
import { getTypeName, unionTypeParts } from "../typeUtils.js";
import { createRule } from "../utils.js";

type Options = [
  {
    allow?: TypeOrValueSpecifier[];
    checkParameterProperties?: boolean;
    ignoreInferredTypes?: boolean;
    treatMethodsAsReadonly?: boolean;
    onlyRecordsArraysMapsSet?: boolean;
  },
];
type MessageIds = "shouldBeReadonly";

export const preferReadonlyParameterTypes = createRule<Options, MessageIds>({
  name: "prefer-readonly-parameter-types",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require function parameters to be typed as `readonly` to prevent accidental mutation of inputs",
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {
          allow: readonlynessOptionsSchema.properties.allow,
          checkParameterProperties: {
            type: "boolean",
          },
          ignoreInferredTypes: {
            type: "boolean",
          },
          treatMethodsAsReadonly:
            readonlynessOptionsSchema.properties.treatMethodsAsReadonly,
          onlyRecordsArraysMapsSet: {
            type: "boolean",
          },
        },
      },
    ],
    messages: {
      shouldBeReadonly: "Parameter should be a read only type.",
    },
  },
  defaultOptions: [
    {
      allow: readonlynessOptionsDefaults.allow,
      checkParameterProperties: true,
      ignoreInferredTypes: false,
      treatMethodsAsReadonly:
        readonlynessOptionsDefaults.treatMethodsAsReadonly,
      onlyRecordsArraysMapsSet: true,
    },
  ],
  create(
    context,
    [
      {
        allow,
        checkParameterProperties,
        ignoreInferredTypes,
        treatMethodsAsReadonly,
        onlyRecordsArraysMapsSet,
      },
    ],
  ) {
    const services = getParserServices(context);

    if (allow === undefined) {
      allow = [];
    }

    allow.push("ReadonlyMap", "ReadonlySet");

    return {
      [[
        AST_NODE_TYPES.ArrowFunctionExpression,
        AST_NODE_TYPES.FunctionDeclaration,
        AST_NODE_TYPES.FunctionExpression,
        AST_NODE_TYPES.TSCallSignatureDeclaration,
        AST_NODE_TYPES.TSConstructSignatureDeclaration,
        AST_NODE_TYPES.TSDeclareFunction,
        AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
        AST_NODE_TYPES.TSFunctionType,
        AST_NODE_TYPES.TSMethodSignature,
      ].join(", ")](
        node:
          | TSESTree.ArrowFunctionExpression
          | TSESTree.FunctionDeclaration
          | TSESTree.FunctionExpression
          | TSESTree.TSCallSignatureDeclaration
          | TSESTree.TSConstructSignatureDeclaration
          | TSESTree.TSDeclareFunction
          | TSESTree.TSEmptyBodyFunctionExpression
          | TSESTree.TSFunctionType
          | TSESTree.TSMethodSignature,
      ): void {
        for (const param of node.params) {
          if (
            checkParameterProperties === false &&
            param.type === AST_NODE_TYPES.TSParameterProperty
          ) {
            continue;
          }

          const actualParam =
            param.type === AST_NODE_TYPES.TSParameterProperty
              ? param.parameter
              : param;

          if (
            ignoreInferredTypes === true &&
            actualParam.typeAnnotation === undefined
          ) {
            continue;
          }

          const type = services.getTypeAtLocation(actualParam);

          if (onlyRecordsArraysMapsSet === true) {
            const parts = unionTypeParts(type);
            const hasAllBasicDataStructures = parts.every((t) => {
              const typeName = getTypeName(t);
              return (
                typeName === "Array" ||
                typeName === "Map" ||
                typeName === "Set" ||
                typeName === "Record"
              );
            });

            if (!hasAllBasicDataStructures) {
              return;
            }

            // Handle the case of only checking records, arrays, maps, and sets.
            for (const t of parts) {
              const typeName = getTypeName(t);

              switch (typeName) {
                case "Array":
                case "Map":
                case "Set": {
                  context.report({
                    node: actualParam,
                    messageId: "shouldBeReadonly",
                  });
                  break;
                }

                case "Record": {
                  const isReadOnly = isTypeReadonly(services.program, type, {
                    treatMethodsAsReadonly,
                    allow,
                  });

                  if (!isReadOnly) {
                    context.report({
                      node: actualParam,
                      messageId: "shouldBeReadonly",
                    });
                  }

                  break;
                }

                default: {
                  break;
                }
              }
            }
          } else {
            // Handle the standard case.
            const isReadOnly = isTypeReadonly(services.program, type, {
              treatMethodsAsReadonly,
              allow,
            });

            if (!isReadOnly) {
              context.report({
                node: actualParam,
                messageId: "shouldBeReadonly",
              });
            }
          }
        }
      },
    };
  },
});
