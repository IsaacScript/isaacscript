import { preferConst } from "../../src/rules/prefer-const.js";
import { ruleTester } from "../utils.js";

ruleTester.run("prefer-const", preferConst, {
  valid: [
    {
      code: `
const a = 1;
      `,
    },
  ],

  invalid: [
    {
      code: `
let a = 1;
      `,
      errors: [{ messageId: "useConst" }],
    },
  ],
});
