import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { isFirstLetterCapitalized } from "isaacscript-common-ts";
import ts from "typescript";
import { getTypeName } from "../typeUtils.js";
import { createRule } from "../utils.js";

export type Options = [];

export type MessageIds =
  | "readOnlyMap"
  | "readOnlySet"
  | "readOnlyArray"
  | "readOnlyObject";

export const requireCapitalReadOnly = createRule<Options, MessageIds>({
  name: "require-capital-read-only",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires maps/sets/arrays with a capital letter to be read-only",
      recommended: "recommended",
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
      readOnlyObject:
        'Objects with a capital letter must be read-only. Try using a type annotation with the "Readonly" helper type.',
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
            loc: node.loc,
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

  if (typeName === "__object" && !isReadOnlyObject(type)) {
    return "readOnlyObject";
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

function isReadOnlyObject(type: ts.Type): boolean {
  const symbols = type.getProperties();
  return symbols.every((symbol) => isReadonlySymbol(symbol));
}

/* eslint-disable */
/**
 * This is copied from TypeScript internally; it is not exported or exposed:
 * https://github.com/microsoft/TypeScript/issues/31296
 */
function isReadonlySymbol(symbol: ts.Symbol): boolean {
  // The following symbols are considered read-only:
  // - Properties with a 'readonly' modifier
  // - Variables declared with 'const'
  // - Get accessors without matching set accessors
  // - Enum members
  // - Object.defineProperty assignments with writable false or no setter
  // - Unions and intersections of the above (unions and intersections eagerly set isReadonly on
  //   creation)
  return !!(
    // prettier-ignore
    // @ts-expect-error Using internal functions.
    (ts.getCheckFlags(symbol) & ts.CheckFlags.Readonly ||
      (symbol.flags & ts.SymbolFlags.Property &&
        // @ts-expect-error Using internal functions.
        ts.getDeclarationModifierFlagsFromSymbol(symbol) &
          ts.ModifierFlags.Readonly) ||
      (symbol.flags & ts.SymbolFlags.Variable &&
        // @ts-expect-error Using internal functions.
        ts.getDeclarationNodeFlagsFromSymbol(symbol) & ts.NodeFlags.Const) ||
      (symbol.flags & ts.SymbolFlags.Accessor &&
        !(symbol.flags & ts.SymbolFlags.SetAccessor)) ||
      symbol.flags & ts.SymbolFlags.EnumMember)
  );
}
/* eslint-enable */
