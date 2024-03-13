// This ESLint config only contains built-in rules from ESLint itself:
// https://eslint.org/docs/latest/rules/

const confusingBrowserGlobals = require("confusing-browser-globals");

// Rules are separated into categories:
// 1) Possible Problems
// 2) Suggestions
// 3) Layout & Formatting

/** @type {import("eslint").Linter.RulesRecord} */
const POSSIBLE_PROBLEMS = {
  /** The `checkForEach` option is enabled to make the rule stricter. */
  "array-callback-return": [
    "error",
    {
      checkForEach: true,
    },
  ],

  "constructor-super": "off", // @typescript-eslint/eslint-recommended
  "for-direction": "error",
  "getter-return": "off", // @typescript-eslint/eslint-recommended
  "no-async-promise-executor": "error",
  "no-await-in-loop": "error",
  "no-class-assign": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-const-assign": "off", // @typescript-eslint/eslint-recommended
  "no-constant-binary-expression": "error",
  "no-constant-condition": "error",
  "no-constructor-return": "error",
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-dupe-args": "off", // @typescript-eslint/eslint-recommended
  "no-dupe-class-members": "off", // @typescript-eslint/eslint-recommended
  "no-dupe-else-if": "error",
  "no-dupe-keys": "off", // @typescript-eslint/eslint-recommended
  "no-duplicate-case": "error",

  /**
   * Superseded by the `import/no-duplicates` rule (which is provided by the `import/recommended`
   * config).
   */
  "no-duplicate-imports": "off",

  "no-empty-character-class": "error",
  "no-empty-pattern": "error",
  "no-ex-assign": "error",
  "no-fallthrough": "error",
  "no-func-assign": "off", // @typescript-eslint/eslint-recommended
  "no-import-assign": "off", // @typescript-eslint/eslint-recommended
  "no-inner-declarations": "error",
  "no-invalid-regexp": "error",
  "no-irregular-whitespace": "error",

  /** Superseded by the `@typescript-eslint/no-loss-of-precision` rule. */
  "no-loss-of-precision": "off",

  "no-misleading-character-class": "error",
  "no-new-native-nonconstructor": "error",
  "no-new-symbol": "off", // @typescript-eslint/eslint-recommended
  "no-obj-calls": "off", // @typescript-eslint/eslint-recommended`
  "no-promise-executor-return": "error",
  "no-prototype-builtins": "error",
  "no-self-assign": "error",
  "no-self-compare": "error",
  "no-setter-return": "off", // @typescript-eslint/eslint-recommended
  "no-sparse-arrays": "error",
  "no-template-curly-in-string": "error",
  "no-this-before-super": "off", // @typescript-eslint/eslint-recommended`
  "no-undef": "off", // @typescript-eslint/eslint-recommended
  "no-unexpected-multiline": "off", // eslint-config-prettier
  "no-unmodified-loop-condition": "error",
  "no-unreachable": "off", // @typescript-eslint/eslint-recommended
  "no-unreachable-loop": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": "off", // @typescript-eslint/eslint-recommended
  "no-unsafe-optional-chaining": "error",
  "no-unused-private-class-members": "error",

  /** Superseded by the `@typescript-eslint/no-unused-vars` rule. */
  "no-unused-vars": "off",

  /** Superseded by the `@typescript-eslint/no-use-before-define` rule. */
  "no-use-before-define": "off",

  "no-useless-backreference": "error",

  /**
   * Disabled since [Airbnb reports that the rule is "very
   * buggy"](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js).
   */
  "require-atomic-updates": "off",

  "use-isnan": "error",
  "valid-typeof": "error",
};

