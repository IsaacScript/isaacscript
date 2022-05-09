import { eqeqeqFix } from "./rules/eqeqeq-fix";
import { limitSlashAsteriskComments } from "./rules/limit-slash-asterisk-comments";
import { limitSlashSlashComments } from "./rules/limit-slash-slash-comments";
import { noLetAny } from "./rules/no-let-any";
import { noObjectAny } from "./rules/no-object-any";
import { noTemplateCurlyInStringFix } from "./rules/no-template-curly-in-string-fix";
import { noVoidReturnType } from "./rules/no-void-return-type";

export const rules = {
  "eqeqeq-fix": eqeqeqFix,
  "limit-slash-asterisk-comments": limitSlashAsteriskComments,
  "limit-slash-slash-comments": limitSlashSlashComments,
  "no-let-any": noLetAny,
  "no-object-any": noObjectAny,
  "no-template-curly-in-string-fix": noTemplateCurlyInStringFix,
  "no-void-return-type": noVoidReturnType,
};
