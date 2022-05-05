import { eqeqeqFix } from "./rules/eqeqeq-fix";
import { noLetAny } from "./rules/no-let-any";
import { noObjectAny } from "./rules/no-object-any";
import { noTemplateCurlyInStringFix } from "./rules/no-template-curly-in-string-fix";

export const rules = {
  "eqeqeq-fix": eqeqeqFix,
  "no-let-any": noLetAny,
  "no-template-curly-in-string-fix": noTemplateCurlyInStringFix,
  "no-object-any": noObjectAny,
};
