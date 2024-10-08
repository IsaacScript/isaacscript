import ESLintPluginIsaacScript from "eslint-plugin-isaacscript";
import tseslint from "typescript-eslint";

// Hot-patch "eslint-plugin-isaacscript" to convert errors to warnings.
for (const config of ESLintPluginIsaacScript.configs.recommended) {
  if (config.rules !== undefined) {
    for (const [key, value] of Object.entries(config.rules)) {
      if (value === "error") {
        config.rules[key] = "warn";
      }
    }
  }
}

/**
 * This ESLint config is meant to be used as a base for IsaacScript mods (or TypeScriptToLua
 * projects).
 */
export const isaacScriptModConfigBase = tseslint.config(
  // `eslint-plugin-isaacscript` provides rules specifically for IsaacScript mods.
  ...ESLintPluginIsaacScript.configs.recommended,

  {
    rules: {
      /**
       * Defined at: base-typescript-eslint.js
       *
       * It is conventional in IsaacScript mods to put the "v" object outside of the class, which
       * makes it likely that some methods will not use any internal class variables.
       */
      "@typescript-eslint/class-methods-use-this": "off",

      /**
       * Defined at: base-typescript-eslint.js
       *
       * We expand the original definition to ensure that all enums match the Isaac convention of
       * using UPPER_CASE.
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
          leadingUnderscore: "allow",
        },
        // The vanilla Isaac enums all use UPPER_CASE:
        // https://wofsauge.github.io/IsaacDocs/rep/enums/CollectibleType.html
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
      ],

      /**
       * Defined at: base-typescript-eslint.js
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
       * Defined at: base-typescript-eslint.js
       *
       * TSTL has special behavior with respect to `this: void`, so we need to configure this rule
       * to allow the `this` parameter.
       */
      "@typescript-eslint/no-invalid-void-type": [
        "warn",
        {
          allowAsThisParameter: true,
        },
      ],

      /**
       * Defined at: base-typescript-eslint.js
       *
       * This rule throws false positives with Isaac API functions. It can be worked around by
       * supplying lists of globals to ESLint, but this is ugly. See:
       * https://github.com/typescript-eslint/typescript-eslint/issues/2780
       */
      "@typescript-eslint/no-loop-func": "off",

      /**
       * Defined at: base-typescript-eslint.js
       *
       * Enums that are used with the API must be numbers since that is what the API expects. We
       * also prefer that unofficial enums are also number enums for consistency.
       */
      "@typescript-eslint/prefer-enum-initializers": "off",

      /**
       * Defined at: base-typescript-eslint.js
       *
       * It is common to initialize enums with the `Isaac.GetEntityVariantByName` method.
       */
      "@typescript-eslint/prefer-literal-enum-member": "off",

      /**
       * Defined at: base-typescript-eslint.js
       *
       * The `Number.sort` method transpiles to use `table.sort`, which does not have the
       * coercion-based bugs of the JavaScript implementation. Thus, this lint rule is unnecessary.
       */
      "@typescript-eslint/require-array-sort-compare": "off",

      /**
       * Defined in "complete/recommended".
       *
       * Enums that are used with the API use upper case letters. We also prefer that unofficial
       * enums are also use upper case letters for consistency.
       */
      "complete/consistent-enum-values": "off",

      /**
       * Defined in "complete/recommended".
       *
       * Enums that are used with the API must be numbers since that is what the API expects. We
       * also prefer that unofficial enums are also number enums for consistency.
       */
      "complete/no-number-enums": "off",

      /**
       * Defined at: base-n.js
       *
       * IsaacScript mods to not use ESM, so we must turn this rule off.
       */
      "n/file-extension-in-import": "off",

      /**
       * Defined at: base-unicorn.js
       *
       * `null` values are conventionally used with the `isaacscript-common` save data manager (even
       * though they are transpiled to `nil`).
       */
      "unicorn/no-null": "off",

      /**
       * Defined at: base-unicorn.js
       *
       * IsaacScript mods use Lua bitwise operators, which are safe.
       */
      "unicorn/prefer-math-trunc": "off",

      /**
       * Defined at: base-eslint.js
       *
       * Isaac API methods use capital letters, so we must make the options for the rule less
       * strict.
       */
      "new-cap": [
        "warn",
        {
          newIsCap: true,
          capIsNew: false,
          properties: true,
        },
      ],

      /**
       * Defined at: base-eslint.js
       *
       * Isaac enums use bitwise operators (e.g. "EntityFlag").
       */
      "no-bitwise": "off",

      /**
       * Defined at: base-eslint.js
       *
       * The Isaac API callback functions expect you to modify the provided object.
       */
      "no-param-reassign": "off",

      /**
       * Defined at: base-eslint.js
       *
       * "print" is used with Lua mods.
       */
      "no-restricted-globals": "off",
    },
  },
);
