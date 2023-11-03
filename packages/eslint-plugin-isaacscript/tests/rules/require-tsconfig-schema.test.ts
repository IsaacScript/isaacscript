import { requireTsconfigSchema } from "../../src/rules/require-tsconfig-schema";
import { ruleTester } from "../utils";

ruleTester.run("require-tsconfig-schema", requireTsconfigSchema, {
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
      errors: [{ messageId: "noSchema" }],
    },
  ],
});
