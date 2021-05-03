---
title: Getting Started
---

`isaacscript` is currently only supported on Windows.

Choose one:
- [Instructions for Beginners](#instructions-for-beginners) (detailed)
- [Instructions for Experts](#instructions-for-experts) (summary)

<br />

## Instructions for Beginners

### 1) Open a Command Prompt

Open a [Command Prompt as an administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/).

<br />

### 2) Install Chocolatey

[Chocolatey](https://chocolatey.org/install) is a package manager for Windows. If you don't have it installed already, install it by pasting in the following command:

```batch
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

(Installing Chocolatey is optional, but it makes everything easier. It is the defacto way to automatically install programs, so everyone should probably have Chocolatey installed on their computer.)

<br />

### 3) Install Node.js

In order to program in TypeScript, we need [Node.js](https://nodejs.org/en/), a JavaScript runtime. If you don't have it installed already, install it by pasting in the following command:

```batch
cinst nodejs -y
```

(This is short form of `choco install nodejs -y`. The `-y` flag automatically answers "yes" to the "Are you sure" message.)

<br />

### 4) Install Git

[Git](https://git-scm.com/) is version-control software that lets you easily push your code to [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), and more. Handily, it also comes with a [Bash shell](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>) for Windows users.

If you don't have it installed already, install it by pasting in the following command:

```batch
cinst git -y
```

(This is short form of `choco install git -y`. The `-y` flag automatically answers "yes" to the "Are you sure" message.)

<br />

### 5) Install VSCode

[Visual Studio Code](https://code.visualstudio.com/) (or VSCode, for short) is the best editor for TypeScript. If you don't have it installed already, install it by pasting in the following command:

```batch
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

```batch
mkdir C:\Repositories\revelations
cd C:\Repositories\revelations
```

Note that your project directory should **not** be a subdirectory of the `Binding of Isaac Afterbirth+ Mods` directory! This is because `isaacscript` will synchronize / clone your mod there automatically.

<br />

### 8) Initialize a New Project With `create-isaacscript-mod`

Once you are inside your project directory, you can initialize the project with the `create-isaacscript-mod` helper program:

```bash
npx create-isaacscript-mod
```

(This command downloads and executes the NPM package of `create-isaacscript-mod`.)

This program will ask you some questions and then populate your new directory with TypeScript and some other files that you will need.

<br />

### 9) Open VSCode

If you don't have VSCode open already, then launch it from the start menu.

Once open, select `File` --> `Open Folder`, and open your project directory.

Finally, in the left file explorer pane, double click on the `src/main.ts` file to open it. This is the main file for your mod, which includes some "hello world" style code.

<br />

### 10) Run `isaacscript`

Start `isaacscript` in your project directory:

```bash
npx isaacscript
```

The program will run forever, monitoring for changes in your project. (If you want to cancel it, you can press `Ctrl + C` to return to your shell.)

<br />

### 11) Start Coding

That's it! Now, start coding by editing the `src/main.ts` file.

<br />

## Instructions for Experts

- Install [Node.js](https://nodejs.org/en/).
- Create a directory for your new mod project.
- In a shell, navigate to the directory.
- Invoke the helper program to bootstrap the installation of TypeScript, the Isaac API definitions, and so forth:
  - `npx create-isaacscript-mod`
- Invoke `isaacscript`, which will run forever, monitoring for changes in your project:
  - `npx isaacscript`
- Start coding by editing the `src/main.ts` file.
  - I recommend using [Visual Studio Code](https://code.visualstudio.com/) as the text editor / IDE to write TypeScript with.

See the next page for a short demonstration of what the IsaacScript program is doing in the background.
