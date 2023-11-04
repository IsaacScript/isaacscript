import { requireBreak } from "../../src/rules/require-break";
import { ruleTester } from "../utils";

ruleTester.run("require-break", requireBreak, {
  valid: [
    {
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
    },
    {
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
    },
  ],

  invalid: [
    {
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
    },
    {
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
    },
  ],
});
