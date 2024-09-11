# `eslint-plugin-isaacscript`

<img src="https://isaacscript.github.io/img/items/magic-mushroom.png" alt="Magic Mushroom">

`eslint-plugin-isaacscript` is a collection of miscellaneous [ESLint](https://eslint.org/) rules that can help make your TypeScript code more safe or more strict.

If you already have ESLint set up in your project, then you can try enabling the [`isaacscript/recommend`](#configs) config to get all of the goodness from this plugin in your project at once. Alternatively, if you want more control, feel free to enable the specific rules that you need.

Alternatively, if you want to get off the ground and running with ESLint + TypeScript in a new project, then you should check out the [`isaacscript-lint`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-lint) meta-package.

<br>

## Install / Usage

- `npm install --save-dev eslint eslint-plugin-isaacscript`
- Add `"plugin:isaacscript/recommended"` to the `extends` section of your `.eslintrc.cjs` file. (This will automatically add the plugin and add all of the recommended rules.)
  - Alternatively, if you want to only enable some specific rules, then add `"isaacscript"` to the `plugins` section of your `.eslintrc.cjs` file, and then add the specific rules that you want in the `rules` section.

<br>

## Configs

- `recommended` - Currently, every rule in this plugin is recommended.

<br>

## Rules

Each rule has emojis denoting:

- :white_check_mark: - if it belongs to the `recommended` configuration
- :wrench: - if some problems reported by the rule are automatically fixable by the `--fix` [command line option](https://eslint.org/docs/latest/user-guide/command-line-interface#fixing-problems)
- :thought_balloon: - if it requires type information

<!-- Do not manually modify the RULES_TABLE section. Instead, run: npm run generate -->
<!-- RULES_TABLE -->

| Name                                                                                       | Description                                                             | :white_check_mark: | :wrench: | :thought_balloon: |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------ | -------- | ----------------- |
| [`isaacscript/enum-member-number-separation`](docs/rules/enum-member-number-separation.md) | Disallows numbers next to letters in enum members                       |                    |          |                   |
| [`isaacscript/no-invalid-default-map`](docs/rules/no-invalid-default-map.md)               | Disallows invalid constructors for the DefaultMap class                 |                    |          | :thought_balloon: |
| [`isaacscript/no-throw`](docs/rules/no-throw.md)                                           | Disallows the usage of "throw"                                          |                    |          |                   |
| [`isaacscript/require-v-registration`](docs/rules/require-v-registration.md)               | Require variables named "v" to be registered with the save data manager |                    |          |                   |

<!-- /RULES_TABLE -->

<br>
