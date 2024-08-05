import { enumMemberNumberSeparation } from "../../src/rules/enum-member-number-separation.js";
import { ruleTester } from "../utils.js";

ruleTester.run("enum-member-number-separation", enumMemberNumberSeparation, {
  valid: [
    {
      code: `
enum Foo {
  VALUE_1,
  VALUE_2,
}
      `,
    },
  ],

  invalid: [
    {
      code: `
enum Foo {
  VALUE1,
  VALUE2,
}
      `,
      errors: [{ messageId: "notSeparated" }, { messageId: "notSeparated" }],
    },
  ],
});
