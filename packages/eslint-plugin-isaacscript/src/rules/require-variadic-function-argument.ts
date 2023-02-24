import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "noArgument";

export const requireVariadicFunctionArgument = createRule<Options, MessageIds>({
  name: "require-variadic-function-argument",
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires that variadic functions must be supplied with at least one argument",
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      noArgument: "You must pass at least one argument to a variadic function.",
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      CallExpression(node) {
        if (node.arguments.length > 0) {
          return;
        }

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const signature = checker.getResolvedSignature(tsNode);
        if (signature === undefined) {
          return;
        }

        const parameters = signature.getParameters();

        if (parameters.length !== 1) {
          return;
        }

        const parameter = parameters[0];
        if (
          parameter === undefined ||
          parameter.valueDeclaration === undefined
        ) {
          return;
        }

        if (!("dotDotDotToken" in parameter.valueDeclaration)) {
          return;
        }

        context.report({
          loc: node.loc,
          messageId: "noArgument",
        });
      },
    };
  },
});
