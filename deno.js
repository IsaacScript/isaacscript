// This is a shared configuration file for ESLint
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    "./index.js"
  ],

  // Documentation:
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  // Defined at:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
  // Deno must use the ".ts" extension in every import
  "import/extensions": "off",
};
