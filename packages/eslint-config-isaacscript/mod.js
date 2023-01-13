// This is a shared configuration file for ESLint:
// https://eslint.org/docs/latest/user-guide/configuring
module.exports = {
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
      "warn",
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
      "warn",
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
      "warn",
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
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/enum-member-number-separation.md
     *
     * Not defined in the parent configs.
     *
     * Since Isaac enums use the `SHOUTING_SNAKE_CASE` convention, this rule ensures correctness.
     */
    "isaacscript/enum-member-number-separation": "warn",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-invalid-default-map.md
     *
     * Not defined in the parent configs.
     *
     * Prevents misuse of the custom `DefaultMap` class in the standard library.
     */
    "isaacscript/no-invalid-default-map": "warn",

    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-throw.md
     *
     * Not defined in the parent configs.
     *
     * The `throw` keyword should never be used in Isaac mods.
     */
    "isaacscript/no-throw": "warn",

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
     * https://eslint.org/docs/latest/rules/no-underscore-dangle
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * We keep the Airbnb specification but allow calling functions that overload Lua operators:
     * https://moddingofisaac.com/docs/class_vector.html
     */
    "no-underscore-dangle": [
      "warn",
      {
        allow: ["__add", "__sub", "__mul", "__div", "__unm", "__len"],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],
  },
};
