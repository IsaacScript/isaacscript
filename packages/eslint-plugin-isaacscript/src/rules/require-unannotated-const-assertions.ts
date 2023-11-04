import { createRule } from "../utils";

export const requireUnannotatedConstAssertions = createRule({
  name: "require-unannotated-const-assertions",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows explicit type annotations for variables that have a const assertion",
      recommended: "recommended",
    },
    schema: [],
    messages: {
      annotatedConstAssertion:
        "Don't use `as const` with a type annotated variable, since it widens the type.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'VariableDeclarator[id.typeAnnotation] > :matches(TSTypeAssertion, TSAsExpression) > TSTypeReference.typeAnnotation > Identifier[name="const"]':
        (node) => {
          context.report({
            node,
            messageId: "annotatedConstAssertion",
          });
        },
    };
  },
});
