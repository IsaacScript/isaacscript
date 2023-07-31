import { requireUnannotatedConstAssertions } from "../../src/rules/require-unannotated-const-assertions";
import { ruleTester } from "../utils";

ruleTester.run(
  "require-unannotated-const-assertions",
  requireUnannotatedConstAssertions,
  {
    valid: [
      {
        code: `
const array = [1, 2, 3] as const;
      `,
      },
      {
        code: `
const array: number[] = [1, 2, 3];
      `,
      },
    ],

    invalid: [
      {
        code: `
const array: number[] = [1, 2, 3] as const;
      `,
        errors: [{ messageId: "annotatedConstAssertion" }],
      },
    ],
  },
);
