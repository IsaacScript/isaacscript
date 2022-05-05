import { noTemplateCurlyInStringFix } from "../../src/rules/no-template-curly-in-string-fix";
import { ruleTester } from "../utils";

ruleTester.run("no-template-curly-in-string-fix", noTemplateCurlyInStringFix, {
  valid: [
    {
      code: `
console.log(\`foo: \${foo}\`);
      `,
    },
  ],
  invalid: [
    {
      code: `
console.log("foo: \${foo}");
      `,
      errors: [{ messageId: "unexpectedTemplateExpression" }],
      output: `
console.log(\`foo: \${foo}\`);
      `,
    },
  ],
});
