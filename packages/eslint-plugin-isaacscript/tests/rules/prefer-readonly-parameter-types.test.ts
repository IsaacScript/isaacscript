import { preferReadonlyParameterTypes } from "../../src/rules/prefer-readonly-parameter-types";
import { ruleTester } from "../utils";

ruleTester.run(
  "prefer-readonly-parameter-types",
  preferReadonlyParameterTypes,
  {
    valid: [
      {
        code: `
function foo(array: readonly string[]) {}
        `,
      },
      {
        code: `
function foo(map: ReadonlyMap<string, string>) {}
        `,
      },
      {
        code: `
function foo(set: ReadonlySet<string>) {}
        `,
      },
      {
        code: `
function foo(record: Readonly<Record<string, string>>) {}
        `,
      },
      {
        code: `
interface Foo {
  arg1: boolean;
}
function foo(arg: Foo | string[]) {}
        `,
      },
    ],

    invalid: [
      {
        code: `
function foo(array: string[]) {}
        `,
        errors: [{ messageId: "shouldBeReadonly" }],
      },
      {
        code: `
function foo(map: Map<string, string>) {}
        `,
        errors: [{ messageId: "shouldBeReadonly" }],
      },
      {
        code: `
function foo(map: Set<string>) {}
        `,
        errors: [{ messageId: "shouldBeReadonly" }],
      },
      {
        code: `
function foo(record: Record<string, string>) {}
        `,
        errors: [{ messageId: "shouldBeReadonly" }],
      },
    ],
  },
);
