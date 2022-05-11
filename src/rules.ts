import { eqeqeqFix } from "./rules/eqeqeq-fix";
import { jsdocCompleteSentences } from "./rules/jsdoc-complete-sentences";
import { limitJSDocComments } from "./rules/limit-jsdoc-comments";
import { limitSlashSlashComments } from "./rules/limit-slash-slash-comments";
import { noEmptyJSDoc } from "./rules/no-empty-jsdoc";
import { noImplicitMapSetLoops } from "./rules/no-implicit-map-set-loops";
import { noLetAny } from "./rules/no-let-any";
import { noObjectAny } from "./rules/no-object-any";
import { noTemplateCurlyInStringFix } from "./rules/no-template-curly-in-string-fix";
import { noUselessReturnNoFix } from "./rules/no-useless-return-no-fix";
import { noVoidReturnType } from "./rules/no-void-return-type";

export const rules = {
  "eqeqeq-fix": eqeqeqFix,
  "jsdoc-complete-sentences": jsdocCompleteSentences,
  "limit-jsdoc-comments": limitJSDocComments,
  "limit-slash-slash-comments": limitSlashSlashComments,
  "no-empty-jsdoc": noEmptyJSDoc,
  "no-implicit-map-set-loops": noImplicitMapSetLoops,
  "no-let-any": noLetAny,
  "no-object-any": noObjectAny,
  "no-template-curly-in-string-fix": noTemplateCurlyInStringFix,
  "no-useless-return-no-fix": noUselessReturnNoFix,
  "no-void-return-type": noVoidReturnType,
};
