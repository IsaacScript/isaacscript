import { noThrow } from "../../src/rules/no-throw.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-throw", noThrow, {
  invalid: [
    {
      errors: [{ messageId: "noThrow" }],
      code: `
throw new Error("foo");
      `,
    },
  ],
  valid: [
    {
      code: `
error("foo");
      `,
    },
  ],
});
