import { preferPostfixPlusplus } from "../../src/rules/prefer-postfix-plusplus.js";
import { ruleTester } from "../utils.js";

ruleTester.run("prefer-postfix-plusplus", preferPostfixPlusplus, {
  valid: [
    {
      code: `
foo++;
      `,
    },
    {
      code: `
foo--;
      `,
    },
  ],

  invalid: [
    {
      code: `
++foo;
      `,
      errors: [{ messageId: "plusPlus" }],
    },
    {
      code: `
--foo;
      `,
      errors: [{ messageId: "minusMinus" }],
    },
  ],
});
