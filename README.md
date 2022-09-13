# IsaacScript

<img src="https://github.com/IsaacScript/isaacscript/raw/main/misc/logo.png" alt="Logo" width="128" height="128">

<br>

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
| [isaacscript-lua](./packages/isaacscript-lua)                           | A tool for managing IsaacScript libraries in Lua projects.                 | [![pypi version](https://img.shields.io/pypi/v/isaacscript-lua.svg)](https://pypi.org/project/isaacscript-lua/)                             |
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
- Fork the IsaacScript repository by clicking on the "Fork" button in the top-right-hand corner of this page.
- Clone the forked repository:
  - `cd [the path where you want the code to live]`
  - If you already have an SSH key pair and have the public key attached to your GitHub profile, then use the following command to clone the repository via SSH:
    - `git clone git@github.com:[username]/isaacscript.git` <br>
      (replace "[username]" with your GitHub username)
  - If you do not already have an SSH key pair, then use the following command to clone the repository via HTTPS:
    - `git clone https://github.com/[username]/isaacscript.git` <br>
      (replace "[username]" with your GitHub username)
- Enter the cloned repository:
  - `cd isaacscript`
- Ensure that [Yarn](https://classic.yarnpkg.com/lang/en/) (v1) is installed:
  - `corepack enable`
- Install dependencies:
  - `yarn install`
- Open the monorepo in VSCode:
  - `code .`

<br>

## Working with `isaacscript-common`

If you want to fix a bug or add a new feature to `isaacscript-common`, then you need to set up a testing mod that links to your compiled development version. (This is so that you can test out your changes inside of the game.)

The `isaacscript` command line tool has a `--dev` flag that will set this up for you automatically:

```sh
npx isaacscript init test --dev
```

This command will initialize a new mod named "test" that automatically links to your locally compiled `isaacscript-common`. Additionally, when you do `npx isaacscript` to initiate the file watcher, it will also spawn an additional watcher process for the files in `isaacscript-common`.
