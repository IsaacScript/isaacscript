// Original code from:
// https://github.com/eslint/eslint/blob/main/lib/rules/no-template-curly-in-string.js

import { createRule } from "../utils";

const ERRONEOUS_TEMPLATE_STRING_REGEX = /\$\{[^}]+\}/u;

export const noTemplateCurlyInStringFix = createRule({
  name: "no-template-curly-in-string-fix",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows template literal placeholder syntax in regular strings (and automatically fixes the problem)",
      recommended: "error",
    },
    schema: [],
    messages: {
      unexpectedTemplateExpression: "Unexpected template string expression.",
    },
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      Literal(node) {
        if (
          typeof node.value === "string" &&
          ERRONEOUS_TEMPLATE_STRING_REGEX.test(node.value)
        ) {
          context.report({
            node,
            messageId: "unexpectedTemplateExpression",
            fix(fixer) {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              return fixer.replaceText(node, `\`${node.value}\``);
            },
          });
        }
      },
    };
  },
});
