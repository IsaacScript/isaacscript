/**
 * This config only contains rules from `@typescript-eslint` plugin.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // This plugin has separate configs that are recommended to extend from.
  extends: [
    // Contains all of `recommended`, `recommended-type-checked`, and `strict`, along with
    // additional strict rules that require type information. Rules newly added in this
    // configuration are similarly useful (and opinionated) to those in `strict`.
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts
    "plugin:@typescript-eslint/strict-type-checked",

    // Contains all of `stylistic`, along with additional stylistic rules that require type
    // information. Rules newly added in this configuration are similarly opinionated to those in
    // stylistic.
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],

  // https://typescript-eslint.io/rules/
  // - Rules are separated into categories:
  //   - Supported Rules
  //   - Extension Rules
  // - An `[I]` indicates that the rule is inherited from the parent configs.
  // - An `[X]` indicates that the rule is not present in the parent configs and that we explicitly
  //   do not enable it for a particular reason.
  rules: {
    // ---------------
    // Supported Rules
    // ---------------

    // [I] "@typescript-eslint/adjacent-overload-signatures" is included in `stylistic`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/array-type/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic.ts
     *
     * The default value is `array`. We choose `array-simple` because it makes complicated arrays a
     * lot easier to understand. This is worth the cost of deviating from the base rule
     * configuration.
     */
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
      },
    ],

    // [I] "@typescript-eslint/await-thenable" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/ban-ts-comment" is included in `recommended`.

    // [I] "@typescript-eslint/ban-tslint-comment" is included in `stylistic`.

    // [I] "@typescript-eslint/ban-types" is included in `recommended`.

    // [I] "@typescript-eslint/class-literal-property-style" is included in `stylistic`.

    // [I] "@typescript-eslint/consistent-generic-constructors" is included in `stylistic`.

    // [I] "@typescript-eslint/consistent-indexed-object-style" is included in `stylistic`.

    // [I] "@typescript-eslint/consistent-type-assertions" is included in `stylistic`.

    // [I] "@typescript-eslint/consistent-type-definitions" is included in `stylistic`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/consistent-type-exports/
     *
     * Not defined in the parent configs.
     *
     * Recommended as per Josh Goldberg:
     * https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
     */
    "@typescript-eslint/consistent-type-exports": "error",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/consistent-type-imports/
     *
     * Not defined in the parent configs.
     *
     * Recommended as per Josh Goldberg:
     * https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
     */
    "@typescript-eslint/consistent-type-imports": "error",

    // [X] "@typescript-eslint/explicit-function-return-type" is not enabled since it would be
    // cumbersome to require it for non-exported functions.

    // [X] "@typescript-eslint/explicit-member-accessibility" is not enabled since many programs may
    // have internal-only classes that would not benefit from an explicit public/private
    // distinction.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/explicit-module-boundary-types/
     *
     * Not defined in the parent configs.
     *
     * Specifying explicit return types can help prevent bugs. It also speeds up the type checker.
     * However, we only require it on exported functions.
     */
    "@typescript-eslint/explicit-module-boundary-types": "error",

    // [X] "@typescript-eslint/member-delimiter-style" is not enabled since it is automatically
    // handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/member-ordering" is not enabled since prescribed class ordering is
    // too project-dependant.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/method-signature-style/
     *
     * Not defined in the parent configs.
     *
     * Ensure that interfaces are declared in a consistent way.
     */
    "@typescript-eslint/method-signature-style": "error",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/naming-convention/
     *
     * Not defined in the parent configs.
     *
     * We copy the Airbnb config but slightly modify it to allow for a leading underscore, which
     * signifies that it is temporarily not being used.
     */
    "@typescript-eslint/naming-convention": [
      "error",
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables
      // (23.10).
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8).
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make
      // TypeScript recommendations, we are assuming this rule would similarly apply to anything
      // "type like", including interfaces, type aliases, and enums.
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],

    // [I] "@typescript-eslint/no-base-to-string" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-confusing-non-null-assertion" is included in `stylistic`.

    // [I] "@typescript-eslint/no-confusing-void-expression" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/no-duplicate-enum-values" is included in `recommended`.

    // [I] "@typescript-eslint/no-duplicate-type-constituents" is provided by
    // `recommended-type-checked`.

    // [I] "@typescript-eslint/no-dynamic-delete" is included in `strict`.

    // [I] "@typescript-eslint/no-empty-interface" is included in `stylistic`.

    // [I] "@typescript-eslint/no-explicit-any" is included in `recommended`.

    // [I] "@typescript-eslint/no-extra-non-null-assertion" is included in `recommended`.

    // [I] "@typescript-eslint/no-extraneous-class" is included in `strict`.

    // [I] "@typescript-eslint/no-floating-promises" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-for-in-array" is included in `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-import-type-side-effects/
     *
     * Not defined in the parent configs.
     *
     * Recommended as per Josh Goldberg:
     * https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
     */
    "@typescript-eslint/no-import-type-side-effects": "error",

    // [I] "@typescript-eslint/no-inferrable-types" is included in `stylistic`.

    // [I] "@typescript-eslint/no-invalid-void-type" is included in `strict`.

    // [I] "@typescript-eslint/no-meaningless-void-operator" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/no-misused-new" is included in `recommended`.

    // [I] "@typescript-eslint/no-misused-promises" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-mixed-enums" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/no-namespace" is included in `recommended`.

    // [I] "@typescript-eslint/no-non-null-asserted-nullish-coalescing" is included in `strict`.

    // [I] "@typescript-eslint/no-non-null-asserted-optional-chain" is included in `recommended`.

    // [I] "@typescript-eslint/no-non-null-assertion" is included in `strict`.

    // [I] "@typescript-eslint/no-redundant-type-constituents" is provided by
    // `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-require-imports/
     *
     * Not defined in the parent configs.
     *
     * Enforce the use of modern ES6-style imports.
     */
    "@typescript-eslint/no-require-imports": "error",

    // [I] "@typescript-eslint/no-this-alias" is included in `recommended`.

    // [I] "@typescript-eslint/no-type-alias" is not enabled since it is deprecated.

    // [I] "@typescript-eslint/no-unnecessary-boolean-literal-compare" is provided by
    // `strict-type-checked`.

    // [I] "@typescript-eslint/no-unnecessary-condition" is included in `strict-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-unnecessary-qualifier/
     *
     * Not defined in the parent configs.
     *
     * Disallow unnecessary namespace qualifiers, which makes code more consistent.
     */
    "@typescript-eslint/no-unnecessary-qualifier": "error",

    // [I] "@typescript-eslint/no-unnecessary-type-arguments" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/no-unnecessary-type-assertion" is provided by
    // `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unnecessary-type-constraint" is included in `recommended`.

    // [I] "@typescript-eslint/no-unsafe-argument" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unsafe-assignment" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unsafe-call" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unsafe-declaration-merging" is included in `recommended`.

    // [I] "@typescript-eslint/no-unsafe-enum-comparison" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unsafe-member-access" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/no-unsafe-return" is included in `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-useless-empty-export/
     *
     * Not defined in the parent configs.
     *
     * Disallow empty exports, which are a sign of a bug.
     */
    "@typescript-eslint/no-useless-empty-export": "error",

    // [I] "@typescript-eslint/no-var-requires" is included in `recommended`.

    // [I] "@typescript-eslint/non-nullable-type-assertion-style" is provided by
    // `stylistic-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/parameter-properties/
     *
     * Not defined in the parent configs.
     *
     * Disallow parameter property shorthand, which make code confusing to read.
     */
    "@typescript-eslint/parameter-properties": "error",

    // [I] "@typescript-eslint/prefer-as-const" is included in `recommended`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/prefer-enum-initializers/
     *
     * Not defined in the parent configs.
     *
     * We disallow enum initializers since we want to prefer string enums over number enums. (Number
     * enums in TypeScript are not as safe as string enums.)
     */
    "@typescript-eslint/prefer-enum-initializers": "error",

    // [I] "@typescript-eslint/prefer-for-of" is included in `stylistic`.

    // [I] "@typescript-eslint/prefer-function-type" is included in `stylistic`.

    // [I] "@typescript-eslint/prefer-includes" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/prefer-literal-enum-member" is included in `strict`.

    // [I] "@typescript-eslint/prefer-namespace-keyword" is included in `stylistic`.

    // [I] "@typescript-eslint/prefer-nullish-coalescing" is included in `stylistic-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/prefer-optional-chain/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
     *
     * This can modify the type of boolean declarations to `boolean | undefined`, which is undesired
     * in some circumstances:
     * https://github.com/typescript-eslint/typescript-eslint/issues/5269
     */
    "@typescript-eslint/prefer-optional-chain": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/prefer-readonly/
     *
     * Not defined in the parent configs.
     *
     * Make private class members safer where possible.
     */
    "@typescript-eslint/prefer-readonly": "error",

    // [X] "@typescript-eslint/prefer-readonly-parameter-types" is not enabled since it can
    // obfuscate the intended input types of a function.

    // [I] "@typescript-eslint/prefer-reduce-type-parameter" is included in `strict-type-checked`.

    // [X] "@typescript-eslint/prefer-regexp-exec" is not enabled since using the `String.match`
    // form might make code easier to read.

    // [I] "@typescript-eslint/prefer-return-this-type" is included in `strict-type-checked`.

    // [I] "@typescript-eslint/prefer-string-starts-ends-with" is provided by
    // `stylistic-type-checked`.

    // [I] "@typescript-eslint/prefer-ts-expect-error" is included in `strict`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/promise-function-async/
     *
     * Not defined in the parent configs.
     *
     * Prevent mistakes with colored functions.
     */
    "@typescript-eslint/promise-function-async": "error",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/require-array-sort-compare/
     *
     * Not defined in the parent configs.
     *
     * This prevents bugs with the JavaScript implementation of sort.
     */
    "@typescript-eslint/require-array-sort-compare": "error",

    // [I] "@typescript-eslint/restrict-plus-operands" is included in `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/restrict-template-expressions/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts
     *
     * This rule disallows booleans and nulls in template expressions. However, a common use-case of
     * template strings is to coerce everything to a string.
     */
    "@typescript-eslint/restrict-template-expressions": "off",

    // [X] "@typescript-eslint/sort-type-constituents" is not enabled since in it does not make
    // sense to sort a union alphabetically in a lot of cases.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/strict-boolean-expressions/
     *
     * Not defined in the parent configs.
     *
     * This rule prevents bugs when refactoring a boolean to a number.
     */
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowNullableEnum: false,
        allowAny: false,
        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/switch-exhaustiveness-check/
     *
     * Not defined in the parent configs.
     *
     * This rule ensures type-safety with switch statements, which can be especially helpful when
     * values are added or removed from an enum.
     */
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // [I] "@typescript-eslint/triple-slash-reference" is included in `recommended`.

    // [X] "@typescript-eslint/type-annotation-spacing" is not enabled since it is automatically
    // handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/typedef" is not enabled since it is not recommended by the
    // `typescript-eslint` team. (They recommend using the `noImplicitAny` and
    // `strictPropertyInitialization` TypeScript compiler options instead.)

    // [I] "@typescript-eslint/unbound-method" is included in `recommended-type-checked`.

    // [I] "@typescript-eslint/unified-signatures" is included in `strict`.

    // ---------------
    // Extension Rules
    // ---------------

    // [X] "@typescript-eslint/block-spacing" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/brace-style" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/class-methods-use-this
     *
     * Not enabled in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses the default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     */
    "class-methods-use-this": "off",
    "@typescript-eslint/class-methods-use-this": "error",

    // [X] "@typescript-eslint/comma-dangle" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/comma-spacing" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/default-param-last/
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     * https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js
     */
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",

    // [I] "@typescript-eslint/dot-notation" is included in `stylistic-type-checked`.

    // [X] "@typescript-eslint/func-call-spacing" is not enabled since it is automatically handled
    // by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/indent" is not enabled since it is automatically handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/init-declarations" is not enabled since it is superfluous to require
    // an `= undefined` during variable initialization (and TypeScript will take care of the
    // non-undefined cases).

    // [X] "@typescript-eslint/key-spacing" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/keyword-spacing" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/lines-around-comment/
     *
     * Not defined in the parent configs.
     *
     * This enforce newlines around comments for better readability. Note that even though the
     * `typescript-eslint` team does not recommend using formatting rules, this rule is not handled
     * by Prettier, so we must use ESLint to enforce it.
     */
    "lines-around-comment": "off",
    "@typescript-eslint/lines-around-comment": [
      "error",
      {
        // All of these properties default to false.
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true,
        allowEnumStart: true,
        allowInterfaceStart: true,
        allowModuleStart: true,
        allowTypeStart: true,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/lines-between-class-members/
     *
     * Not defined in the parent configs.
     *
     * This enforce newlines between class members for better readability. Note that even though the
     * `typescript-eslint` team does not recommend using formatting rules, this rule is not handled
     * by Prettier, so we must use ESLint to enforce it.
     */
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],

    // [I] "@typescript-eslint/no-array-constructor" is included in `recommended`.

    // [X] "@typescript-eslint/no-dupe-class-members" is not enabled since it is superfluous when
    // using TypeScript according to the ESLint documentation:
    // https://eslint.org/docs/latest/rules/no-dupe-class-members#when-not-to-use-it

    // [I] "@typescript-eslint/no-empty-function" is included in `stylistic`.

    // [X] "@typescript-eslint/no-extra-parens" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/no-extra-semi" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [I] "@typescript-eslint/no-implied-eval" is included in `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-invalid-this/
     *
     * Not defined in the parent configs.
     *
     * We specify `false` for `capIsConstructor` since this is only for legacy constructors.
     */
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": [
      "error",
      {
        capIsConstructor: false,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-loop-func/
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     * https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js
     */
    "no-loop-func": "off",
    "@typescript-eslint/no-loop-func": "error",

    // [I] "@typescript-eslint/no-loss-of-precision" is included in `recommended`.

    // [X] "@typescript-eslint/no-magic-numbers" is not enabled since it results in too many false
    // positives.

    // [X] "@typescript-eslint/no-redeclare" is not enabled since it is handled by the combination
    // of the TypeScript compiler and the "no-var" ESLint rule.

    // [X] "@typescript-eslint/no-restricted-imports" is not enabled since it would only be needed
    // in specific environments (such as forbidding Node.js imports in a browser environment).

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-shadow/
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb does not provide any
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
     * https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js
     */
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",

    // [I] "@typescript-eslint/no-throw-literal" is included in `strict-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-unused-expressions/
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses all default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     * https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js
     */
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-unused-vars/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
     *
     * We want to lint unused arguments (the default is "after-used"). We also want to ignore
     * arguments/variables that start with an underscore. This matches the behavior of the
     * TypeScript compiler flag "--noUnusedLocals".
     */
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all", // "after-used" is the default.
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    // [X] "@typescript-eslint/no-use-before-define" is not enabled because it allows code to be
    // structured in a more logical order.

    // [I] "@typescript-eslint/no-useless-constructor" is included in `strict`.

    // [X] "@typescript-eslint/object-curly-spacing" is not enabled since it is automatically
    // handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/padding-line-between-statements" is not enabled since it is for
    // inserting extra newlines between specific kinds of statements, which would be
    // project-dependant. (This kind of formatting is not handled by Prettier.)

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/quotes/
     *
     * Defined at:
     * https://github.com/prettier/eslint-config-prettier/blob/main/%40typescript-eslint.js
     *
     * In order to forbid unnecessary backticks, we must re-enable the "@typescript-eslint/quotes"
     * rule as specified in the `eslint-config-prettier` documentation:
     * https://github.com/prettier/eslint-config-prettier#enforce-backticks
     */
    quotes: "off",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],

    // [I] "@typescript-eslint/require-await" is included in `recommended-type-checked`.

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/return-await/
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb does not specify any
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     * https://raw.githubusercontent.com/iamturns/eslint-config-airbnb-typescript/master/lib/shared.js
     */
    "no-return-await": "off", // The base rule has a different name for some reason.
    "@typescript-eslint/return-await": "error",

    // [X] "@typescript-eslint/semi" is not enabled since it is automatically handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/space-before-blocks" is not enabled since it is automatically handled
    // by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/space-before-function-paren" is not enabled since it is automatically
    // handled by Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js

    // [X] "@typescript-eslint/space-infix-ops" is not enabled since it is automatically handled by
    // Prettier:
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js
  },

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        // From this file:
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",

        // From `recommended-type-checked`:
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};

module.exports = config;
