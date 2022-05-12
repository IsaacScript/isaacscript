# eslint-plugin-isaacscript

`eslint-plugin-isaacscript` is a collection of [ESLint](https://eslint.org/) rules that can help make your JavaScript/TypeScript code more safe.

This plugin is named after (and used in) the [IsaacScript](https://isaacscript.github.io/) framework. But you don't have to know anything about IsaacScript to use it - you can use this plugin with any JavaScript/TypeScript project.

Alternatively, if you want to get off the ground and running with ESLint + TypeScript in a new project, then you should check out the [`isaacscript-lint`](https://github.com/IsaacScript/isaacscript-lint) meta-package.

This project is written in [TypeScript](https://www.typescriptlang.org/).

<br>

## Install / Usage

- `npm install --save-dev eslint eslint-plugin-isaacscript`
- Add `"plugin:isaacscript/recommended"` to the `extends` section of your `.eslintrc.js` file. (This will automatically add the plugin and add all of the recommended rules.)
  - Alternatively, if you want to only enable some specific rules, then add `"isaacscript"` to the `plugins` section of your `.eslintrc.js` file, and then add the specific rules that you want in the `rules` section.

<br>

## Configs

- `recommended` - Enables just the recommended rules.
- `all` - Enables all the rules.

<br>

## Rules

Each rule has emojis denoting:

- :white_check_mark: - if it belongs to the `recommended` configuration
- :wrench: - if some problems reported by the rule are automatically fixable by the `--fix` [command line option](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems)
- :thought_balloon: - if it requires type information

<!-- Do not manually modify RULES_TABLE section. Instead, run: npm run generate:rules-table -->
<!-- RULES_TABLE -->

| Name                                                                                           | Description                                                                                           | :white_check_mark: | :wrench: | :thought_balloon: |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------ | -------- | ----------------- |
| [`isaacscript/complete-sentences-jsdoc`](docs/rules/complete-sentences-jsdoc.md)               | Enforces complete sentences for JSDoc comments                                                        | :white_check_mark: |          |                   |
| [`isaacscript/enum-member-number-separation`](docs/rules/enum-member-number-separation.md)     | Disallows numbers next to letters in enum members                                                     |                    |          |                   |
| [`isaacscript/eqeqeq-fix`](docs/rules/eqeqeq-fix.md)                                           | Requires the use of `===` and `!==` (and automatically fixes)                                         | :white_check_mark: | :wrench: |                   |
| [`isaacscript/format-jsdoc-comments`](docs/rules/format-jsdoc-comments.md)                     | Disallows `/**` comments longer than N characters and multi-line comments that can be merged together | :white_check_mark: | :wrench: |                   |
| [`isaacscript/format-slash-slash-comments`](docs/rules/format-slash-slash-comments.md)         | Disallows `//` comments longer than N characters and multi-line comments that can be merged together  | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-empty-jsdoc`](docs/rules/no-empty-jsdoc.md)                                   | Disallows empty JSDoc comments                                                                        | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-implicit-map-set-loops`](docs/rules/no-implicit-map-set-loops.md)             | Disallows implicit iteration for `Maps` and `Sets`                                                    | :white_check_mark: | :wrench: | :thought_balloon: |
| [`isaacscript/no-let-any`](docs/rules/no-let-any.md)                                           | Disallows declaring variables with let that do not have a type                                        | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-object-any`](docs/rules/no-object-any.md)                                     | Disallows declaring objects and arrays that do not have a type                                        | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-template-curly-in-string-fix`](docs/rules/no-template-curly-in-string-fix.md) | Disallows template literal placeholder syntax in regular strings (and automatically fixes)            | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-useless-return-no-fix`](docs/rules/no-useless-return-no-fix.md)               | Disallows redundant return statements (and does not automatically fix)                                | :white_check_mark: |          |                   |
| [`isaacscript/no-void-return-type`](docs/rules/no-void-return-type.md)                         | Disallows void return types on non-exported functions                                                 | :white_check_mark: | :wrench: |                   |

<!-- /RULES_TABLE -->

<br>

## Automatic Fixing

You probably already use [Prettier](https://prettier.io/), which is helpful to automatically format files. You probably even have your IDE set up to run Prettier every time your save a file. This kind of thing saves you a tremendous amount of time - you can type out a bunch of code completely unformatted, and then press `Ctrl + s` at the end to automatically fix everything.

In a similar way to Prettier, this ESLint plugin contains several rules that are designed to automatically apply whenever you save the file (like the [`format-jsdoc-comments`](docs/rules/format-jsdoc-comments.md) rule). These rules contain "fix" functions, which are applied when ESLint is executed with the "--fix" flag. So, in the same way that you configure Prettier to run on save, you should also configure `eslint --fix` to run on save.

For example, if you use [VSCode](https://code.visualstudio.com/), and you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions installed, you can add the following to your repository's `.vscode/settings.json` file:

```jsonc
{
  // Automatically run the formatter when certain files are saved.
  "[javascript]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.tabSize": 2
  },
  "[typescript]": {
    "editor.codeActionsOnSave": ["source.fixAll.eslint"],
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.tabSize": 2
  }
}
```

<br>

## Contributing

Thanks for helping out with this open-source project!

If you are adding a new rule, start by using the NPM script to automate a few things:

```sh
npm run create-rule
git status # Show what the NPM script did
```

Additionally, You can contact me [on Discord](https://discord.gg/KapmKQ2gUD) if you are doing a PR and have questions.
