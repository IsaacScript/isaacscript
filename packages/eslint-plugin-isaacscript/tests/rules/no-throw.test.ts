import { noThrow } from "../../src/rules/no-throw";
import { ruleTester } from "../utils";

ruleTester.run("no-throw", noThrow, {
  valid: [
    {
      code: `
error("foo");
      `,
    },
  ],

  invalid: [
    {
      code: `
throw new Error("foo");
      `,
      errors: [{ messageId: "noThrow" }],
    },
  ],
});
