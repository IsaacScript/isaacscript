import { consistentNamedTuples } from "../../src/rules/consistent-named-tuples";
import { ruleTester } from "../utils";

ruleTester.run("consistent-named-tuples", consistentNamedTuples, {
  valid: [
    {
      code: `
type MyTuple = [string, number];
      `,
    },
    {
      code: `
type MyTuple = [arg1: string, arg2: number];
      `,
    },
  ],

  invalid: [
    {
      code: `
type MyTuple = [arg1: string, number];
      `,
      errors: [{ messageId: "notNamed" }],
    },
  ],
});
