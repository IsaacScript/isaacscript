import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/newline-between-switch-case.js";
import { newlineBetweenSwitchCase } from "../../src/rules/newline-between-switch-case.js";
import { ruleTester } from "../utils.js";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "is empty switch",
  code: `
switch (foo) {}
  `,
});

valid.push({
  name: "is switch with one case",
  code: `
switch (foo) {
  case 1: {}
}
  `,
});

valid.push({
  name: "is switch with two cases",
  code: `
switch (foo) {
  case 1:
  case 2: {}
}
  `,
});

valid.push({
  name: "is newline between case 3 and 4",
  code: `
switch (foo) {
  case 1:
  case 2:
  case 3: {
    doSomething();
    break;
  }

  case 4: {
    doSomething();
    break;
  }
}
  `,
});

invalid.push({
  name: "is not newline between case 3 and 4",
  code: `
switch (foo) {
  case 1:
  case 2:
  case 3: {
    doSomething();
    break;
  }
  case 4: {
    doSomething();
    break;
  }
}
  `,
  errors: [{ messageId: "noNewline" }],
  output: `
switch (foo) {
  case 1:
  case 2:
  case 3: {
    doSomething();
    break;
  }

  case 4: {
    doSomething();
    break;
  }
}
  `,
});

ruleTester.run("newline-between-switch-case", newlineBetweenSwitchCase, {
  valid,
  invalid,
});
