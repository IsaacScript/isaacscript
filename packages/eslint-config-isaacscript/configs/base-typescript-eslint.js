import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `@typescript-eslint/eslint-plugin`:
 * https://typescript-eslint.io/rules/
 *
 * Rules are separated into categories:
 * 1) Supported Rules
 * 2) Extension Rules
 */
export const baseTypeScriptESLint = tseslint.config(
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },

    // We need to provide some special configuration to ESLint in order for it to parse TypeScript
    // files. From:
    // https://typescript-eslint.io/packages/typescript-eslint/#advanced-usage
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",

        // Recommended as per the official documentation:
        // https://typescript-eslint.io/getting-started/typed-linting
        project: true,

        // Needed for `eslint-plugin-import` to work properly:
        // https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
        ecmaVersion: "latest",
      },
    },

    rules: {
      "@typescript-eslint/adjacent-overload-signatures": "warn",

      /**
       * The default value is `array`. We choose `array-simple` because it makes complicated arrays
       * easier to understand. This is worth the cost of deviating from the base rule configuration.
       */
      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array-simple",
        },
      ],

      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/ban-tslint-comment": "warn",
      "@typescript-eslint/ban-types": "warn",
      "@typescript-eslint/class-literal-property-style": "warn",
      "@typescript-eslint/consistent-generic-constructors": "warn",
      "@typescript-eslint/consistent-indexed-object-style": "warn",
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/consistent-type-definitions": "warn",
      "@typescript-eslint/consistent-type-exports": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",

      /**
       * Disabled since it would be to cumbersome to require return types for non-exported
       * functions. (It is more reasonable to require it for exported functions only, since it
       * speeds up the type-checker in large codebases.)
       */
      "@typescript-eslint/explicit-function-return-type": "off",

      /**
       * Disabled since many programs may have internal-only classes that would not benefit from an
       * explicit public/private distinction.
       */
      "@typescript-eslint/explicit-member-accessibility": "off",

      "@typescript-eslint/explicit-module-boundary-types": "warn",

      /**
       * Disabled because enforcing an arbitrary parameter number threshold for every function in a
       * project does not provide much value. (Additionally, using TypeScript reduces the value of
       * such a check.)
       */
      "@typescript-eslint/max-params": "off",

      "@typescript-eslint/member-delimiter-style": "off", // eslint-config-prettier

      /** Disabled since prescribed class ordering is too project-specific. */
      "@typescript-eslint/member-ordering": "off",

      "@typescript-eslint/method-signature-style": "warn",

      /**
       * The options are [copied from
       * Airbnb](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js).
       * We also allow a leading underscore, which signifies that the element is temporarily not
       * being used.
       */
      "@typescript-eslint/naming-convention": [
        "warn",
        // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables
        // (23.10).
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          // Make an exception for redeclaring CJS variables, which is necessary because they cannot
          // be replaced with `import.meta.dirname` while the ESLint server still uses an old
          // version of NodeJS. (This was last tested on August 4th, 2024.)
          filter: {
            regex: "^(__filename|__dirname)$",
            match: false,
          },
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
          leadingUnderscore: "allow",
        },
      ],

      "@typescript-eslint/no-base-to-string": "warn",
      "@typescript-eslint/no-confusing-non-null-assertion": "warn",
      "@typescript-eslint/no-confusing-void-expression": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "warn",
      "@typescript-eslint/no-duplicate-type-constituents": "warn",
      "@typescript-eslint/no-dynamic-delete": "warn",

      /**
       * The `allowSingleExtends` option is enabled to allow for the common pattern of using using
       * interfaces to provide an opaque type. (This can be useful with type-builders such as Zod,
       * since `z.infer` uses `Expand`, which is sometimes not desired since it can lead to
       * verbose/confusing mouseover tooltips and TypeScript errors.)
       */
      "@typescript-eslint/no-empty-interface": [
        "warn",
        {
          allowSingleExtends: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "warn",
      "@typescript-eslint/no-extraneous-class": "warn",

      /**
       * - The `ignoreVoid` option is disabled to make the rule stricter.
       * - The rule is disabled in "*.test.ts" files because the built-in Node test runner returns a
       *   promise that is not meant to be awaited.
       */
      "@typescript-eslint/no-floating-promises": [
        "warn",
        {
          ignoreVoid: false,
        },
      ],

      "@typescript-eslint/no-for-in-array": "warn",
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-invalid-void-type": "warn",
      "@typescript-eslint/no-meaningless-void-operator": "warn",
      "@typescript-eslint/no-misused-new": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/no-mixed-enums": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-this-alias": "warn",

      /** Disabled because this rule is deprecated. */
      "@typescript-eslint/no-type-alias": "off",

      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unnecessary-qualifier": "warn",
      "@typescript-eslint/no-unnecessary-type-arguments": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unnecessary-type-constraint": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-declaration-merging": "warn",
      "@typescript-eslint/no-unsafe-enum-comparison": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-unary-minus": "warn",
      "@typescript-eslint/no-useless-empty-export": "warn",
      "@typescript-eslint/no-useless-template-literals": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/non-nullable-type-assertion-style": "warn",
      "@typescript-eslint/only-throw-error": "warn",
      "@typescript-eslint/parameter-properties": "warn",
      "@typescript-eslint/prefer-as-const": "warn",

      /**
       * Object destructuring is enforced but array destructuring is not. This matches usage in the
       * general TypeScript ecosystem.
       */
      "@typescript-eslint/prefer-destructuring": [
        "warn",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: true,
          },
        },
        {
          // We disable this for renamed properties, since code like the following should be valid:
          // `const someSpecificMyEnum = MyEnum.Value1;`
          enforceForRenamedProperties: false,
        },
      ],

      "@typescript-eslint/prefer-enum-initializers": "warn",
      "@typescript-eslint/prefer-find": "warn",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/prefer-includes": "warn",
      "@typescript-eslint/prefer-literal-enum-member": "warn",
      "@typescript-eslint/prefer-namespace-keyword": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      /**
       * Disabled because it can modify the type of `boolean` declarations, which is [undesired in
       * some
       * circumstances](https://github.com/typescript-eslint/typescript-eslint/issues/5269).
       */
      "@typescript-eslint/prefer-optional-chain": "off",

      "@typescript-eslint/prefer-readonly": "warn",

      /** Superseded by the `isaacscript/prefer-readonly-parameter-types` rule. */
      "@typescript-eslint/prefer-readonly-parameter-types": "off",

      "@typescript-eslint/prefer-reduce-type-parameter": "warn",

      /** Disabled since using the `String.match` form might make code easier to read. */
      "@typescript-eslint/prefer-regexp-exec": "off",

      "@typescript-eslint/prefer-return-this-type": "warn",
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",
      "@typescript-eslint/prefer-ts-expect-error": "warn",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/require-array-sort-compare": "warn",

      /** The various "allow" options are disabled to make the rule stricter. */
      "@typescript-eslint/restrict-plus-operands": [
        "warn",
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
        },
      ],

      /**
       * Disabled since a common use-case of template strings is to coerce everything to a string.
       */
      "@typescript-eslint/restrict-template-expressions": "off",

      /** Disabled since in it does not make sense to sort a union alphabetically in many cases. */
      "@typescript-eslint/sort-type-constituents": "off",

      /** The `allowString` and `allowNumber` options are disabled to make the rule stricter. */
      "@typescript-eslint/strict-boolean-expressions": [
        "warn",
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowNullableEnum: false,
          allowAny: false,
          allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
        },
      ],

      /**
       * The `allowDefaultCaseForExhaustiveSwitch` option is disabled and the
       * `requireDefaultForNonUnion` option is enabled to make the rule stricter.
       */
      "@typescript-eslint/switch-exhaustiveness-check": [
        "warn",
        {
          allowDefaultCaseForExhaustiveSwitch: false,
          requireDefaultForNonUnion: true,
        },
      ],

      "@typescript-eslint/triple-slash-reference": "warn",
      "@typescript-eslint/type-annotation-spacing": "off", // eslint-config-prettier

      /**
       * Disabled since it is not recommended by the `typescript-eslint` team. (They recommend using
       * the `noImplicitAny` and `strictPropertyInitialization` TypeScript compiler options
       * instead.)
       */
      "@typescript-eslint/typedef": "off",

      "@typescript-eslint/unbound-method": "warn",
      "@typescript-eslint/unified-signatures": "warn",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "warn",

      "@typescript-eslint/block-spacing": "off", // eslint-config-prettier
      "@typescript-eslint/brace-style": "off", // eslint-config-prettier
      "@typescript-eslint/class-methods-use-this": "warn",
      "@typescript-eslint/comma-dangle": "off", // eslint-config-prettier
      "@typescript-eslint/comma-spacing": "off", // eslint-config-prettier

      /** Disabled since this is handled by the `noImplicitReturns` TypeScript compiler flag. */
      "@typescript-eslint/consistent-return": "off",

      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/func-call-spacing": "off", // eslint-config-prettier
      "@typescript-eslint/indent": "off", // eslint-config-prettier

      /**
       * Disabled since it is superfluous to require an `= undefined` during variable initialization
       * (and TypeScript will take care of the non-undefined cases).
       */
      "@typescript-eslint/init-declarations": "off",

      "@typescript-eslint/key-spacing": "off", // eslint-config-prettier
      "@typescript-eslint/keyword-spacing": "off", // eslint-config-prettier

      /**
       * Even though the `typescript-eslint` team does not recommend using formatting rules, this
       * rule is not handled by Prettier, so we must use ESLint to enforce it.
       */
      "@typescript-eslint/lines-around-comment": [
        "warn",
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
       * Even though the `typescript-eslint` team does not recommend using formatting rules, this
       * rule is not handled by Prettier, so we must use ESLint to enforce it.
       */
      "@typescript-eslint/lines-between-class-members": [
        "warn",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],

      "@typescript-eslint/no-array-constructor": "warn",
      "@typescript-eslint/no-array-delete": "warn",

      /**
       * Disabled since it is superfluous when using TypeScript according to [the ESLint
       * documentation](https://eslint.org/docs/latest/rules/no-dupe-class-members#when-not-to-use-it).
       */
      "@typescript-eslint/no-dupe-class-members": "off",

      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-extra-parens": "off", // eslint-config-prettier
      "@typescript-eslint/no-extra-semi": "off", // eslint-config-prettier
      "@typescript-eslint/no-implied-eval": "warn",

      /** The `capIsConstructor` option is disabled to make the rule stricter. */
      "@typescript-eslint/no-invalid-this": [
        "warn",
        {
          capIsConstructor: false,
        },
      ],

      "@typescript-eslint/no-loop-func": "warn",
      "@typescript-eslint/no-loss-of-precision": "warn",

      /** Disabled since it results in too many false positives. */
      "@typescript-eslint/no-magic-numbers": "off",

      /**
       * Disabled since it is handled by the combination of the TypeScript compiler and the `no-var`
       * ESLint rule.
       */
      "@typescript-eslint/no-redeclare": "off",

      /**
       * Configured to prevent importing with some common patterns that are almost always a mistake:
       *
       * - "src" directories (but allowed in test files that are in a separate "tests" directory)
       * - "dist" directories
       * - "index" files (things in the same package should directly import instead of use the
       *   public API)
       */
      "@typescript-eslint/no-restricted-imports": [
        "warn",
        {
          patterns: [
            // Some "src" directories have an "index.ts" file, which means that importing from the
            // directory is valid. Thus, we check for the "src" directory with no suffix.
            {
              group: ["**/src"],
              message:
                'You cannot import from a "src" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
            },

            {
              group: ["**/src/**"],
              message:
                'You cannot import from a "src" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
            },

            // Some "dist" directories have an "index.ts" file, which means that importing from the
            // directory is valid. Thus, we check for the "dist" directory with no suffix.
            {
              group: ["**/dist"],
              message:
                'You cannot import from a "dist" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
            },

            {
              group: ["**/dist/**"],
              message:
                'You cannot import from a "dist" directory. If this is a monorepo, import using the package name like you would in a non-monorepo project.',
            },

            {
              group: ["**/index"],
              message:
                "You cannot import from a package index. Instead, import directly from the file where the code is located.",
            },

            {
              group: ["**/index.{js,cjs,mjs,ts,cts,mts}"],
              message:
                "You cannot import from a package index. Instead, import directly from the file where the code is located.",
            },
          ],
        },
      ],

      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-throw-literal": "warn",

      /**
       * The `allowTaggedTemplates` option is enabled to allow the rule to work with libraries like
       * `execa`.
       */
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowTaggedTemplates: true,
        },
      ],

      /**
       * The `args` option is set to `all` make the rule stricter. Additionally, we ignore things
       * that begin with an underscore, since this matches the behavior of the `--noUnusedLocals`
       * TypeScript compiler flag.
       */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all", // "after-used" is the default.
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      /** Disabled because it can prevent code from being structured sequentially. */
      "@typescript-eslint/no-use-before-define": "off",

      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/object-curly-spacing": "off", // eslint-config-prettier

      /**
       * Disabled since it is for inserting extra newlines between specific kinds of statements,
       * which would be project-dependant. (This kind of formatting is not handled by Prettier.)
       */
      "@typescript-eslint/padding-line-between-statements": "off",

      /** The `allowEmptyReject` option is enabled since this is a common pattern. */
      "@typescript-eslint/prefer-promise-reject-errors": [
        "warn",
        {
          allowEmptyReject: true,
        },
      ],

      /**
       * We forbid unnecessary backticks by using the options specified in [the
       * `eslint-config-prettier`
       * documentation](https://github.com/prettier/eslint-config-prettier#enforce-backticks).
       */
      "@typescript-eslint/quotes": [
        "warn",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],

      "@typescript-eslint/require-await": "warn",

      /**
       * Even though the core rule was deprecated, the extended rule uses type information, so it is
       * much better.
       */
      "@typescript-eslint/return-await": "warn",

      "@typescript-eslint/semi": "off", // eslint-config-prettier
      "@typescript-eslint/space-before-blocks": "off", // eslint-config-prettier
      "@typescript-eslint/space-before-function-paren": "off", // eslint-config-prettier
      "@typescript-eslint/space-infix-ops": "off", // eslint-config-prettier
    },
  },

  // Enable linting on TypeScript file extensions.
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
  },

  // Disable some TypeScript-specific rules in JavaScript files.
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  },

  // The built-in Node.js test-runner returns a promise which is not meant to be awaited.
  {
    files: ["**/*.test.{js,cjs,mjs,ts,cts,mts}"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
    },
  },

  // We want to be allowed to import from the "src" directory in test files that are located in a
  // separate "tests" directory.
  {
    files: ["**/tests/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
  },
);
