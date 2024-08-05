import { noUnsafePlusplus } from "../../src/rules/no-unsafe-plusplus.js";
import { ruleTester } from "../utils.js";

ruleTester.run("no-unsafe-plusplus", noUnsafePlusplus, {
  valid: [
    {
      code: `
foo++;
foo--;
      `,
    },
    {
      code: `
void foo++;
void foo--;
      `,
    },
    {
      code: `
foo++, foo++, 0;
foo--, foo--, 0;
      `,
    },
    {
      code: `
for (; ; foo++) {}
for (; ; foo--) {}
      `,
    },
  ],

  invalid: [
    {
      code: `
foo++, foo++, foo++;
foo--, foo--, foo--;
      `,
      errors: [{ messageId: "plusPlus" }, { messageId: "minusMinus" }],
    },
    {
      code: `
for (foo++; ; ) {}
for (foo--; ; ) {}
      `,
      errors: [{ messageId: "plusPlus" }, { messageId: "minusMinus" }],
    },
    {
      code: `
for (; foo++; ) {}
for (; foo--; ) {}
      `,
      errors: [{ messageId: "plusPlus" }, { messageId: "minusMinus" }],
    },
    {
      code: `
foo++ + foo++;
foo-- - foo--;
      `,
      errors: [
        { messageId: "plusPlus" },
        { messageId: "plusPlus" },
        { messageId: "minusMinus" },
        { messageId: "minusMinus" },
      ],
    },
  ],
});
