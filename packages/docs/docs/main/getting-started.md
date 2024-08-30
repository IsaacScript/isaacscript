---
title: Getting Started
---

`isaacscript` will currently work on Windows and Linux.

You can go from zero to up-and-running with a new mod in around 5 minutes, depending on how fast your computer and internet speed is.

(If you don't know what IsaacScript is or you are not yet convinced that you should use it, look at the [features](features.md) page first.)

<br />

### 1) Install Node.js

In order to run files that are written in the JavaScript & TypeScript programming language, we need [Node.js](https://nodejs.org/en/), a JavaScript runtime. If you don't have it installed already, download and install it from the [Node.js download page](https://nodejs.org/en/download/).

<br />

### 2) Install VSCode

[Visual Studio Code](https://code.visualstudio.com/) (or VSCode, for short) is probably the best text editor for TypeScript. If you don't have it installed already, download and install it from the [VSCode download page](https://code.visualstudio.com/download).

(If you usually use a different TypeScript editor like [WebStorm](https://www.jetbrains.com/webstorm/) or [vim](https://www.vim.org/), then feel free to use that instead if you want.)

<br />

### 3) Open a New Command Prompt Window / Shell

Open a new [command prompt window](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/). (Or, feel free to use Windows Terminal, PowerShell, Git Bash, etc.)

<br />

### 4) Create and Change to Your Project Directory

Make a new directory for your mod, and then change the current working directory to it. (Use [lowercase and kebab-case](https://stackoverflow.com/questions/11947587/is-there-a-naming-convention-for-git-repositories).)

For example, if your mod is named "Revelations", you would type the following into the command prompt:

```batch
mkdir C:\Repositories\revelations
cd C:\Repositories\revelations
```

Note that your project directory should **not** be a subdirectory of the Isaac `mods` directory! This is because `isaacscript` will synchronize / clone your mod there automatically.

<br />

### 5) Run `isaacscript init` to Bootstrap the Project

Run:

```sh
npx isaacscript@latest init
```

The program will ask you some questions and then populate your current directory with TypeScript and other some other dependencies.

(You might get a warning of ``npm WARN config global `--global\`, `--local` are deprecated. Use `--location=global` instead.`` You can safely ignore this and press enter to proceed, as it is a recent npm bug with Windows.)

At the end, it will ask you if it should launch VSCode for you. Answer yes.

<br />

### 6) Run `isaacscript`

Back in your command prompt, start `isaacscript`:

```sh
npx isaacscript
```

(This is shorthand for `npx isaacscript monitor`.)

The program will run forever, monitoring for changes in your project. If you want to cancel it, you can press `Ctrl + C` to return to your shell.

IsaacScript needs to be running in order for your code changes to propagate to the real mod directory, so you will need to start it up in the same way every time that you begin coding. (You could also [automate the invocation with a VSCode task](https://code.visualstudio.com/docs/editor/tasks) if you find it annoying to run it manually.)

<br />

### 7) Start Coding

That's it! Now, start coding by editing the `src/main.ts` file.

Note that when you are editing the code in your project, you should always have VSCode opened to the project directory (i.e. by clicking on File --> Open Folder), as opposed to just editing a single file. Otherwise, ESLint and Prettier won't work.

<br />
