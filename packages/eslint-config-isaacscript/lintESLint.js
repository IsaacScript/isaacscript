const useAtYourOwnRisk = require("eslint/use-at-your-own-risk");

const ESLINT_RULES = [...useAtYourOwnRisk.builtinRules.keys()];
console.log(ESLINT_RULES);
