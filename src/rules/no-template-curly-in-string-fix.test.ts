import { ruleTester } from "../utils";
import { noTemplateCurlyInStringFix } from "./no-template-curly-in-string-fix";

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
