import { preferPostfixPlusplus } from "../../src/rules/prefer-postfix-plusplus";
import { ruleTester } from "../utils";

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
      output: `
foo++;
      `,
    },
    {
      code: `
--foo;
      `,
      errors: [{ messageId: "minusMinus" }],
      output: `
foo--;
      `,
    },
  ],
});
