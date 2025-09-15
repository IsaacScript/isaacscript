# `isaacscript-lint`

[![npm version](https://img.shields.io/npm/v/isaacscript-lint.svg)](https://www.npmjs.com/package/isaacscript-lint)

This is a meta package to install all of the dependencies necessary for [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) to work with a typical IsaacScript project. (Prettier is the best code formatter and ESLint is the best code problem checker.)

(By default, IsaacScript mods are automatically configured to use this meta package.)

## Package Documentation

- [`@prettier/plugin-xml`](https://github.com/prettier/plugin-xml) - Allows Prettier to format XML files, which are common in Binding of Isaac mods.
- [`complete-lint`](https://complete-ts.github.io/overview.html) - A meta-package to install all of the necessary ESLint and Prettier dependencies.
- [`eslint-config-isaacscript`] - Contains the master ESLint configuration.
- [`eslint-import-resolver-typescript`](https://github.com/import-js/eslint-import-resolver-typescript) - Necessary for `eslint-plugin-import-x` to work properly, which is part of `eslint-config-complete`. (Even though it is a direct dependency of `eslint-config-complete`, it does not work properly when it is a nested transitive dependency, so it must explicitly be in this package.)
- [`isaacscript-spell](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-spell) - A collection of CSpell dictionaries for IsaacScript mods.
- [`isaacscript-tsconfig`](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaacscript-tsconfig) - A TypeScript configuration file for IsaacScript mods.
- [`ts-prune`](https://github.com/nadeesha/ts-prune) - A tool to look for unused exports.
