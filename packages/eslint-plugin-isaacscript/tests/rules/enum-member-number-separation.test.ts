import { enumMemberNumberSeparation } from "../../src/rules/enum-member-number-separation.js";
import { ruleTester } from "../utils.js";

ruleTester.run("enum-member-number-separation", enumMemberNumberSeparation, {
  invalid: [
    {
      errors: [{ messageId: "notSeparated" }, { messageId: "notSeparated" }],
      code: `
enum Foo {
  VALUE1,
  VALUE2,
}
      `,
    },
  ],
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
});
