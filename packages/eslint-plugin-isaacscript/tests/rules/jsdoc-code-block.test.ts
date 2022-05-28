import { jsdocCodeBlock } from "../../src/rules/jsdoc-code-block";
import { ruleTester } from "../utils";

ruleTester.run("jsdoc-code-block", jsdocCodeBlock, {
  valid: [
    {
      code: `
/**
 * Use \`foo\` like this:
 *
 * \`\`\`ts
 * foo();
 * \`\`\`
 */
      `,
    },
  ],
  invalid: [
    {
      code: `
/**
 * Use \`foo\` like this:
 *
 * \`\`\`
 * foo();
 * \`\`\`
 */
      `,
      errors: [{ messageId: "noLanguage" }],
    },
  ],
});
