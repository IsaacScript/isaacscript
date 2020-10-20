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

VSCode is the recommended editor to use in conjunction with `isaacscript`, but feel free to use something else (like [WebStorm](https://www.jetbrains.com/webstorm/)) if you like it better.

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

(The "-g" flag means to install it globally, instead of installing it to the current working directory.)

<br />

### 8) Create and Navigate to Your Project Directory

Make a new directory for your new mod / project. And then navigate to it.

For example, in a Windows Command Prompt:

```
mkdir C:\Repositories\revelations
cd C:\Repositories\revelations
```

Note that your project directory should **not** be a subdirectory of the "Binding of Isaac Afterbirth+ Mods" directory! This is because `isaacscript` will syncronize / clone your mod there for you automatically.

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

### 11) Confirm That Auto-Refresh Works

`isaacscript` communicates with a helper mod called `isaacscript-watcher` in order to automatically tell the game that it should run the `luamod` console command. (This command will reload a mod that you are working on without the need to quit and re-enter the game.)

`isaacscript` will automatically install `isaacscript-watcher`, so you don't have to do anything.

Test to see that it works:

1. Make sure that `isaacscript` is running in a shell.
2. Go into a run.
3. Add something new to your `main.ts` file:

```typescript
Isaac.ConsoleOutput("hello world");
```

As soon as you hit "save" in VSCode, `isaacscript` will automatically compile it for you, and move the resulting `main.lua` file into your real mod folder. Then, you should see a message appear on the screen that your mod was reloaded.

<br />

### 12) Start Coding

That's it! Now, start coding.

If you've never programmed anything in JavaScript before, then read the next page.
