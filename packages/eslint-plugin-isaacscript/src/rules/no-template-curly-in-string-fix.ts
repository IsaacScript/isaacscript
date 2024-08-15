/**
 * This rule is slightly modified from the original ESLint version:
 * https://github.com/eslint/eslint/blob/main/lib/rules/no-template-curly-in-string.js
 */

import { createRule } from "../utils.js";

const ERRONEOUS_TEMPLATE_STRING_REGEX = /\$\{[^}]+\}/u;

export const noTemplateCurlyInStringFix = createRule({
  name: "no-template-curly-in-string-fix",
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallows template literal placeholder syntax in regular strings (and automatically fixes)",
      recommended: true,
      requiresTypeChecking: false,
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
              return fixer.replaceText(node, `\`${node.value}\``);
            },
          });
        }
      },
    };
  },
});
