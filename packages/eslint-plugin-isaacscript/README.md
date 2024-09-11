# `eslint-plugin-isaacscript`

<img src="https://isaacscript.github.io/img/items/magic-mushroom.png" alt="Magic Mushroom">

`eslint-plugin-isaacscript` is a collection of [ESLint](https://eslint.org/) rules for IsaacScript mods. (By default, IsaacScript mods are automatically configured to use these rules.)

## Configs

- `recommended` - Currently, every rule in this plugin is recommended.

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
