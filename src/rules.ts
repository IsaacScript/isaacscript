import { eqeqeqFix } from "./rules/eqeqeq-fix";
import { limitJSDocComments } from "./rules/limit-jsdoc-comments";
import { limitSlashSlashComments } from "./rules/limit-slash-slash-comments";
import { noImplicitMapSetLoops } from "./rules/no-implicit-map-set-loops";
import { noLetAny } from "./rules/no-let-any";
import { noObjectAny } from "./rules/no-object-any";
import { noTemplateCurlyInStringFix } from "./rules/no-template-curly-in-string-fix";
import { noVoidReturnType } from "./rules/no-void-return-type";

export const rules = {
  "eqeqeq-fix": eqeqeqFix,
  "limit-jsdoc-comments": limitJSDocComments,
  "limit-slash-slash-comments": limitSlashSlashComments,
  "no-implicit-map-set-loops": noImplicitMapSetLoops,
  "no-let-any": noLetAny,
  "no-object-any": noObjectAny,
  "no-template-curly-in-string-fix": noTemplateCurlyInStringFix,
  "no-void-return-type": noVoidReturnType,
};
