import { ruleTester } from "../utils";
import { noTemplateCurlyInStringFix } from "./no-template-curly-in-string-fix";

ruleTester.run("no-let-any", noTemplateCurlyInStringFix, {
  valid: [],
  invalid: [],
});
