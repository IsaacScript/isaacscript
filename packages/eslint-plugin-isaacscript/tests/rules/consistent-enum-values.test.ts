import { consistentEnumValues } from "../../src/rules/consistent-enum-values";
import { ruleTester } from "../utils";

ruleTester.run("consistent-enum-values", consistentEnumValues, {
  valid: [
    {
      code: `
enum Foo {
  Value1,
}
      `,
    },
    {
      code: `
enum Foo {
  Value1 = 0,
}
      `,
    },
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
  Value1 = "VALUE1",
}
      `,
      errors: [{ messageId: "inconsistentValue" }],
    },
  ],
});
