import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";
import { createRule } from "../utils";

export type Options = [];
export type MessageIds = "plusPlus" | "minusMinus";

export const preferPlusplus = createRule<Options, MessageIds>({
  name: "prefer-plusplus",
  meta: {
    type: "problem",
    docs: {
      description:
        'Require "++" or "--" operators instead of assignment operators where applicable',
      recommended: "recommended",
    },
    schema: [],
    messages: {
      plusPlus: 'Use "++" instead, as it is more concise and easier to read.',
      minusMinus: 'Use "--" instead, as it is more concise and easier to read.',
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);

    return {
      AssignmentExpression(node) {
        if (node.operator !== "+=" && node.operator !== "-=") {
          return;
        }

        const tsNodeRight = parserServices.esTreeNodeToTSNodeMap.get(
          node.right,
        );
        if (!ts.isNumericLiteral(tsNodeRight)) {
          return;
        }

        if (tsNodeRight.getText() !== "1") {
          return;
        }

        const messageId = node.operator === "+=" ? "plusPlus" : "minusMinus";

        context.report({
          loc: node.loc,
          messageId,
          fix(fixer) {
            const tsNodeLeft = parserServices.esTreeNodeToTSNodeMap.get(
              node.left,
            );
            const newOperator = node.operator === "+=" ? "++" : "--";
            const newExpression = tsNodeLeft.getText() + newOperator;
            return fixer.replaceText(node, newExpression);
          },
        });
      },
    };
  },
});
