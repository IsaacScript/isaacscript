# eslint-plugin-isaacscript

`eslint-plugin-isaacscript` is a collection of [ESLint](https://eslint.org/) rules that can help make your JavaScript/TypeScript code more safe.

This plugin is named after (and used in) the [IsaacScript](https://isaacscript.github.io/) framework. But you don't have to know anything about IsaacScript to use it - you can use this plugin with any JavaScript/TypeScript project.

If you want to get off the ground and running with ESLint + TypeScript in a new project, then you should check out the [`isaacscript-lint`](https://github.com/IsaacScript/isaacscript-lint) meta-package.

This project is written in [TypeScript](https://www.typescriptlang.org/).

<br>

## Install / Usage

- `npm install --save-dev eslint eslint-plugin-isaacscript`
- Add `"plugin:isaacscript/recommended"` to the `extends` section of your `.eslintrc.js` file. (This will automatically add the plugin and add all of the recommended rules.)
  - Alternatively, if you want to only enable some specific rules, then add `"isaacscript"` to the `plugins` section of your `.eslintrc.js` file, and then add the specific rules that you want in the `rules` section.

<br>

## Rules

Each rule has emojis denoting:

- :white_check_mark: - if it belongs to the `recommended` configuration
- :wrench: - if some problems reported by the rule are automatically fixable by the `--fix` [command line option](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems)
- :thought_balloon: - if it requires type information

| Name                                                                                             | Description                                                                                            | :white_check_mark: | :wrench: | :thought_balloon: |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------ | -------- | ----------------- |
| [`isaacscript/no-let-any`](./docs/rules/no-let-any.md)                                           | Disallows declaring variables with let that do not have a type                                         | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-object-any`](./docs/rules/no-object-any.md)                                     | Disallows declaring objects and arrays that do not have a type.                                        | :white_check_mark: |          | :thought_balloon: |
| [`isaacscript/no-template-curly-in-string-fix`](./docs/rules/no-template-curly-in-string-fix.md) | Disallows template literal placeholder syntax in regular strings (and automatically fixes the problem) | :white_check_mark: |          |                   |

## Configs

- `recommended` - Enables just the recommended rules.
- `all` - Enables all rules.
