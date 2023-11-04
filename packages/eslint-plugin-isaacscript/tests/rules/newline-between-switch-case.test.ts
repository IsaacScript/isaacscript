import { newlineBetweenSwitchCase } from "../../src/rules/newline-between-switch-case";
import { ruleTester } from "../utils";

ruleTester.run("newline-between-switch-case", newlineBetweenSwitchCase, {
  valid: [
    {
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
    },
  ],

  invalid: [
    {
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
    },
  ],
});
