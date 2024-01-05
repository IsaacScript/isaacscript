import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isFirstLetterCapitalized } from "../isaacScriptCommonTS";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "noConstAssertion";

const ARRAY_OR_OBJECT_EXPRESSION_TYPES: ReadonlySet<AST_NODE_TYPES> = new Set([
  AST_NODE_TYPES.ObjectExpression,
  AST_NODE_TYPES.ArrayExpression,
  AST_NODE_TYPES.TSSatisfiesExpression,
]);

const AUTO_FIX_TYPE_BLACKLIST: ReadonlySet<AST_NODE_TYPES> = new Set([
  // If the variable is already being casted to something with "as", then don't apply any fix to
  // avoid stomping on the existing code.
  AST_NODE_TYPES.TSAsExpression,

  // The `satisfies` keyword will mess up the auto-fixer, because "as const" will be placed after
  // the satisfies part.
  AST_NODE_TYPES.TSSatisfiesExpression,
]);

export const requireCapitalConstAssertions = createRule<Options, MessageIds>({
  name: "require-capital-const-assertions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires a capital letter for named objects and arrays that have a const assertion",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      noConstAssertion:
        "Variables with capital letters that assign an object or array must use const assertions.",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
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

          if (!isFirstLetterCapitalized(id.name)) {
            continue;
          }

          const { init } = declaration;
          if (init === null) {
            continue;
          }

          // Do nothing if this is not an object or array expression.
          if (!ARRAY_OR_OBJECT_EXPRESSION_TYPES.has(init.type)) {
            continue;
          }

          if (hasConstAssertion(init)) {
            continue;
          }

          context.report({
            loc: node.loc,
            messageId: "noConstAssertion",
            fix: (fixer) => {
              // If this variable isn't being assigned to anything, then there is nothing we can
              // fix.
              if (declaration.init === null) {
                return null;
              }

              if (declaration.init.type === AST_NODE_TYPES.TSAsExpression) {
                return null;
              }

              if (AUTO_FIX_TYPE_BLACKLIST.has(declaration.init.type)) {
                return null;
              }

              return fixer.insertTextAfter(declaration.init, " as const");
            },
          });
        }
      },
    };
  },
});

function hasConstAssertion(init: TSESTree.Expression): boolean {
  switch (init.type) {
    case AST_NODE_TYPES.TSAsExpression: {
      return hasConstAssertionWithoutSatisfies(init);
    }

    case AST_NODE_TYPES.TSSatisfiesExpression: {
      return hasConstAssertionWithSatisfies(init);
    }

    default: {
      return false;
    }
  }
}

function hasConstAssertionWithoutSatisfies(
  init: TSESTree.TSAsExpression,
): boolean {
  const { typeAnnotation } = init;
  if (typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }

  const { typeName } = typeAnnotation;
  if (typeName.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  return typeName.name === "const";
}

/** The "as const" part is nested within the `TSSatisfiesExpression` node as another expression. */
function hasConstAssertionWithSatisfies(
  init: TSESTree.TSSatisfiesExpression,
): boolean {
  const { expression } = init;
  if (expression.type !== AST_NODE_TYPES.TSAsExpression) {
    return false;
  }

  return hasConstAssertionWithoutSatisfies(expression);
}
