---
title: Getting Started
---

`isaacscript` is currently only supported on Windows, although that may change in the future.

<br />

### 1) Open a Command Prompt

Open a [Command Prompt as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/).

<br />

### 2) Install Chocolatey

[Chocolatey](https://chocolatey.org/install) is a package manager for Windows. If you don't have it installed already, install it by pasting in the following command:

```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

(Installing Chocolatey is optional, but it makes everything easier. Everyone should probably have Chocolatey installed on their computer.)

<br />

### 3) Install NodeJS

In order to program in TypeScript, we need [Node.js](https://nodejs.org/en/), a JavaScript runtime. If you don't have it installed already, install it by pasting in the following command:

```
cinst nodejs -y
```

(This is short form of `choco install nodejs -y`. The `-y` flag automaticaly answers "yes" to the "Are you sure" message.)

<br />

### 4) Install Git

[Git](https://git-scm.com/) is version-control software that lets you easily push your code to [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), and more. Handily, it also comes with a [Bash shell](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) for Windows users.

If you don't have it installed already, install it by pasting in the following command:

```
cinst git -y
```

(This is short form of `choco install git -y`. The `-y` flag automaticaly answers "yes" to the "Are you sure" message.)

<br />

### 5) Install VSCode

[Visual Studio Code](https://code.visualstudio.com/) (or VSCode, for short) is the best editor for TypeScript. If you don't have it installed already, install it by pasting in the following command:

```
cinst vscode -y
```

(This is short form of `choco install vscode -y`. The `-y` flag automaticaly answers "yes" to the "Are you sure" message.)

VSCode is the recommended editor to use in conjunction with `isaacscript`, but feel free to use something else (like [WebStorm](https://www.jetbrains.com/webstorm/)) if you want.

<br />

### 6) Open a New Shell

Close the administrative shell and start either:

- a normal (non-administrative) Windows Command Prompt
- a Git Bash shell (via `Start` --> `Git Bash`)

Either one is fine, depending on what you like better.

(Git Bash is similar to a Windows Command Prompt. For example, you can move to a different directory with `cd [directory-name]`, go back with `cd ..`, and so forth. Git Bash also includes a lot of helpful Linux tools.)

<br />

### 7) Install IsaacScript

Install `isaacscript` by pasting in the following command:

```bash
npm install isaacscript -g
```

(`npm` is the package manager for Node.js. The "-g" flag means to install it globally, instead of installing it to the current working directory.)

<br />

### 8) Create and Navigate to Your Project Directory

Make a new directory for your new mod / project. And then navigate to it.

For example, in a Windows Command Prompt:

```
mkdir C:\Repositories\revelations
cd C:\Repositories\revelations
```

Note that your project directory should **not** be a subdirectory of the `Binding of Isaac Afterbirth+ Mods` directory! This is because `isaacscript` will syncronize / clone your mod there automatically.

<br />

### 9) Run IsaacScript

Now, run `isaacscript`, and it will take care of setting everything up for your new project:

```
isaacscript
```

After the initial setup, `isaacscript` will continue to run, monitoring for changes in your project. (If you want to cancel it, you can press `Ctrl + C` to return to your shell.)

If you run `isaacscript` again in the future, it will remember your settings, which are stored in the `isaacconfig.json` file in your project directory.

<br />

### 10) Open VSCode

You can launch VSCode from the start menu. Once open, select `File` --> `Open Folder`, and open your project directory.

Or, even better, you can handily launch VSCode from the command line:

```
vscode .
```

(The "." means that VSCode should open the current directory as the project directory.)

By default, `isaacscript` creates the main file for your project at `src/main.ts`, so open that up to start with.

<br />

### 11) Confirm That Auto-Mod-Reloading Works

The moment that you save a TypeScript file, `isaacscript` will detect that something has changed, and it will automatically perform the following steps:

- `isaacscript` will re-compile your TypeScript project using `tstl`, the TypeScriptToLua tool.
- `tstl` will spit out a file called `main.lua` in your project's `mod` folder. (e.g. `C:\Repositories\revelations\mod\main.lua`)
- `isaacscript` will copy this file to the `Binding of Isaac Afterbirth+ Mods` directory. (e.g. `C:\Users\james\Documents\My Games\Binding of Isaac Afterbirth+ Mods\revelations\main.lua`)
- If you have the game open and are in a run, `isaacscript` will then send a message to a helper mod called `isaacscript-watcher`.
- `isaacscript-watcher` will run the `luamod` console command corresponding to your project. (e.g. `luamod revelations`)
- After the `luamod` command is executed, your mod has been reloaded - it is now ready to test!
- If compilation failed for any reason, then you will be able to see the errors on both the `isaacscript` window and in-game. (The `isaacscript-watcher` mod will draw them on the screen for you.)

Note that `isaacscript` will automatically install the `isaacscript-watcher` helper mod for you, so you don't have to do anything. Just test to see that it works:

1. Make sure that `isaacscript` is running in a shell.
2. In-game, go into a run.
3. In VSCode, add something new to your `main.ts` file, like:

```typescript
Isaac.ConsoleOutput("hello world");
```

4. Hit save.

<br />

### 12) Confirm That File Cloning Works

`isaacscript` automatically creates a special subdirectory called `mod` in your project directory. `isaacscript` will automatically sync the contents of this directory with the deployed folder in `Binding of Isaac Afterbirth+ Mods`.

For example:
- Say that you have a project directory of: `C:\Repositories\revelations\`
- Then, inside your project mod folder, you make some new subdirectories: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\`
  - (This is the directory that you are supposed to put graphics files in for new, modded items.)
- Next, you put a new file in that directory: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\collectibles_new_item.png`
- Now, `isaacscript` automatically copies the `collectibles_new_item.png` file to: `C:\Users\james\Documents\My Games\Binding of Isaac Afterbirth+ Mods\revelations\resources\gfx\items\collectibles\collectibles_new_item.png`

For now, just put something in your mod folder and confirm that `isaacscript` copies it over for you!

<br />

### 13) Start Coding

That's it! Now, start coding.

See the next page for some basic JavaScript tips.
