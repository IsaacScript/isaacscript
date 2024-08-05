import { noThrow } from "../../src/rules/no-throw.js";
import { ruleTester } from "../utils.js";

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
