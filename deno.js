// This is a shared configuration file for ESLint
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    "./index.js"
  ],

  rules: {
    // Documentation:
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
    // Deno must use the ".ts" extension in every import
    "import/extensions": "off",

    // The "no-unsafe-*" rules do not work with Deno
    // https://github.com/typescript-eslint/typescript-eslint/issues/3395
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
};
