import { preferReadonlyParameterTypes } from "../../src/rules/prefer-readonly-parameter-types";
import { ruleTester } from "../utils";

ruleTester.run("prefer-readonly-parameter-types", preferReadonlyParameterTypes, {
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
const a = 1;
      `,
      errors: [{ messageId: "foo" }],
    },
  ],
});
