import { newlineBetweenSwitchCase } from "../../src/rules/newline-between-switch-case";
import { ruleTester } from "../utils";

ruleTester.run("newline-between-switch-case", newlineBetweenSwitchCase, {
  valid: [
    {
      code: `
switch (foo) {
  case 1: {
    doSomething();
    break;
  }

  case 2: {
    doSomething();
    break;
  }
}
      `,
    },
  ],

  invalid: [
    {
      code: `
switch (foo) {
  case 1: {
    doSomething();
    break;
  }
  case 2: {
    doSomething();
    break;
  }
}
      `,
      errors: [{ messageId: "noNewline" }],
      output: `
switch (foo) {
  case 1: {
    doSomething();
    break;
  }

  case 2: {
    doSomething();
    break;
  }
}
      `,
    },
  ],
});
