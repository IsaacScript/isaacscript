// eslint-disable-next-line n/file-extension-in-import
import useAtYourOwnRisk from "eslint/use-at-your-own-risk";

const ESLINT_RULES = [...useAtYourOwnRisk.builtinRules.keys()] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEPRECATED_RULES = [
  "callback-return",
  "global-require",
  "handle-callback-err",
  "id-blacklist",
  "indent-legacy",
  "lines-around-directive",
  "newline-after-var",
  "newline-before-return",
  "no-buffer-constructor",
  "no-mixed-requires",
  "no-native-reassign",
  "no-negated-in-lhs",
  "no-new-require",
  "no-path-concat",
  "no-process-env",
  "no-process-exit",
  "no-restricted-modules",
  "no-spaced-func",
  "no-sync",
  "prefer-reflect",
  "require-jsdoc",
  "valid-jsdoc",
] as const;

for (const rule of ESLINT_RULES) {
  if (rule === "valid-jsdoc") {
    console.log("FOUND");
  }
}
