/**
 * This config is meant to be used as a base for IsaacScript mods (or TypeScriptToLua projects).
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: [
    /**
     * The IsaacScript mod config extends the base configuration:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/base.js
     * (Normal TypeScript projects would just use the base configuration directly.)
     */
    "./base",
  ],

  rules: {
    /**
     * Documentation:
     * https://typescript-eslint.io/rules/naming-convention
     *
     * Defined at:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * Modify the Airbnb config to allow for a leading underscore, which signifies that it is
     * temporarily not being used.
     *
     * Additionally, ensure that all enums match the Isaac convention of using UPPER_CASE.
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
      // The vanilla Isaac enums all use UPPER_CASE:
      // https://wofsauge.github.io/IsaacDocs/rep/enums/CollectibleType.html
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-base-to-string/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
     *
     * The `Vector` object has a `tostring` meta-method, so it can be properly printed without
     * explicitly specifying the X and Y values.
     */
    "@typescript-eslint/no-base-to-string": [
      "error",
      {
        ignoredTypeNames: ["Vector"],
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-invalid-void-type
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
     *
     * TSTL has special behavior with respect to "this: void", so we need to configure this rule to
     * allow the "this" parameter.
     */
    "@typescript-eslint/no-invalid-void-type": [
      "error",
      {
        allowAsThisParameter: true,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-loop-func
     *
     * Defined at:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * This rule throws false positives with API functions. It can be worked around by supplying
     * lists of globals to ESLint, but this is ugly. See:
     * https://github.com/typescript-eslint/typescript-eslint/issues/2780
     */
    "@typescript-eslint/no-loop-func": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/prefer-literal-enum-member
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
     *
     * It is common to initialize enums with the `Isaac.GetEntityVariantByName` method.
     */
    "@typescript-eslint/prefer-literal-enum-member": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/require-array-sort-compare
     *
     * Defined at:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/configs/base-typescript-eslint.js
     *
     * The `Number.sort` method transpiles to use `table.sort`, which does not have the
     * coercion-based bugs of the JavaScript implementation. Thus, this lint rule is unnecessary.
     */
    "@typescript-eslint/require-array-sort-compare": "off",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/enum-member-number-separation.md
     *
     * Not defined in the parent configs.
     *
     * Since Isaac enums use the `SHOUTING_SNAKE_CASE` convention, this rule ensures correctness.
     */
    "isaacscript/enum-member-number-separation": "error",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-invalid-default-map.md
     *
     * Not defined in the parent configs.
     *
     * Prevents misuse of the custom `DefaultMap` class in the standard library.
     */
    "isaacscript/no-invalid-default-map": "error",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-throw.md
     *
     * Not defined in the parent configs.
     *
     * The `throw` keyword should never be used in Isaac mods.
     */
    "isaacscript/no-throw": "error",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/require-v-registration.md
     *
     * Not defined in the parent configs.
     *
     * We must explicitly enable this rule, since it should only apply to IsaacScript mods.
     */
    "isaacscript/require-v-registration": "error",

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
     *
     * Defined in "base.js".
     *
     * IsaacScript mods to not use ESM, so we must turn this rule off.
     */
    "n/file-extension-in-import": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/class-methods-use-this
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * It is conventional in IsaacScript mods to put the "v" object outside of the class, which
     * makes it likely that some methods will not use any internal class variables.
     */
    "class-methods-use-this": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/new-cap
     *
     * Defined at: base-eslint.js
     *
     * Isaac API methods use capital letters, so we must make the options for the rule less strict.
     */
    "new-cap": [
      "error",
      {
        newIsCap: true,
        capIsNew: false,
        properties: true,
      },
    ],

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-bitwise
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Isaac enums use bitwise operators (e.g. "EntityFlag").
     */
    "no-bitwise": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-param-reassign
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * The Isaac API callback functions expect you to modify the provided object.
     */
    "no-param-reassign": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-restricted-globals
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
     *
     * "print" is used with Lua mods.
     */
    "no-restricted-globals": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-restricted-syntax
     *
     * Defined in "base-eslint.js".
     *
     * We allow number enums since the Isaac API must use numbers.
     */
    "no-restricted-syntax": [
      "error",
      // Prevent for-in statements. This is copied from the Airbnb config:
      // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      // Prevent superfluous type annotations, which can cause bugs with widened types:
      // https://github.com/typescript-eslint/typescript-eslint/issues/6446
      {
        selector:
          'VariableDeclarator[id.typeAnnotation] > :matches(TSTypeAssertion, TSAsExpression) > TSTypeReference.typeAnnotation > Identifier[name="const"]',
        message:
          "Don't use `as const` with a type annotated variable, since it widens the type.",
      },
    ],
  },
};

module.exports = config;
