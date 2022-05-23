import { noTemplateCurlyInStringFix } from "../../src/rules/no-template-curly-in-string-fix";
import { ruleTester } from "../utils";

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
