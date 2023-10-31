# eslint-plugin-isaacscript

<img src="https://isaacscript.github.io/img/items/magic-mushroom.png">

`eslint-plugin-isaacscript` is a collection of miscellaneous [ESLint](https://eslint.org/) rules that can help make your JavaScript/TypeScript code more safe or more strict.

This plugin is named after (and used in) the [IsaacScript](https://isaacscript.github.io/) framework. But you don't have to know anything about IsaacScript to use it - you can use these rules with any JavaScript/TypeScript project.

Alternatively, if you want to get off the ground and running with ESLint + TypeScript in a new project, then you should check out the [`isaacscript-lint`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint) meta-package.

This project is written in [TypeScript](https://www.typescriptlang.org/).

<br>

## Install / Usage

- `npm install --save-dev eslint eslint-plugin-isaacscript`
- Add `"plugin:isaacscript/recommended"` to the `extends` section of your `.eslintrc.cjs` file. (This will automatically add the plugin and add all of the recommended rules.)
  - Alternatively, if you want to only enable some specific rules, then add `"isaacscript"` to the `plugins` section of your `.eslintrc.cjs` file, and then add the specific rules that you want in the `rules` section.

<br>

## Configs

- `recommended` - Enables just the recommended rules. (Some rules are not recommended since they are intended for very specific environments.)

<br>

## Rules

Each rule has emojis denoting:

- :white_check_mark: - if it belongs to the `recommended` configuration
- :wrench: - if some problems reported by the rule are automatically fixable by the `--fix` [command line option](https://eslint.org/docs/latest/user-guide/command-line-interface#fixing-problems)
- :thought_balloon: - if it requires type information

<!-- Do not manually modify the RULES_TABLE section. Instead, run: yarn run generate -->
<!-- RULES_TABLE -->

| Name                                                                                                     | Description                                                                                                 | :white_check_mark: | :wrench: | :thought_balloon: |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------ | -------- | ----------------- |
| [`isaacscript/complete-sentences-jsdoc`](docs/rules/complete-sentences-jsdoc.md)                         | Requires complete sentences for JSDoc comments                                                              | :white_check_mark: |          |                   |
| [`isaacscript/complete-sentences-line-comments`](docs/rules/complete-sentences-line-comments.md)         | Enforces complete sentences for multi-line leading line comments                                            | :white_check_mark: |          |                   |
| [`isaacscript/consistent-enum-values`](docs/rules/consistent-enum-values.md)                             | Requires consistent enum values                                                                             | :white_check_mark: |          |                   |
| [`isaacscript/enum-member-number-separation`](docs/rules/enum-member-number-separation.md)               | Disallows numbers next to letters in enum members                                                           |                    |          |                   |
| [`isaacscript/eqeqeq-fix`](docs/rules/eqeqeq-fix.md)                                                     | Requires the use of `===` and `!==` (and automatically fixes)                                               | :white_check_mark: | :wrench: |                   |
| [`isaacscript/format-jsdoc-comments`](docs/rules/format-jsdoc-comments.md)                               | Disallows `/**` comments longer than N characters and multi-line comments that can be merged together       | :white_check_mark: | :wrench: |                   |
| [`isaacscript/format-line-comments`](docs/rules/format-line-comments.md)                                 | Disallows `//` comments longer than N characters and multi-line comments that can be merged together        | :white_check_mark: | :wrench: |                   |
| [`isaacscript/jsdoc-code-block-language`](docs/rules/jsdoc-code-block-language.md)                       | Requires a language specification for every JSDoc code block                                                | :white_check_mark: |          |                   |
| [`isaacscript/newline-between-switch-case`](docs/rules/newline-between-switch-case.md)                   | Requires newlines between switch cases                                                                      | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-confusing-set-methods`](docs/rules/no-confusing-set-methods.md)                         | Disallows confusing methods for sets                                                                        | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-empty-jsdoc`](docs/rules/no-empty-jsdoc.md)                                             | Disallows empty JSDoc comments                                                                              | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-empty-line-comments`](docs/rules/no-empty-line-comments.md)                             | Disallows empty line comments                                                                               | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-explicit-array-loops`](docs/rules/no-explicit-array-loops.md)                           | Disallows explicit iteration for arrays                                                                     | :white_check_mark: | :wrench: | :thought_balloon: |
| [`isaacscript/no-explicit-map-set-loops`](docs/rules/no-explicit-map-set-loops.md)                       | Disallows explicit iteration for maps and sets                                                              | :white_check_mark: | :wrench: | :thought_balloon: |
| [`isaacscript/no-for-in`](docs/rules/no-for-in.md)                                                       | Disallows "for x in y" statements                                                                           | :white_check_mark: |          |                   |
| [`isaacscript/no-invalid-default-map`](docs/rules/no-invalid-default-map.md)                             | Disallows invalid constructors for the DefaultMap class                                                     |                    |          | :thought_balloon: |
| [`isaacscript/no-let-any`](docs/rules/no-let-any.md)                                                     | Disallows declaring variables with let that do not have a type                                              | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-number-enums`](docs/rules/no-number-enums.md)                                           | Disallows number enums                                                                                      | :white_check_mark: |          |                   |
| [`isaacscript/no-object-any`](docs/rules/no-object-any.md)                                               | Disallows declaring objects and arrays that do not have a type                                              | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-object-methods-with-map-set`](docs/rules/no-object-methods-with-map-set.md)             | Disallows using object methods with maps and sets                                                           | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-string-length-0`](docs/rules/no-string-length-0.md)                                     | Disallows checking for empty strings via the length method in favor of direct comparison to an empty string | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-template-curly-in-string-fix`](docs/rules/no-template-curly-in-string-fix.md)           | Disallows template literal placeholder syntax in regular strings (and automatically fixes)                  | :white_check_mark: | :wrench: |                   |
| [`isaacscript/no-throw`](docs/rules/no-throw.md)                                                         | Disallows the usage of "throw"                                                                              |                    |          | :thought_balloon: |
| [`isaacscript/no-unsafe-plusplus`](docs/rules/no-unsafe-plusplus.md)                                     | Disallow unsafe and confusing uses of the "++" and "--" operators                                           | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-void-return-type`](docs/rules/no-void-return-type.md)                                   | Disallows void return types on non-exported functions                                                       | :white_check_mark: | :wrench: |                   |
| [`isaacscript/prefer-plusplus`](docs/rules/prefer-plusplus.md)                                           | Require "++" or "--" operators instead of assignment operators where applicable                             | :white_check_mark: | :wrench: |                   |
| [`isaacscript/prefer-postfix-plusplus`](docs/rules/prefer-postfix-plusplus.md)                           | Require "i++" instead of "++i"                                                                              | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/require-break`](docs/rules/require-break.md)                                               | Requires that each case of a switch statement has a `break` statement                                       | :white_check_mark: |          |                   |
| [`isaacscript/require-capital-const-assertions`](docs/rules/require-capital-const-assertions.md)         | Requires a capital letter for named objects and arrays that have a const assertion                          | :white_check_mark: | :wrench: |                   |
| [`isaacscript/require-capital-read-only`](docs/rules/require-capital-read-only.md)                       | Requires maps/sets/arrays with a capital letter to be read-only                                             | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/require-unannotated-const-assertions`](docs/rules/require-unannotated-const-assertions.md) | Disallows explicit type annotations for variables that have a const assertion                               | :white_check_mark: |          |                   |
| [`isaacscript/require-v-registration`](docs/rules/require-v-registration.md)                             | Require variables named "v" to be registered with the save data manager                                     |                    |          | :thought_balloon: |
| [`isaacscript/require-variadic-function-argument`](docs/rules/require-variadic-function-argument.md)     | Requires that variadic functions must be supplied with at least one argument                                | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/strict-enums`](docs/rules/strict-enums.md)                                                 | Disallows the usage of unsafe enum patterns                                                                 | :white_check_mark: |          | :thought_balloon: |