/** @type {import("eslint").Linter.RulesRecord} */
const SUGGESTIONS = {
  "accessor-pairs": "error",
  "arrow-body-style": "error",
  "block-scoped-var": "error",

  /**
   * Superseded by the `@typescript-eslint/naming-convention` rule. (`camelcase` is used to enforce
   * naming conventions.)
   */
  camelcase: "off",

  /**
   * Superseded by the `isaacscript/complete-sentences-jsdoc` and
   * `isaacscript/complete-sentences-line-comments` rules.
   */
  "capitalized-comments": "off",

  /** Superseded by the `@typescript-eslint/class-methods-use-this` rule. */
  "class-methods-use-this": "off",

  /**
   * Disabled since cyclomatic complexity is not a good enough general indicator of code complexity
   * and leads to too many false positives.
   */
  complexity: "off",

  /** Superseded by the `@typescript-eslint/consistent-return` rule. */
  "consistent-return": "off",

  "consistent-this": "error",

  /**
   * Always requiring curly braces can partially ward against [Apple-style if statement
   * bugs](https://www.imperialviolet.org/2014/02/22/applebug.html). Additionally, this rule needs
   * to be set to "all" to [work properly with
   * `eslint-prettier-config`](https://github.com/prettier/eslint-config-prettier#curly).
   */
  curly: ["error", "all"],

  /**
   * Disabled since it would cause the `@typescript-eslint/switch-exhaustiveness-check` rule to not
   * work properly.
   */
  "default-case": "off",

  "default-case-last": "error",

  /** Superseded by the `@typescript-eslint/default-param-last` rule. */
  "default-param-last": "off",

  /** Superseded by the `@typescript-eslint/dot-notation` rule. */
  "dot-notation": "off",

  /** Superseded by the `isaacscript/eqeqeq-fix` rule. */
  eqeqeq: "off",

  "func-name-matching": "error",
  "func-names": "error",

  /**
   * Disabled since it is common in the TypeScript ecosystem to use both function forms, depending
   * on the situation.
   */
  "func-style": "off",

  "grouped-accessor-pairs": "error",

  /** Superseded by the `isaacscript/no-for-in` rule. */
  "guard-for-in": "off",

  /** Disabled since it is expected to be configured with project-specific keywords. */
  "id-denylist": "off",

  /** Disabled because short variable names are understandable in many contexts. */
  "id-length": "off",

  /**
   * Superseded by the `@typescript-eslint/naming-convention` rule. (`id-match` is used to enforce
   * naming conventions.)
   */
  "id-match": "off",

  /** Superseded by the `@typescript-eslint/init-declarations` rule. */
  "init-declarations": "off",

  /** The `enforceForIfStatements` option is enabled to make the rule stricter. */
  "logical-assignment-operators": [
    "error",
    "always",
    {
      enforceForIfStatements: true,
    },
  ],

  "max-classes-per-file": "error",

  /** Disabled since this rule is too prescriptive for general-purpose use. */
  "max-depth": "off",

  /**
   * Disabled because enforcing an arbitrary line threshold for every file in a project does not
   * provide much value.
   */
  "max-lines": "off",

  /**
   * Disabled because enforcing an arbitrary line threshold for every function in a project does not
   * provide much value.
   */
  "max-lines-per-function": "off",

  "max-nested-callbacks": "error",

  /** Superseded by the `@typescript-eslint/max-params` rule. */
  "max-params": "off",

  /**
   * Disabled because enforcing an arbitrary statement threshold for every function in a project
   * does not provide much value.
   */
  "max-statements": "off",

  /** Disabled because it is conventional to use both kinds of comments in TypeScript projects. */
  "multiline-comment-style": "off",

  "new-cap": "error",
  "no-alert": "error",

  /** Superseded by the `@typescript-eslint/no-array-constructor` rule. */
  "no-array-constructor": "off",

  "no-bitwise": "error",
  "no-caller": "error",
  "no-case-declarations": "error",
  "no-confusing-arrow": "off", // eslint-config-prettier

  /**
   * Disabled because command-line programs written in TypeScript commonly write to standard out and
   * standard error.
   */
  "no-console": "off",

  /**
   * Disabled because proper use of continues can reduce indentation for long blocks of code in the
   * same way as the [early return
   * pattern](https://medium.com/swlh/return-early-pattern-3d18a41bba8).
   */
  "no-continue": "off",

  "no-delete-var": "error",

  /** Disabled since it is incompatible with the `unicorn/better-regex` rule. */
  "no-div-regex": "off",

  /** The `allowElseIf` option is disabled to make the rule stricter. */
  "no-else-return": [
    "error",
    {
      allowElseIf: false,
    },
  ],

  "no-empty": "error",

  /** Superseded by the `@typescript-eslint/no-empty-function` rule. */
  "no-empty-function": "off",

  "no-empty-static-block": "error",
  "no-eq-null": "error",
  "no-eval": "error",
  "no-extend-native": "error",
  "no-extra-bind": "error",
  "no-extra-boolean-cast": "error",
  "no-extra-label": "error",

  /** Superseded by the `@typescript-eslint/no-extra-semi` rule. */
  "no-extra-semi": "off",

  "no-floating-decimal": "off", // eslint-config-prettier
  "no-global-assign": "error",
  "no-implicit-coercion": "error",
  "no-implicit-globals": "error",

  /** Superseded by the `@typescript-eslint/no-implied-eval` rule. */
  "no-implied-eval": "off",

  /** Disabled because inline comments are common in the TypeScript ecosystem. */
  "no-inline-comments": "off",

  /** Superseded by the `@typescript-eslint/no-invalid-this` rule. */
  "no-invalid-this": "off",

  "no-iterator": "error",
  "no-label-var": "error",
  "no-labels": "error",
  "no-lone-blocks": "error",
  "no-lonely-if": "error",

  /** Superseded by the `@typescript-eslint/no-loop-func` rule. */
  "no-loop-func": "off",

  /** Superseded by the `@typescript-eslint/no-magic-numbers` rule. */
  "no-magic-numbers": "off",

  "no-mixed-operators": "off", // eslint-config-prettier
  "no-multi-assign": "error",
  "no-multi-str": "error",

  /** Superseded by the `unicorn/no-negated-condition` rule. */
  "no-negated-condition": "off",

  /**
   * `unicorn/no-nested-ternary` is a modified version of this rule but that version is less strict.
   */
  "no-nested-ternary": "error",

  "no-new": "error",
  "no-new-func": "error",
  "no-new-wrappers": "error",
  "no-nonoctal-decimal-escape": "error",
  "no-object-constructor": "error",
  "no-octal": "error",
  "no-octal-escape": "error",

  /**
   * The options are [copied from
   * Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js).
   */
  "no-param-reassign": [
    "error",
    {
      props: true,
      ignorePropertyModificationsFor: [
        "acc", // for reduce accumulators
        "accumulator", // for reduce accumulators
        "e", // for e.returnvalue
        "ctx", // for Koa routing
        "context", // for Koa routing
        "req", // for Express requests
        "request", // for Express requests
        "res", // for Express responses
        "response", // for Express responses
        "$scope", // for Angular 1 scopes
        "staticContext", // for ReactRouter context
      ],
    },
  ],

  /**
   * Disabled because the rule is unnecessary when using Prettier. (Unary operators can lead to
   * errors with minified code, but Prettier adds semicolons automatically.)
   */
  "no-plusplus": "off",

  "no-proto": "error",

  /** Superseded by the `@typescript-eslint/block-spacing` rule. */
  "no-redeclare": "off",

  "no-regex-spaces": "error",

  /**
   * The options are [copied from
   * Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js).
   */
  "no-restricted-exports": [
    "error",
    {
      restrictedNamedExports: [
        "default", // use `export default` to provide a default export
        "then", // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
      ],
    },
  ],

  /**
   * The options are [copied from
   * Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js).
   */
  "no-restricted-globals": [
    "error",
    {
      name: "isFinite",
      message:
        "Use Number.isFinite instead: https://github.com/airbnb/javascript#standard-library--isfinite",
    },
    {
      name: "isNaN",
      message:
        "Use Number.isNaN instead: https://github.com/airbnb/javascript#standard-library--isnan",
    },
    ...confusingBrowserGlobals,
  ],

  /** Superseded by the `@typescript-eslint/no-restricted-imports` rule. */
  "no-restricted-imports": "off",

  /**
   * The options are [copied from
   * Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js).
   */
  "no-restricted-properties": [
    "error",
    {
      object: "arguments",
      property: "callee",
      message: "arguments.callee is deprecated",
    },
    {
      object: "global",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "self",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "window",
      property: "isFinite",
      message: "Please use Number.isFinite instead",
    },
    {
      object: "global",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      object: "self",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      object: "window",
      property: "isNaN",
      message: "Please use Number.isNaN instead",
    },
    {
      property: "__defineGetter__",
      message: "Please use Object.defineProperty instead.",
    },
    {
      property: "__defineSetter__",
      message: "Please use Object.defineProperty instead.",
    },
    {
      object: "Math",
      property: "pow",
      message: "Use the exponentiation operator (**) instead.",
    },
  ],

  /** Disabled because it is intended for disallowing specific language features per-project. */
  "no-restricted-syntax": "off",

  /** The `always` option is provided to make the rule stricter. */
  "no-return-assign": ["error", "always"],

  "no-script-url": "error",

  /**
   * Disabled because [it can conflict with
   * Prettier](https://github.com/prettier/eslint-config-prettier/tree/main#no-sequences).
   */
  "no-sequences": "off",

  /** Superseded by the `@typescript-eslint/no-shadow` rule. */
  "no-shadow": "off",

  "no-shadow-restricted-names": "error",

  /**
   * Disabled because ternaries are common in the TypeScript ecosystem and can often lead to concise
   * code that is easy to read.
   */
  "no-ternary": "off",

  /** Superseded by the `@typescript-eslint/no-throw-literal` rule. */
  "no-throw-literal": "off",

  "no-undef-init": "error",

  /**
   * Disabled because in TypeScript, it is common to explicitly check for undefined for the purposes
   * of type narrowing.
   */
  "no-undefined": "off",

  /**
   * Disabled since it is a common pattern to use underscores to temporarily allow unused variables
   * during development.
   */
  "no-underscore-dangle": "off",

  /** The `defaultAssignment` option is disabled to make the rule stricter. */
  "no-unneeded-ternary": [
    "error",
    {
      defaultAssignment: false,
    },
  ],

  /** Superseded by the `@typescript-eslint/no-unused-expressions` rule. */
  "no-unused-expressions": "off",

  "no-unused-labels": "error",
  "no-useless-call": "error",
  "no-useless-catch": "error",

  /** The `enforceForClassMembers` option is enabled to make the rule stricter. */
  "no-useless-computed-key": [
    "error",
    {
      enforceForClassMembers: true,
    },
  ],

  "no-useless-concat": "error",

  /** Superseded by the `@typescript-eslint/no-useless-constructor` rule. */
  "no-useless-constructor": "off",

  "no-useless-escape": "error",
  "no-useless-rename": "error",

  /**
   * Superseded by the `no-autofix/no-useless-return` rule (since the autofix is usually unwanted).
   */
  "no-useless-return": "off",

  "no-var": "error",
  "no-void": "error",

  /** Superseded by the `unicorn/expiring-todo-comments` rule. */
  "no-warning-comments": "off",

  "no-with": "error",

  /** The `ignoreConstructors` option is disabled to make the rule stricter. */
  "object-shorthand": [
    "error",
    "always",
    {
      ignoreConstructors: false,
    },
  ],

  /**
   * The `never` option is provided to disallow multi-variable declarations (since they can be
   * confusing).
   */
  "one-var": ["error", "never"],

  "one-var-declaration-per-line": "off", // eslint-config-prettier
  "operator-assignment": "error",
  "prefer-arrow-callback": "error",

  /** Superseded by the `no-autofix/prefer-const` rule (since the autofix is usually unwanted). */
  "prefer-const": "off",

  /** Superseded by the `@typescript-eslint/prefer-destructuring` rule. */
  "prefer-destructuring": "off",

  "prefer-exponentiation-operator": "error",

  /**
   * Disabled because it is common to have a regex with only a single match, in which case a named
   * capture group can be needlessly verbose (and cause extra type narrowing).
   */
  "prefer-named-capture-group": "off",

  "prefer-numeric-literals": "error",
  "prefer-object-has-own": "error",
  "prefer-object-spread": "error",

  /** Superseded by the `@typescript-eslint/prefer-promise-reject-errors` rule. */
  "prefer-promise-reject-errors": "off",

  /** The `disallowRedundantWrapping` option is enabled to make the rule stricter. */
  "prefer-regex-literals": [
    "error",
    {
      disallowRedundantWrapping: true,
    },
  ],

  "prefer-rest-params": "error",
  "prefer-spread": "error",
  "prefer-template": "error",
  "quote-props": "off", // eslint-config-prettier
  radix: "error",

  /** Superseded by the `@typescript-eslint/require-await` rule. */
  "require-await": "off",

  /**
   * Disabled because requiring the `u` or the `v` flag for ASCII text is verbose and cumbersome.
   * (Even though these flags would also enable regex strict mode, the marginal benefit is not worth
   * the verbosity.)
   */
  "require-unicode-regexp": "off",

  "require-yield": "error",

  /** Disabled since this is automatically handled by `prettier-plugin-organize-imports`. */
  "sort-imports": "off",

  /** Disabled because object keys are often not meant to be sorted in alphabetical order. */
  "sort-keys": "off",

  /**
   * Disabled because variable declarations are often not meant to be sorted in alphabetical order.
   */
  "sort-vars": "off",

  /**
   * Partially superseded by `isaacscript/format-jsdoc-comments` and
   * `isaacscript/format-line-comments`, but those rules do not handle trailing line comments.
   *
   * The `markers` option is provided to make this rule ignore lines that start with "///".
   */
  "spaced-comment": [
    "error",
    "always",
    {
      markers: ["/"],
    },
  ],

  /** The `never` option is provided to make the rule stricter. */
  strict: ["error", "never"],

  "symbol-description": "error",
  "vars-on-top": "error",
  yoda: "error",
};

