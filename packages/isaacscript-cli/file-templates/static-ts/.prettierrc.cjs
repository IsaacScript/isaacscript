// This is the configuration file for Prettier, the auto-formatter:
// https://prettier.io/docs/en/configuration.html

/** @type {import("prettier").Config} */
module.exports = {
  // Always print trailing commas:
  // https://prettier.io/docs/en/options.html#trailing-commas
  // The default is "es5" (only having trailing commas where valid in ES5). However, always having
  // trailing commas is objectively better. The Airbnb style guide agrees:
  // https://github.com/airbnb/javascript#commas--dangling
  // Prettier itself also acknowledges Nik Graf's blog in their official blog:
  // https://prettier.io/blog/2020/03/21/2.0.0.html
  // https://medium.com/@nikgraf/why-you-should-enforce-dangling-commas-for-multiline-statements-d034c98e36f8
  // Prettier will change the default in the future:
  // https://github.com/prettier/prettier/issues/9369
  trailingComma: "all",

  // We want to always use "lf" to be consistent with all platforms.
  endOfLine: "lf",

  // Allow proper formatting of JSONC files:
  // https://github.com/prettier/prettier/issues/5708
  overrides: [
    {
      files: ["**/.vscode/*.json", "**/tsconfig.json", "**/tsconfig.*.json"],
      options: {
        parser: "json5",
        quoteProps: "preserve",
      },
    },
  ],

  // `pnpm` requires that the plugin is explicitly loaded.
  plugins: [require.resolve("prettier-plugin-organize-imports")],
};
