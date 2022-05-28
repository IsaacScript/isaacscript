import { requireConstAssertions } from "../../src/rules/require-const-assertions";
import { ruleTester } from "../utils";

ruleTester.run("require-const-assertions", requireConstAssertions, {
  valid: [
    {
      code: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;
      `,
    },
  ],
  invalid: [
    {
      code: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
};
      `,
      errors: [{ messageId: "noConstAssertion" }],
      output: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;
      `,
    },
  ],
});
