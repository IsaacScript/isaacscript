import { consistentReturnUndefined } from "../../src/rules/consistent-return-undefined";
import { ruleTester } from "../utils";

ruleTester.run("consistent-return-undefined", consistentReturnUndefined, {
  valid: [
    {
      code: `
function getFoo(): undefined {
  return undefined;
}
      `,
    },
  ],

  invalid: [
    {
      code: `
function getFoo(): undefined {
  return;
}
      `,
      errors: [{ messageId: "missingUndefined" }],
    },

    /*
    {
      code: `
function getFoo(): undefined {}
      `,
      errors: [{ messageId: "missingUndefined" }],
    },
    */
  ],
});
