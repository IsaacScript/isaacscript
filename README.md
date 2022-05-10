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

| Name                                                                                      | Description                                                                                | :white_check_mark: | :wrench: | :thought_balloon: |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------ | -------- | ----------------- |
| [isaacscript/eqeqeq-fix](docs/rules/eqeqeq-fix)                                           | Requires the use of `===` and `!==` (and automatically fixes)                              | :white_check_mark: |          |                   |
| [isaacscript/limit-jsdoc-comments](docs/rules/limit-jsdoc-comments)                       | Disallows "/\*" comments longer than N characters                                          | :white_check_mark: |          |                   |
| [isaacscript/limit-slash-slash-comments](docs/rules/limit-slash-slash-comments)           | Disallows "//" comments longer than N characters                                           | :white_check_mark: |          |                   |
| [isaacscript/no-let-any](docs/rules/no-let-any)                                           | Disallows declaring variables with let that do not have a type                             | :white_check_mark: |          |                   |
| [isaacscript/no-object-any](docs/rules/no-object-any)                                     | Disallows declaring objects and arrays that do not have a type                             | :white_check_mark: |          |                   |
| [isaacscript/no-template-curly-in-string-fix](docs/rules/no-template-curly-in-string-fix) | Disallows template literal placeholder syntax in regular strings (and automatically fixes) | :white_check_mark: |          |                   |
| [isaacscript/no-void-return-type](docs/rules/no-void-return-type)                         | Disallows void return types on non-exported functions                                      | :white_check_mark: |          |                   |

<!-- /RULES_TABLE -->

<br>

## Contributing

Thanks for helping out with this open-source project!

If you are adding a new rule, start by using the NPM script to automate a few things:

```sh
npm run create-rule
git status # Show what the NPM script did
```

Additionally, You can contact me [on Discord](https://discord.gg/KapmKQ2gUD) if you are doing a PR and have questions.
