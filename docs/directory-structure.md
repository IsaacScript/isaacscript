---
title: Project Folder Structure
---

When you launch `isaacscript` in a new directory, it will automatically create some files for you.

You don't really need to know what all the files are for, so if you want to dive into coding, feel free to skip reading this page.

<br />

## Directories

### `project`

This is the directory where you launched `isaacscript`.

If you want to track your project in [Git](https://git-scm.com/) (and you really should), then this will be the root of the repository. (`isaacscript` does not automatically initialize a Git repository; you have to do that on your own with `git init`, `git clone`, etc.)

<br />

### `project/mod`

This is the source mod directory. Any files that you put here will be automatically transferred over to the mirrored directory in `Binding of Isaac Afterbirth+ Mods`.

For example,
```
C:\Repositories\revelations\mod\image.png
```
will be copied to:
```
C:\Users\james\Documents\My Games\Binding of Isaac Afterbirth+ Mods\revelations\image.png
```

<br />

### `project/src`

This is the TypeScript source directory. All of the TypeScript files for your mod need to be in here.

During project initialization, `isaacscript` will automatically create a `main.ts` file for you in this directory (if you do not have one already).

<br />

### `project/.vscode`

This directory contains settings for VSCode to work properly with IsaacScript projects.

Leave it in place and ignore it. (If you do not use VSCode, feel free to delete it.)

<br />

### `project/node_modules`

This directory contains the dependencies for the project. (e.g. TypeScript, TypeScriptToLua, ESLint, etc.)

Leave it in place and ignore it.

More info:

* `node_modules` is generated when you type `npm install` in a directory with a `package.json` file in it.
* IsaacScript automatically creates a `package.json` file for you and does an `npm install` when you start a new project.`
* This directory will contain a lot of files and is usually 150+ megabytes in size.
* `node_modules` are always excluded from being tracked in a Git repository.
  * Not to worry - there will already be an entry for `node_modules` in the `.gitignore` file installed by `isaacscript`.

<br />

## Files

### `.cspell.json`

This is the configuration file for [cspell](https://github.com/streetsidesoftware/cspell), a spell-checker for code.

If VSCode incorrectly reports that a file is misspelled, you can right-click on the word and say "Add Word to Workspace Dictionaries". The word will then be recorded in this file.

<br />

### `.eslintrc.js`

This is the configuration file for [ESLint](https://eslint.org/), the TypeScript linter.

Normally, you should not need to touch this file, but you can edit it if you need to disable a specific linting rule.

<br />

### `.gitignore`

This contains a list of files that should not be added to a Git repository, if present. Even if you aren't using Git, it is best to just leave this file in place (in case you add a Git repository later).

If you have a private file that you don't want to be committed to a repository, you can edit this file and add it.

<br />

### `isaacscript.json`

This is the configuration file for `isaacscript`.

<br />

### `LICENCE`

This is the licence for your project. `isaacscript` installs a [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html) by default, because all code projects should include a license in them.

Feel free to change this to something else if you don't like GPLv3.

<br />

### `package.json`

This is the configuration file for [npm](https://www.npmjs.com/), the Node package manager. It contains a description of your project and a list of all of the dependencies.

Normally, you should not need to touch this file. If you decide to add a new dependency (e.g. `npm install lodash --save`), then npm would automatically edit the `package.json` file accordingly.

Note that normally, a TypeScript project would have "devDependencies" of TypeScript, ESLint, and so forth. However, in the IsaacScript framework, all you have to do is depend on `isaacscript`, and `isaacscript` in turn depends on everything you need. This makes things a little bit simpler for the end-user.

<br />

### `package-lock.json`

This is a lock file for [npm](https://www.npmjs.com/), the Node package manager.

You are not supposed to edit this file; just leave it in place so that npm can function correctly.

<br />

### `tsconfig.eslint.json` and `tsconfig.json`

These are the configuration files for the [TypeScript](https://www.typescriptlang.org/) programming language. The main one is `tsconfig.json`. (`tsconfig.eslint.json` extends that one to make ESLint work properly.)

Normally, you should not need to touch these files. However, you can edit `tsconfig.json` if you need to add or remove a particular compiler flag.

<br />

See the next page for some basic JavaScript tips.
