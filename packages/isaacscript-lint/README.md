# isaacscript-lint

[![npm version](https://img.shields.io/npm/v/isaacscript-lint.svg)](https://www.npmjs.com/package/isaacscript-lint)

This is a helper/meta package to install all of the dependencies necessary for [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) to work with a typical TypeScript project. (Prettier is the best code formatter and ESLint is the best code problem checker.)

<br>

## Why This Package Is Useful

It's a pain to get Prettier & ESLint working with TypeScript. So, `isaacscript-lint` is designed to make it as easy as possible. Don't clutter your `package.json` file with 15+ different ESLint-related dependencies. Don't bother researching which of the hundreds of existing ESLint rules to turn on and turn off. Just use `isaacscript-lint`.

If you are ready to start, see the [installation instructions](#installation-instructions-for-typescript-projects) below.

<br>

## Installation Instructions for TypeScript Projects

### Step 0 - Get a TypeScript Project Set Up

It should have a `package.json` file, a `tsconfig.json` file, and so on.

### Step 1 - Install the Dependency

```sh
# If you use npm:
npm install isaacscript-lint --save-dev

# If you use yarn:
yarn install isaacscript-lint --dev

# If you use pnpm:
pnpm install isaacscript-lint --save-dev
```

(It should be a development dependency because it is only used to lint your code pre-production.)

### Step 2 - `.eslintrc.cjs`

Create a `.eslintrc.cjs` file in the root of your repository:

```js
// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/latest/use/configure/
module.exports = {
  extends: [
    // The linter base is the shared IsaacScript config:
    // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/base.js
    "eslint-config-isaacscript/base",
  ],

  parserOptions: {
    // ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
    // things to lint correctly. We do not point this at "./tsconfig.json" because certain files
    // (such at this file) should be linted but not included in the actual project output.
    project: "./tsconfig.eslint.json",
  },

  rules: {
    // Insert changed or disabled rules here, if necessary.
  },
};
```

This file must have a period at the beginning!

Note that [the new config format for ESLint that was released in 2023](https://eslint.org/docs/latest/use/configure/configuration-files-new) is not yet recommended for production use.

### Step 3 - `tsconfig.eslint.json`

Create a `tsconfig.eslint.json` file in the root of your repository:

```ts
// A special TypeScript configuration file, used by ESLint only.
{
  "extends": "./tsconfig.json",

  // We want to lint every file in the repository, regardless of whether it is actually bundled into
  // the TypeScript output. Two entries for each file extension are needed because TypeScript will
  // exclude files that begin with a period from an asterisk glob by default.
  "include": [
    "./**/*.js",
    "./**/.*.js",
    "./**/*.cjs",
    "./**/.*.cjs",
    "./**/*.mjs",
    "./**/.*.mjs",
    "./**/*.jsx",
    "./**/.*.jsx",
    "./**/*.ts",
    "./**/.*.ts",
    "./**/*.cts",
    "./**/.*.cts",
    "./**/*.mts",
    "./**/.*.mts",
    "./**/*.tsx",
    "./**/.*.tsx"
  ],
}
```

### Step 4 - Enabling Auto-Fix on Save

- You will probably want to set up your code editor such that both Prettier and ESLint are automatically run every time the file is saved.
- If you see VSCode, see [the VSCode section below](#integration-with-vscode).
- It's also possible to set this up in other editors such as [Webstorm](https://www.jetbrains.com/webstorm/) and [Neovim](https://neovim.io/), but we don't provide detailed instructions for that here.

<br>

## Adding or Removing Rules

You can add extra ESLint rules (or ignore existing ESLint rules) by editing the `rules` section of your `.eslintrc.cjs` file. For example:

```js
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
```

<br>

## Integration with VSCode

[Visual Studio Code](https://code.visualstudio.com/), or VSCode for short, is the most popular TypeScript editor / IDE.

<br>

### Extensions

In order for the linter to work inside of VSCode, you will have to install the following extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Additionally, you might also want to install the CSpell extension, which is extremely useful to spell check an entire codebase:

- [CSpell](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

Once installed, these extensions provide a nice dichotomy:

- Red squiggly underlines are type-errors from the TypeScript compiler.
- Yellow squiggly underlines are warnings from ESLint.
- Blue squiggly underlines are misspelled words. (You can use "Quick Fix" to find suggestions for the proper spelling. Or, you can right click --> `Spelling` --> `Add Words to CSpell Configuration` to ignore a specific word.)

#### `.vscode/settings.json`

Furthermore, you will probably want Prettier and ESLint to be run automatically every time you save a TypeScript file. You can tell VSCode to do this by adding the following to your project's `.vscode/settings.json` file:

```ts
// These are Visual Studio Code settings that should apply to this particular repository.
{
  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
  },

  "[typescript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
  },
}
```

(Create this file if it does not already exist.)

You can also commit this file to your project's repository so that this behavior is automatically inherited by anyone who clones the project (and uses VSCode).

#### `.vscode/extensions.json`

Optionally, you can also provide a hint to anyone cloning your repository that they should install the required extensions:

```ts
// These are Visual Studio Code extensions that are intended to be used with this particular
// repository: https://go.microsoft.com/fwlink/?LinkId=827846
{
  "recommendations": [
    "esbenp.prettier-vscode", // The TypeScript formatter
    "dbaeumer.vscode-eslint", // The TypeScript linter
    "streetsidesoftware.code-spell-checker", // A spell-checker extension based on CSpell
  ],
}
```

<br>

## Package Documentation

- [`@prettier/plugin-xml`](https://github.com/prettier/plugin-xml) - Allows Prettier to format XML files, which are common in some kinds of projects.
- [`cspell`](https://github.com/streetsidesoftware/cspell) - A spell checker for code that is intended to be paired with the [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).
- [`cspell-check-unused-words`](https://github.com/Zamiell/cspell-check-unused-words) - A helpful script that can detect unused words inside your CSpell configuration, allowing you to clean up unnecessary entries.
- [`eslint`](https://github.com/eslint/eslint) - The main linter engine for JavaScript/TypeScript, as explained above.
- [`eslint-config-isaacscript`](https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-config-isaacscript) - Contains the master ESLint configuration.
- [`knip`](https://github.com/webpro/knip) - A tool to look for unused files, dependencies, and exports.
- [`prettier`](https://github.com/prettier/prettier) - The main code formatter, as explained above.
- [`prettier-plugin-organize-imports`](https://github.com/simonhaenisch/prettier-plugin-organize-imports) - A plugin used because Prettier will not organize imports automatically.
- [`prettier-plugin-packagejson`](https://github.com/matzkoh/prettier-plugin-packagejson) - A plugin used because Prettier will not organize "package.json" files automatically.
- [`ts-prune`](https://github.com/nadeesha/ts-prune) - A tool to look for unused exports. (This is not needed if you use `knip`.)

<br>
