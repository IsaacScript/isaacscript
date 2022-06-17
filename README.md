# IsaacScript

[![Discord](https://img.shields.io/discord/843174215287832626?color=blue&label=Discord&logo=Discord&logoColor=white)](https://discord.gg/435qCC6nHt)

IsaacScript is a tool to help you create _Binding of Isaac: Repentance_ mods using [TypeScript](https://www.typescriptlang.org/).

Please visit the [official website](https://isaacscript.github.io/) for more information.

This is the [monorepo](https://en.wikipedia.org/wiki/Monorepo) that houses the various packages in the ecosystem. It is powered by [Nx](https://nx.dev/).

<br>

## Packages

Each project in the monorepo is contained within the "packages" directory.

| Name                                                                    | Description                                                                | Version                                                                                                                                     |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [docs](./packages/docs)                                                 | The Docusaurus website.                                                    | n/a                                                                                                                                         |
| [eslint-config-isaacscript](./packages/eslint-config-isaacscript)       | A sharable ESLint config for TypeScript and IsaacScript projects.          | [![npm version](https://img.shields.io/npm/v/eslint-config-isaacscript.svg)](https://www.npmjs.com/package/eslint-config-isaacscript)       |
| [eslint-plugin-isaacscript](./packages/eslint-plugin-isaacscript)       | An ESLint plugin that contains useful rules.                               | [![npm version](https://img.shields.io/npm/v/eslint-plugin-isaacscript.svg)](https://www.npmjs.com/package/eslint-plugin-isaacscript)       |
| [isaacscript-cli](./packages/isaacscript-cli)                           | The command-line tool for managing Isaac mods written in TypeScript.       | [![npm version](https://img.shields.io/npm/v/isaacscript.svg)](https://www.npmjs.com/package/isaacscript)                                   |
| [isaacscript-common](./packages/isaacscript-common)                     | Helper functions and features for IsaacScript mods.                        | [![npm version](https://img.shields.io/npm/v/isaacscript-common.svg)](https://www.npmjs.com/package/isaacscript-common)                     |
| [isaacscript-lint](./packages/isaacscript-lint)                         | A linting dependency meta-package for IsaacScript and TypeScript projects. | [![npm version](https://img.shields.io/npm/v/isaacscript-lint.svg)](https://www.npmjs.com/package/isaacscript-lint)                         |
| [isaacscript-spell](./packages/isaacscript-spell)                       | Spelling dictionaries for _The Binding of Isaac: Repentance_.              | [![npm version](https://img.shields.io/npm/v/isaacscript-spell.svg)](https://www.npmjs.com/package/isaacscript-spell)                       |
| [isaacscript-tsconfig](./packages/isaacscript-tsconfig)                 | A sharable TypeScript config for TypeScript and IsaacScript projects.      | [![npm version](https://img.shields.io/npm/v/isaacscript-tsconfig.svg)](https://www.npmjs.com/package/isaacscript-tsconfig)                 |
| [isaac-typescript-definitions](./packages/isaac-typescript-definitions) | TypeScript definitions for the _The Binding of Isaac: Repentance_ API.     | [![npm version](https://img.shields.io/npm/v/isaac-typescript-definitions.svg)](https://www.npmjs.com/package/isaac-typescript-definitions) |

<br>

## Getting Started with Development

For getting started in building your own mods, see the [website](https://isaacscript.github.io/main/getting-started). For contributing to the IsaacScript project itself, read on.

- Download and install [Node.js](https://nodejs.org/en/download/), if you don't have it already.
- Download and install [Git](https://git-scm.com/), if you don't have it already.
- Download and install [VSCode](https://https://code.visualstudio.com/), if you don't have it already.
- Open a new [command prompt window](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/) or shell of your choice.
- Configure Git, if you have not done so already:
  - `git config --global user.name "Your_Username"`
  - `git config --global user.email "your@email.com"`
- Clone the repository:
  - `cd [the path where you want the code to live]`
  - If you already have an SSH key pair and have the public key attached to your GitHub profile, then use the following command to clone the repository via SSH:
    - `git clone git@github.com:IsaacScript/isaacscript.git`
  - If you do not already have an SSH key pair, then use the following command to clone the repository via HTTPS:
    - `git clone https://github.com/IsaacScript/isaacscript.git`
  - Or, if you are doing development work, then clone your forked version of the repository. For example:
    - `git clone https://github.com/Your_Username/isaacscript.git`
- Enter the cloned repository:
  - `cd isaacscript`
- Ensure that [Yarn](https://classic.yarnpkg.com/lang/en/) (v1) is installed:
  - `corepack enable`
- Install dependencies:
  - `yarn`
- Open the monorepo in VSCode:
  - `code .`

<br>
