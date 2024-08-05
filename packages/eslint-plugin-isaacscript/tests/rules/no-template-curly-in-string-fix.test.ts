import { noTemplateCurlyInStringFix } from "../../src/rules/no-template-curly-in-string-fix.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-template-curly-in-string-fix", noTemplateCurlyInStringFix, {
  valid: [
    {
      code: `
const fooString = \`foo: \${foo}\`;
      `,
    },
  ],

  invalid: [
    {
      code: `
const fooString = "foo: \${foo}";
      `,
      errors: [{ messageId: "unexpectedTemplateExpression" }],
      output: `
const fooString = \`foo: \${foo}\`;
      `,
    },
  ],
});
