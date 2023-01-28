// This is a shared configuration file for ESLint:
// https://eslint.org/docs/latest/user-guide/configuring
// This config only contains modifications to the built-in rules from the ESLint tool.
module.exports = {
  rules: {
    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/array-callback-return
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * Airbnb changes the default options for some reason, which makes the rule less strict.
     */
    "array-callback-return": ["warn", {}],
  },

  // "constructor-super" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "for-direction" is enabled here:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js

  // "getter-return" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-async-promise-executor"

  // "no-await-in-loop"

  // "no-class-assign"

  // "no-compare-neg-zero"

  // "no-cond-assign"

  // "no-const-assign" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-constant-binary-expression"

  // "no-constant-condition"

  // "no-constructor-return"

  // "no-control-regex"

  // "no-debugger"

  // "no-dupe-args" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-dupe-class-members" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-dupe-else-if"

  // "no-dupe-keys" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-duplicate-case"

  // "no-duplicate-imports"

  // "no-empty-character-class"

  // "no-empty-pattern"

  // "no-ex-assign"

  // "no-fallthrough"

  // "no-func-assign" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-import-assign" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-inner-declarations"

  // "no-invalid-regexp"

  // "no-irregular-whitespace"

  // "no-loss-of-precision"

  // "no-misleading-character-class"

  // "no-new-native-nonconstructor"

  // "no-new-symbol" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-obj-calls" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-promise-executor-return"

  // "no-prototype-builtins"

  // "no-self-assign"

  // "no-self-compare"

  // "no-setter-return"

  // "no-sparse-arrays"

  // "no-template-curly-in-string"

  // "no-redeclare" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-setter-return" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-this-before-super" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-undef" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-unreachable" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "no-unsafe-negation" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

  // "valid-typeof" is disabled due to conflicting with the TypeScript compiler:
  // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
};
