---
title: Converting Lua Code
---

Sometimes, you might want to convert an old mod written in Lua to TypeScript. There are two ways to do this.

<br />

## LuaToTypeScript

Hazzard993 wrote [a tool to automatically convert Lua to TypeScript](https://github.com/hazzard993/LuaToTypeScript). This works great and is probably what you will want to use. Note that it does not convert comments, so you might want to manually transfer those over afterward. <!-- cspell:ignore Hazzard -->

<br />

## Manually With a Macro

If you want more fine-grained control over converting your code, then you can also do it manually with a macro. Here's a quick tutorial to convert code using a simple macro.

<br />

### 1) Install the ssmacro Extension

[ssmacro](https://marketplace.visualstudio.com/items?itemName=joekon.ssmacro) is a popular VSCode extension that allows you to make macros.

<br />

### 2) Download the Macro

I've written [a short macro](https://raw.githubusercontent.com/IsaacScript/isaacscript/main/misc/convert-lua-to-typescript.json) that does some basic conversions. For example, it converts `local` to `let`, `and` to `&&`, and so forth. (Feel free to customize it to your liking.)

Download it to the following directory: `C:\Users\%USERNAME%\.vscode\extensions\joekon.ssmacro-0.6.0\macros` <!-- cspell:ignore joekon -->

<br />

### 3) Make a Keyboard Shortcut

You can set up a keyboard shortcut to automatically execute the macro.

In VSCode, type Ctrl + Shift + P, then type in "Preferences: Open Keyboard Shortcuts (JSON)". Then, add a keybinding like so:

```jsonc
// Place your key bindings in this file to override the defaults
[
  {
    "key": "ctrl+shift+alt+v",
    "command": "ssmacro.macro",
    "args": { "file": "convert-lua-to-typescript.json" }
  }
]
```

<br />

### 4) Open a Lua File and Convert It

Open a big Lua file and use the hotkey to perform the replacements on everything in the file.

<br />

### 5) Copy It Over One Function at a Time

If you copy an entire file into your TypeScript project at once, then it will be kind of a mess and the auto-formatter won't work. Instead, just copy one function at a time into the corresponding TypeScript file, fix the errors, if any, and let the auto-formatter do the work of arranging everything properly. (You run the auto-formatter by simply saving the file, since it is configured by default to run on save.)

A lot of the time, you won't be able to fix some of the errors, like functions that are being called that are not declared yet. Just ignore those until you get everything copied over.
