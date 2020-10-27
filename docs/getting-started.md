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

(This is short form of `choco install nodejs -y`. The `-y` flag automatically answers "yes" to the "Are you sure" message.)

<br />

### 4) Install Git

[Git](https://git-scm.com/) is version-control software that lets you easily push your code to [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), and more. Handily, it also comes with a [Bash shell](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) for Windows users.

If you don't have it installed already, install it by pasting in the following command:

```
cinst git -y
```

(This is short form of `choco install git -y`. The `-y` flag automatically answers "yes" to the "Are you sure" message.)

<br />

### 5) Install VSCode

[Visual Studio Code](https://code.visualstudio.com/) (or VSCode, for short) is the best editor for TypeScript. If you don't have it installed already, install it by pasting in the following command:

```
cinst vscode -y
```

(This is short form of `choco install vscode -y`. The `-y` flag automatically answers "yes" to the "Are you sure" message.)

VSCode is the recommended editor to use in conjunction with `isaacscript`, but feel free to use something else (like [WebStorm](https://www.jetbrains.com/webstorm/)) if you want.

<br />

### 6) Open a New Shell

Close the administrative shell and start either:

- a normal (non-administrative) Windows Command Prompt
- a Git Bash shell (via `Start` --> `Git Bash`)

Either one is fine, depending on what you like better.

(Git Bash is similar to a Windows Command Prompt. For example, you can move to a different directory with `cd [directory-name]`, go back with `cd ..`, and so forth. Git Bash also includes a lot of helpful Linux tools.)

<br />

### 7) Create and Navigate to Your Project Directory

Make a new directory for your new mod / project. And then navigate to it.

For example, in a Windows Command Prompt:

```
mkdir C:\Repositories\revelations
cd C:\Repositories\revelations
```

Note that your project directory should **not** be a subdirectory of the `Binding of Isaac Afterbirth+ Mods` directory! This is because `isaacscript` will synchronize / clone your mod there automatically.

<br />

### 8) Initialize a New Project With `create-isaacscript-mod`

Once you are inside your project directory, you can initialize the project with the `create-isaacscript-mod` helper program:

```
npx create-isaacscript-mod
```

(This command downloads and executes the NPM package of `create-isaacscript-mod`.)

This program will ask you some questions and then populate your new directory with TypeScript and some other files that you will need.

<br />

### 9) Open VSCode

If you don't have VSCode open already, then launch it from the start menu.

Once open, select `File` --> `Open Folder`, and open your project directory.

Finally, start by opening up the main file for your project, which is located at `src/main.ts`.

<br />

### 10) Run `isaacscript`

Start `isaacscript` in your project directory:

```
npx isaacscript
```

The program will run forever, monitoring for changes in your project. (If you want to cancel it, you can press `Ctrl + C` to return to your shell.)

<br />

### 11) Tutorial: Confirm That Auto-Mod-Reloading Works

The moment that you save a TypeScript file, `isaacscript` will detect that something has changed, and it will automatically perform the following steps:

- `isaacscript` will re-compile your TypeScript project using `tstl`, the TypeScriptToLua tool.
- `tstl` will spit out a file called `main.lua` in your project's `mod` folder. (e.g. `C:\Repositories\revelations\mod\main.lua`)
- `isaacscript` will copy this file to the `Binding of Isaac Afterbirth+ Mods` directory. (e.g. `C:\Users\[YourUsername]\Documents\My Games\Binding of Isaac Afterbirth+ Mods\revelations\main.lua`)
- If you have the game open and are in a run, `isaacscript` will then send a message to a helper mod called `isaacscript-watcher`.
- `isaacscript-watcher` will run the `luamod` console command corresponding to your project. (e.g. `luamod revelations`)
- After the `luamod` command is executed, your mod has been reloaded - it is now ready to test!
- If compilation failed for any reason, then you will be able to see the errors on both the `isaacscript` console window and in-game. (The `isaacscript-watcher` mod will draw it on the screen for you.)

Note that `isaacscript` will automatically install the `isaacscript-watcher` helper mod for you, so you don't have to do anything. Just test to see that it works:

1. Make sure that `isaacscript` is running in a shell.
2. In-game, go into a run.
3. In VSCode, add something new to your `main.ts` file, like:

```typescript
Isaac.ConsoleOutput("hello world");
```

4. Save the file in VSCode.
5. In game, press <code>`</code> to open the console and see if the new message is there.

<br />

### 12) Tutorial: Confirm That File Cloning Works

`isaacscript` will automatically sync the contents of the `mod` directory in your project to the corresponding folder in `Binding of Isaac Afterbirth+ Mods`.

For example:
- Say that you have a project directory of: `C:\Repositories\revelations\`
- Then, inside your project mod folder, you make some new subdirectories: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\`
  - (This is the directory that you are supposed to put graphics files in for new, modded items.)
- Next, you put a new file in that directory: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\collectibles_new_item.png`
- Now, `isaacscript` automatically copies the `collectibles_new_item.png` file to: `C:\Users\[YourUsername]\Documents\My Games\Binding of Isaac Afterbirth+ Mods\revelations\resources\gfx\items\collectibles\collectibles_new_item.png`

For now, just put something in your mod folder and confirm that `isaacscript` copies it over for you!

<br />

### 13) Start Coding

That's it! Now, start coding.

See the next page for the basic anatomy of a project directory.
