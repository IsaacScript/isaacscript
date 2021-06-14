// This is a shared configuration file for ESLint
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // The mod config extends the base configuration:
  // https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/base.js
  extends: ["./base"],

  // We modify the linting rules from the base for some specific things
  // (listed in alphabetical order)
  rules: {
    // Documentation:
    // https://github.com/eslint/eslint/blob/master/docs/rules/no-bitwise.md
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
    // Isaac enums use bitwise operators (e.g. "EntityFlag")
    "no-bitwise": "off",

    // Documentation:
    // https://eslint.org/docs/rules/no-param-reassign
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
    // The Isaac API callback functions expect you to modify the provided object
    "no-param-reassign": "off",

    // Documentation:
    // https://eslint.org/docs/rules/no-restricted-globals
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
    // print is used with Lua mods
    "no-restricted-globals": "off",

    // Documentation:
    // https://eslint.org/docs/rules/no-underscore-dangle
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
    // We keep the Airbnb specification but allow calling functions that overload Lua operators:
    // https://moddingofisaac.com/docs/class_vector.html
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