<!-- /RULES_TABLE -->

<br>

## Automatic Fixing

You probably already use [Prettier](https://prettier.io/), which is helpful to automatically format files. You probably even have your IDE set up to run Prettier every time your save a file. This kind of thing saves you a tremendous amount of time - you can type out a bunch of code completely unformatted, and then press `Ctrl + s` at the end to automatically fix everything. (Alternatively, you could press `Ctrl + shift + f` to format the file without saving it, but it's simpler to just use one hotkey for everything.)

In a similar way to Prettier, this ESLint plugin contains several rules that are designed to automatically apply whenever you save the file (like the [`format-jsdoc-comments`](docs/rules/format-jsdoc-comments.md) rule). These rules are "fixers", which are applied when ESLint is executed with the "--fix" flag. So, in the same way that you configure Prettier to run on save, you should also configure `eslint --fix` to run on save.

For example, if you use [VSCode](https://code.visualstudio.com/), and you have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions installed, you can add the following to your repository's `.vscode/settings.json` file:

```jsonc
{
  // Automatically run the formatter when certain files are saved.
  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.tabSize": 2
  },
  "[typescript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.tabSize": 2
  }
}
```

<br>

## Comment Formatting

For a discussion around comments and the motivations for some of the comment rules in the plugin, see [this page](docs/comments.md).

<br>

## Contributing

Thanks for helping out with this open-source project!

If you are adding a new rule, start by using the `create-rule.sh` script to automate a few things:

```sh
npm run create-rule foo "This is a description of the foo rule."
git status # Show what the script did.
```

Additionally, You can contact me [on Discord](https://discord.gg/KapmKQ2gUD) if you are doing a PR and have questions.

<br>
