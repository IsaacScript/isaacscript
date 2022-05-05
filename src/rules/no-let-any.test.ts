import { ruleTester } from "../utils";
import { noLetAny } from "./no-let-any";

ruleTester.run("no-let-any", noLetAny, {
  valid: [
    {
      code: `
function error(a: string);
function error(b: number);
function error(ab: string | number) {}
export { error };
      `,
    },
  ],
  invalid: [],
});
