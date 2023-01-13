import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/types";
import { createRule } from "../utils";

export type Options = [];

export type MessageIds = "noConstAssertion";

export const requireCapitalConstAssertions = createRule<Options, MessageIds>({
  name: "require-capital-const-assertions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires the use of const assertions for named objects with a capital letter",
      recommended: "error",
    },
    schema: [],
    messages: {
      noConstAssertion:
        "Variables with capital letters that assign an object must use const assertions.",
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
          if (!("name" in id)) {
            continue;
          }

          const { name } = id;
          if (!isFirstLetterCapitalized(name)) {
            continue;
          }

          if (!isObjectExpression(declaration)) {
            continue;
          }

          if (hasConstAssertion(declaration)) {
            continue;
          }

          context.report({
            loc: {
              start: node.loc.start,
              end: node.loc.end,
            },
            messageId: "noConstAssertion",
            fix: (fixer) => {
              // If this variable isn't being assigned to anything, then there is nothing we can
              // fix.
              if (declaration.init === null) {
                return null;
              }

              // If this variable is already being casted to something with "as", then don't apply
              // any fix to avoid stomping on the existing code.
              if (declaration.init.type === AST_NODE_TYPES.TSAsExpression) {
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

/**
 * From:
 * https://stackoverflow.com/questions/8334606/check-if-first-letter-of-word-is-a-capital-letter
 */
function isFirstLetterCapitalized(string: string) {
  return /^\p{Lu}/u.test(string);
}

function isObjectExpression(declaration: TSESTree.VariableDeclarator) {
  const { init } = declaration;
  if (init === null) {
    return false;
  }

  return init.type === AST_NODE_TYPES.ObjectExpression;
}

function hasConstAssertion(declaration: TSESTree.VariableDeclarator) {
  const { init } = declaration;
  if (init === null) {
    return false;
  }

  if (!("typeAnnotation" in init)) {
    return false;
  }

  const { typeAnnotation } = init;
  if (typeAnnotation === undefined) {
    return false;
  }

  if (!("typeName" in typeAnnotation)) {
    return false;
  }

  const { typeName } = typeAnnotation;
  if (!("name" in typeName)) {
    return false;
  }

  const { name } = typeName;
  return name === "const";
}