/** @type {import("eslint").Linter.RulesRecord} */
const LAYOUT_AND_FORMATTING = {
  "array-bracket-newline": "off", // eslint-config-prettier
  "array-bracket-spacing": "off", // eslint-config-prettier
  "array-element-newline": "off", // eslint-config-prettier
  "arrow-parens": "off", // eslint-config-prettier
  "arrow-spacing": "off", // eslint-config-prettier
  "block-spacing": "off", // eslint-config-prettier
  "brace-style": "off", // eslint-config-prettier
  "comma-dangle": "off", // eslint-config-prettier
  "comma-spacing": "off", // eslint-config-prettier
  "comma-style": "off", // eslint-config-prettier
  "computed-property-spacing": "off", // eslint-config-prettier
  "dot-location": "off", // eslint-config-prettier
  "eol-last": "off", // eslint-config-prettier
  "func-call-spacing": "off", // eslint-config-prettier
  "function-call-argument-newline": "off", // eslint-config-prettier
  "function-paren-newline": "off", // eslint-config-prettier
  "generator-star-spacing": "off", // eslint-config-prettier
  "implicit-arrow-linebreak": "off", // eslint-config-prettier
  indent: "off", // eslint-config-prettier
  "jsx-quotes": "off", // eslint-config-prettier
  "key-spacing": "off", // eslint-config-prettier
  "keyword-spacing": "off", // eslint-config-prettier

  /** Disabled since it is common in the TypeScript ecosystem to use both types of comments. */
  "line-comment-position": "off",

  "linebreak-style": "off", // eslint-config-prettier
  "lines-around-comment": "off", // eslint-config-prettier

  /** Superseded by the `@typescript-eslint/lines-between-class-members` rule. */
  "lines-between-class-members": "off",

  "max-len": "off", // eslint-config-prettier
  "max-statements-per-line": "off", // eslint-config-prettier
  "multiline-ternary": "off", // eslint-config-prettier
  "new-parens": "off", // eslint-config-prettier
  "newline-per-chained-call": "off", // eslint-config-prettier
  "no-extra-parens": "off", // eslint-config-prettier
  "no-mixed-spaces-and-tabs": "off", // eslint-config-prettier
  "no-multi-spaces": "off", // eslint-config-prettier
  "no-multiple-empty-lines": "off", // eslint-config-prettier
  "no-tabs": "off", // eslint-config-prettier
  "no-trailing-spaces": "off", // eslint-config-prettier
  "no-whitespace-before-property": "off", // eslint-config-prettier
  "nonblock-statement-body-position": "off", // eslint-config-prettier
  "object-curly-newline": "off", // eslint-config-prettier
  "object-curly-spacing": "off", // eslint-config-prettier
  "object-property-newline": "off", // eslint-config-prettier
  "operator-linebreak": "off", // eslint-config-prettier
  "padded-blocks": "off", // eslint-config-prettier

  /** Superseded by the `@typescript-eslint/padding-line-between-statements` rule. */
  "padding-line-between-statements": "off",

  quotes: "off", // eslint-config-prettier
  "rest-spread-spacing": "off", // eslint-config-prettier
  semi: "off", // eslint-config-prettier
  "semi-spacing": "off", // eslint-config-prettier
  "semi-style": "off", // eslint-config-prettier
  "space-before-blocks": "off", // eslint-config-prettier
  "space-before-function-paren": "off", // eslint-config-prettier
  "space-in-parens": "off", // eslint-config-prettier
  "space-infix-ops": "off", // eslint-config-prettier
  "space-unary-ops": "off", // eslint-config-prettier
  "switch-colon-spacing": "off", // eslint-config-prettier
  "template-curly-spacing": "off", // eslint-config-prettier
  "template-tag-spacing": "off", // eslint-config-prettier
  "unicode-bom": "error",
  "wrap-iife": "off", // eslint-config-prettier
  "wrap-regex": "off", // eslint-config-prettier
  "yield-star-spacing": "off", // eslint-config-prettier
};

/** @type {import("eslint").Linter.Config} */
const config = {
  rules: {
    ...POSSIBLE_PROBLEMS,
    ...SUGGESTIONS,
    ...LAYOUT_AND_FORMATTING,
  },
};

module.exports = config;
