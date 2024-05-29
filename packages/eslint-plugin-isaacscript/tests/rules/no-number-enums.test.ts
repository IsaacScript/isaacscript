import { noNumberEnums } from "../../src/rules/no-number-enums.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-number-enums", noNumberEnums, {
  valid: [
    {
      code: `
enum Foo {
  Value1 = "Value1",
}
      `,
    },
  ],

  invalid: [
    {
      code: `
enum Foo {
  Value1 = 1,
}
      `,
      errors: [{ messageId: "noNumberEnums" }],
    },
  ],
});
