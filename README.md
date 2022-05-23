# IsaacScript

<!-- markdownlint-disable MD033 -->

IsaacScript is a tool to help you create _Binding of Isaac: Repentance_ mods using [TypeScript](https://www.typescriptlang.org/).

Please visit the [official website](https://isaacscript.github.io/) for more information.

This is the [monorepo](https://en.wikipedia.org/wiki/Monorepo) that houses the various packages in the ecosystem. It is powered by [Nx](https://nx.dev/).

<br>

## Packages

Each project in the monorepo is contained within the "packages" directory.

| Name                                                                      | Description                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [eslint-config-isaacscript](tree/main/packages/eslint-config-isaacscript) | A sharable ESLint config for TypeScript and IsaacScript projects.          |
| [eslint-plugin-isaacscript](tree/main/packages/eslint-plugin-isaacscript) | An ESLint plugin that contains useful rules.                               |
| [isaacscript-cli](tree/main/packages/isaacscript-cli)                     | The command-line tool for managing Isaac mods written in TypeScript.       |
| [isaacscript-lint](tree/main/packages/isaacscript-lint)                   | A linting dependency meta-package for IsaacScript and TypeScript projects. |
| [isaacscript-spell](tree/main/packages/isaacscript-spell)                 | Spelling dictionaries for _The Binding of Isaac: Repentance_.              |
| [isaacscript-tsconfig](tree/main/packages/isaacscript-tsconfig)           | A sharable TypeScript config for TypeScript and IsaacScript projects.      |

TODO: add isaacscript-common & isaac-typescript-definitions & docs

<br>

## Installation for Development (Windows)

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
