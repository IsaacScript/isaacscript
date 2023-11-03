# isaacscript-lint

[![npm version](https://img.shields.io/npm/v/isaacscript-lint.svg)](https://www.npmjs.com/package/isaacscript-lint)

This is a helper/meta package to install all of the dependencies necessary for [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) to work with a typical TypeScript project. (Prettier is the best code formatter and ESLint is the best code problem checker.)

<br>

## Why This Package Is Useful

It's a pain to get Prettier & ESLint working with TypeScript. So, `isaacscript-lint` is designed to make it as easy as possible. Don't clutter your `package.json` file with 15+ different ESLint-related dependencies. Don't bother researching which of the hundreds of existing ESLint rules to turn on and turn off. Just use `isaacscript-lint`.

If you are ready to start, see the [installation instructions](#installation-instructions-for-typescript-projects) below.

<br>

## Why Code Formatting is Important

In the 90's, the most popular scripting language in the world was [Perl](https://www.perl.org/), invented by [Larry Wall](https://en.wikipedia.org/wiki/Larry_Wall). One of Larry's slogans was that "There Is Always More Than One Way To Do It", abbreviated as the TIAMTOWTDI principle. In Perl, there were many different ways to do even the most basic thing, like adding an element to an array. This resulted in a Perl ecosystem where programs often looked nothing like each other, where everyone had different coding styles, and where everything was hard to read and comprehend. <!-- cspell:ignore TIAMTOWTDI -->

One of the key insights of [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum), the creator of the [Python](https://www.python.org/) programming language, was that [code is read much more often than it is written](https://www.python.org/dev/peps/pep-0008/). Python was designed to be concise, clean, and readable. It had standard ways of doing things and recommended that everyone follow the [PEP-8 coding standard](https://www.python.org/dev/peps/pep-0008/). And so, in the 90s, there was a massive movement away from Perl and towards Python. Now, Python is the [most popular programming language in the world](https://pypl.github.io/PYPL.html). <!-- cspell:ignore Rossum -->

[Go](https://golang.org/), the programming language designed at Google in 2009, took this concept a step further. They included a code formatter inside of the language itself, called `gofmt` (which is short for "Go formatter"). When you are coding a Go program, it will automatically format all of the code as soon as you save the file. This can be surprising and disturbing for newcomers: "Why does `gofmt` make my code ugly?!" <!-- cspell:ignore gofmt -->

However, once people get used to the formatter, they realize that it saves them a _tremendous amount of time_. By ignoring all formatting and typing out code "raw", and then summoning the formatter to instantly fix everything, you can quite literally code twice as fast. Rob Pike, one of the creators of Go, famously said that "gofmt's style is no one's favorite, yet gofmt is everyone's favorite". ([This YouTube clip](https://www.youtube.com/embed/PAAkCSZUG1c?start=523&end=568) of Rob is a much-watch!)

`gofmt` is nice because it saves people from mundane code formatting. But there is also a benefit that is entirely separate and not readily apparent. When looking at other people's Go code on StackOverflow or GitHub, you realize that it looks exactly like your code. It's easy to read and comprehend. And you can copy-paste code snippets from other programs into your own applications without having to change anything! For programmers, this is not the norm, and it feels great - it's the hidden superpower of Go.

When Rob says that everyone loves `gofmt`, he isn't lying. Programmers across the world have taken this concept and ran with it. People now use [rustfmt](https://github.com/rust-lang/rustfmt) in [Rust](https://www.rust-lang.org/), [Black](https://github.com/psf/black) in [Python](https://www.python.org/), and [Prettier](https://prettier.io/) in [JavaScript](https://www.javascript.com/) & [TypeScript](https://www.typescriptlang.org/). <!-- cspell:ignore rustfmt -->

The root of the problem here is that when people try out a new programming language, they often use the same formatting and conventions that they used in their previous language. This fractures the ecosystem and makes everyone's code inconsistent and hard to read. The lesson of Go is that whenever you code in a new language, you should use the standard style that everyone else uses for that language. In this way, every language can have the superpower that Go has.

<br>

## Why We Use Prettier & ESLint

### Prettier

In JavaScript and TypeScript land, there isn't an official code formatting standard like there is in Go, but we can get close.

[Prettier](https://prettier.io/) is an auto-formatter for JavaScript/TypeScript. First released in 2017, it has become widespread and is probably considered to be the industry standard in 2023. Prettier works by completely rebuilding your code from scratch using the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), which allows it to make better transformations than other tools.

In `isaacscript-lint`, we choose we choose the Prettier style for code formatting, since it is the most popular TypeScript style. Any ESLint rules that conflict with Prettier are turned off with [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

Prettier handles almost everything, but the `isaacscript-lint` linting config also has a few formatting-related rules turned on, like [`isaacscript/format-jsdoc-comments`](https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/format-jsdoc-comments.md) (since Prettier does not format comments).

### ESLint

ESLint is the best tool to lint JavaScript and TypeScript, as it has a massive ecosystem of rules and plugins that can help find errors in your codebase.

With `isaacscript-lint`, the philosophy is that we want to enable as many lint rules as possible, so that we can catch as many bugs as possible. It takes a lot of work to figure out which rules to turn on and which to not bother with, but we've done it for you. This is documented in more detail on [the docs for `eslint-config-isaacscript`](https://isaacscript.github.io/eslint-config-isaacscript).

### Using Prettier & ESLint Together

In order to avoid running two different tools, we could use [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) to run Prettier as an ESLint rule. However, doing this [is not recommended by Prettier](https://prettier.io/docs/en/integrating-with-linters.html). Thus, in order to use `isaacscript-lint`, you should be running both Prettier and ESLint on save. (More info on that is below.)

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
    "./**/*.json",
    "./**/.*.json",
    "./**/*.jsonc",
    "./**/.*.jsonc",
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

Additionally, you might also want to install the CSpell extension, which is extremely useful to spell check an entire code base:

- [CSpell](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

Once installed, these extensions provide a nice dichotomy:

- Red squiggly underlines are type-errors from the TypeScript compiler.
- Yellow squiggly underlines are warnings from ESLint. (Our config uses `eslint-plugin-only-warn` to convert all ESLint errors to warnings.)
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
    "editor.tabSize": 2,
  },

  "[typescript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.tabSize": 2,
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
- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) - Provides ESLint rules relating to TypeScript.
- [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser) - Provides the ability for ESLint to work with TypeScript.
- [`cspell`](https://github.com/streetsidesoftware/cspell) - A spell checker for code that is intended to be paired with the [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).
- [`cspell-check-unused-words`](https://github.com/Zamiell/cspell-check-unused-words) - A helpful script that can detect unused words inside your CSpell configuration, allowing you to clean up unnecessary entries.
- [`eslint`](https://github.com/eslint/eslint) - The main linter engine for JavaScript/TypeScript, as explained above.
- [`eslint-config-isaacscript`](https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-config-isaacscript) - Contains the master ESLint configuration.
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) - Turns off all rules that conflict with Prettier.
- [`eslint-plugin-deprecation`](https://github.com/gund/eslint-plugin-deprecation) - Provides an ESLint rule that finds deprecated code.
- [`eslint-plugin-eslint-comments`](https://github.com/mysticatea/eslint-plugin-eslint-comments) - Provides ESLint rules relating to ESLint comments.
- [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import) - Provides ESLint rules relating to importing and exporting. (Note that this uses the [`eslint-plugin-i`](https://github.com/un-es/eslint-plugin-i) fork under the hood.)
- [`eslint-plugin-isaacscript`](https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript) - Provides ESLint rules that format comments and other miscellaneous things.
- [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) - Provides ESLint rules relating to [JSDoc comments](https://en.wikipedia.org/wiki/JSDoc)
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) - Provides ESLint rules relating to [Node.js](https://nodejs.org/en). (`eslint-plugin-n` is a fork of [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node).)
- [`eslint-plugin-no-autofix`](https://github.com/aladdin-add/eslint-plugin/tree/master) - Provides modified ESLint rules that have the auto-fixer disabled.
- [`eslint-plugin-only-warn`](https://github.com/bfanger/eslint-plugin-only-warn) - Turns all ESLint errors to warnings.
- [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn) - Provides various miscellaneous ESLint rules.
- [`knip`](https://github.com/webpro/knip) - A tool to look for unused files, dependencies, and exports.
- [`prettier`](https://github.com/prettier/prettier) - The main code formatter, as explained above.
- [`prettier-plugin-organize-imports`](https://github.com/simonhaenisch/prettier-plugin-organize-imports) - A plugin used because Prettier will not organize imports automatically.
- [`prettier-plugin-packagejson`](https://github.com/matzkoh/prettier-plugin-packagejson) - A plugin used because Prettier will not organize "package.json" files automatically.
- [`ts-prune`](https://github.com/nadeesha/ts-prune) - A tool to look for unused exports. (This is not needed if you use `knip`.)

<br>
