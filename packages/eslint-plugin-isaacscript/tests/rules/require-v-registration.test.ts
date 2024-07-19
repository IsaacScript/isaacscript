import { requireVRegistration } from "../../src/rules/require-v-registration.js";
import { ruleTester } from "../utils.js";

ruleTester.run("require-v-registration", requireVRegistration, {
  valid: [
    {
      code: `
const v = 123;
saveDataManager("foo", v);
      `,
    },
    {
      code: `
const v = 123;
class Foo {
  v = v;
}
      `,
    },
  ],

  invalid: [
    {
      code: `
const v = 123;
      `,
      errors: [{ messageId: "noRegistration" }],
    },
  ],
});
