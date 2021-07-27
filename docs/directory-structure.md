---
title: Project Directory Structure
---

When you use `isaacscript init`, it will automatically load a directory with some files for you. The basic folder structure is:

```
|-- src (TypeScript source code)
    |-- main.ts
|-- mod (what will exist in the "real" mod directory)
    |-- main.lua
    |-- metadata.xml
```

More specifics are detailed below. **You do not need to know what all of these files are for**, so if you want to dive into coding your mod, skip reading this page.

<br />

## Directories

### `project`

This is the root directory of your project. It won't actually be called `project`; it will instead be named after your mod.

If you want to track your project in [Git](https://git-scm.com/), this directory should be the root of the Git repository. (`isaacscript` does not automatically initialize a Git repository; you have to do that on your own with `git init` or `git clone`.)

<br />

### `project/.github`

This directory contains the file for GitHub Actions (i.e. [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)).

(If you do not use GitHub, feel free to delete this directory.)

If you want to be alerted via Discord if a commit fails CI, then perform the following steps:

1. In your Discord server, right click on the intended channel and select "Edit Channel".
1. Select "Integrations" from the menu on the left-hand-side.
1. Click on "View Webhooks".
1. Click on "New Webhook".
1. Name the bot "GitHub" and give it a profile picture of the GitHub icon.
1. Click on "Copy Webhook URL".
1. On the main page of your GitHub repository, select "Settings" from the top menu.
1. Select "Secrets" from the menu on the left-hand-side.
1. Click on "New repository secret".
1. Name the secret `DISCORD_WEBHOOK`.
1. Paste in the URL from earlier as the "Value".
1. Click on "Add secret".

<br />

### `project/.vscode`

This directory contains some stock settings that are recommended for VSCode to work properly with IsaacScript projects.

Ignore this directory, unless you want to customize the settings. (If you do not use VSCode, feel free to delete this directory.)

<br />

### `project/mod`

This is the source mod directory. Any files that you put here will be automatically transferred over to the mirrored directory in `mods`.

For example,

```batch
C:\Repositories\revelations\mod\image.png
```

will be copied to:

```batch
C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\mods\revelations\image.png
```

<br />

### `project/node_modules`

This directory contains the dependencies for the project. (e.g. TypeScript, TypeScriptToLua, ESLint, etc.)

Leave it in place and ignore it.

More info:

- `node_modules` is generated when you type `npm install` in a directory with a `package.json` file in it.
- `isaacscript init` automatically creates a `package.json` file for you and does an `npm install` when you start a new project.
- This directory will contain a lot of files and is usually 150+ megabytes in size.
- `node_modules` are always excluded from being tracked in a Git repository.
  - There will already be an entry for `node_modules` in the `.gitignore` file installed by `isaacscript`.

<br />

### `project/src`

This is the TypeScript source directory. All of the TypeScript files for your mod should live in here.

`isaacscript init` will automatically create a `main.ts` file for you in this directory.

<br />

## Files

### `.cspell.json`

This is the configuration file for [cspell](https://github.com/streetsidesoftware/cspell), a spell-checker for code.

If VSCode incorrectly reports that a file is misspelled, you can right-click on the word and say "Add Word to Workspace Dictionaries". The word will then be recorded in this file and the squiggly line will go away.

<br />

### `.env_template`

This is a template for a `.env` file; you are intended to copy it to `.env` and then fill in the values.

The `.env` file is only needed if IsaacScript is publishing your mod to the Steam Workshop.

<br />

### `.eslintrc.js`

This is the configuration file for [ESLint](https://eslint.org/), the TypeScript linter.

Normally, you should not need to touch this file, but you can edit it if you need to disable a specific linting rule.

<br />

### `.gitattributes`

This contains specific Git attributes that should be applied to this Git repository, if present. By default, it prevent Windows systems from cloning the repository with "\r\n" line endings.

<br />

### `.gitignore`

This contains a list of files that should not be added to a Git repository, if present. If you have a private file that you don't want to be committed to a repository, you can edit this file and add it.

<br />

### `.prettierrc.js`

This is the configuration file for Prettier (which is invoked as an ESLint plugin).

If you need to modify a specific aspect of Prettier, you can edit this file.

<br />

### `build.sh`

This is a helper script to compile the project. (It is also used in CI.)

<br />

### `isaacscript.json`

This is the configuration file for `isaacscript`. It contains only per-user settings. Thus, it should not be committed to a Git repository. You can see the format of the file in [the IsaacScript source code](https://github.com/IsaacScript/isaacscript/blob/main/src/types/Config.ts).

<br />

### `lint.sh`

This is a helper script to lint and spell-check the project. (It is also used in CI.)

<br />

<br />

### `LICENCE`

This is the licence for your project. By default, `isaacscript init` installs a [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html), because all code projects should include a license in them.

Feel free to change this to something else if you don't like GPLv3.

<br />

### `mod/main.lua`

This is the transpiled Lua output of your TypeScript source code. All TypeScript code is combined into one big Lua file. There is no need to commit this file to a Git repository, so it is included in the ".gitignore" file by default.

<br />

### `mod/metadata.xml`

This is the file used by the "ModUploader" tool to upload your mod to the Steam Workshop. It contains a description of your mod and other metadata. IsaacScript creates a basic one for you, but when you upload your mod to the Steam Workshop for the first time, more information will be added (like the ID of the mod).

<br />

### `mod/metadata.vdf`

This is a file used by IsaacScript to automatically upload your mod to the Steam Workshop. For this to work, you must edit the file and fill in your mod ID. (The mod ID can be found by looking in the "metadata.xml" file after uploading the mod to the Steam Workshop for the first time.)

<br />

### `package.json`

This is the configuration file for [npm](https://www.npmjs.com/), the Node package manager. It contains a description of your project and a list of all of the dependencies.

In general, you should not need to touch this file. If you decide to add a new dependency (e.g. `npm install lodash --save`), then `npm` would automatically edit the `package.json` file accordingly. (Beware of adding dependencies, since [it will break tstl](gotchas.md#npm-dependencies).)

Note that normally, a TypeScript project would have "devDependencies" of TypeScript, ESLint, and so forth. However, in the IsaacScript framework, all you have to do is depend on `isaacscript`, and `isaacscript` in turn depends on everything you need. This makes things a little bit simpler for you.

(If for whatever reason you want more granularity in your dependencies, then you can instead change your package.json file to depend on `typescript`, `typescript-to-lua`, `isaac-typescript-definitions`, and so on.)

<br />

### `package-lock.json`

This is a lock file for [npm](https://www.npmjs.com/), the Node package manager.

You are not supposed to edit this file; just leave it in place so that `npm` can function correctly.

<br />

### `publish.sh`

This is a helper script to invoke `npx isaacscript publish`.

<br />

### `README.md`

This is the README file for your project, which should contain a brief description of your mod. It uses [Markdown](https://guides.github.com/features/mastering-markdown/), which is the standard format for README files.

<br />

### `run.sh`

This is a helper script to invoke `npx isaacscript`.

<br />

### `tsconfig.eslint.json` and `tsconfig.json`

These are the configuration files for the [TypeScript](https://www.typescriptlang.org/) programming language. The main one is `tsconfig.json`. `tsconfig.eslint.json` extends the main one to make ESLint work properly.

Normally, you should not need to touch these files. However, you can edit `tsconfig.json` if you need to add or remove a particular compiler flag.

<br />

### `update.sh`

This is a helper script to update the project dependencies.
