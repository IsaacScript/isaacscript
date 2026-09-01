import { requireVRegistration } from "../../src/rules/require-v-registration.js";
import { ruleTester } from "../utils.js";

ruleTester.run("require-v-registration", requireVRegistration, {
  invalid: [
    {
      errors: [{ messageId: "noRegistration" }],
      code: `
const v = 123;
      `,
    },
  ],
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
});
