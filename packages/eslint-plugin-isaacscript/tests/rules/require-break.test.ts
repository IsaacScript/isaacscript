import type { TSESLint } from "@typescript-eslint/utils";
import type { MessageIds, Options } from "../../src/rules/require-break";
import { requireBreak } from "../../src/rules/require-break";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "two cases with break",
  code: `
switch (foo) {
  case 0: {
    break;
  }

  case 1: {
    break;
  }
}
      `,
});

valid.push({
  name: "three cases with break",
  code: `
switch (foo) {
  case 0: {
    break;
  }

  case 1: {
    break;
  }

  default: {
    break;
  }
}
      `,
});

invalid.push({
  name: "second case missing break",
  code: `
switch (foo) {
  case 0: {
    break;
  }

  case 1: {
    doSomething();
  }
}
      `,
  errors: [{ messageId: "noBreak" }],
});

invalid.push({
  name: "third case missing break",
  code: `
switch (foo) {
  case 0: {
    break;
  }

  case 1: {
    break;
  }

  default: {
    doSomething();
  }
}
      `,
  errors: [{ messageId: "noBreak" }],
});

ruleTester.run("require-break", requireBreak, {
  valid,
  invalid,
});
