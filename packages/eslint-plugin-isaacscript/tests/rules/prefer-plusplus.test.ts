import type { TSESLint } from "@typescript-eslint/utils";
import type { MessageIds, Options } from "../../src/rules/prefer-plusplus.js";
import { preferPlusplus } from "../../src/rules/prefer-plusplus.js";
import { ruleTester } from "../utils.js";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Normal plus plus",
  code: `
i++;
  `,
});

valid.push({
  name: "Normal minus minus",
  code: `
i--;
  `,
});

valid.push({
  name: "Normal plus equals 2",
  code: `
i += 2;
  `,
});

valid.push({
  name: "Normal minus equals 2",
  code: `
i -= 2;
  `,
});

invalid.push({
  name: "Normal plus equals 1",
  code: `
i += 1;
  `,
  errors: [{ messageId: "plusPlus" }],
  output: `
i++;
  `,
});

invalid.push({
  name: "Normal minus equals 1",
  code: `
i -= 1;
  `,
  errors: [{ messageId: "minusMinus" }],
  output: `
i--;
  `,
});

ruleTester.run("prefer-plusplus", preferPlusplus, {
  valid,
  invalid,
});
