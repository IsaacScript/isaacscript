import { noStringLength0 } from "../../src/rules/no-string-length-0.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-string-length-0", noStringLength0, {
  valid: [
    {
      code: `
declare const foo: string;
if (foo === "") {
}
      `,
    },
    {
      code: `
declare const foo: string[];
if (foo.length === 0) {
}
      `,
    },
    {
      code: `
declare const foo: number[];
if (foo.length === 0) {
}
      `,
    },
    {
      code: `
declare const foo: string | string[];
if (foo.length === 0) {
}
      `,
    },
  ],

  invalid: [
    {
      code: `
declare const foo: string;
if (foo.length === 0) {
}
      `,
      errors: [{ messageId: "noStringLength0" }],
    },
  ],
});
