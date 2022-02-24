---
title: Features
hide_table_of_contents: true
---

They say that every programming language has some pros and some cons. However, after five years of programming mods in Lua for <em>The Binding of Isaac: Repentance</em>, I have not found very many pros. It is incredibly easy to shoot yourself in the foot after making even the smallest typo. And it doesn't have the tooling that we take for granted when programming in other modern languages.

But we don't have to suffer anymore. The `isaacscript` framework allows us to program Isaac mods in TypeScript. And once you start, you will never go back. Here's a short list of features:

### <img src="/img/items/magic-mushroom.png" className="features-icon" /> The Entire Isaac API, Strongly Typed

- Code fearlessly without having to worry about making a typo or having to look at the docs.

### <img src="/img/items/marked.png" className="features-icon" /> Mouseover Documentation

- Mouseover API calls to see what they do and what parameters they expect.
- Hopefully, you will never have to open the Isaac documentation ever again. Good riddance.

### <img src="/img/items/dead-eye.png" className="features-icon" /> Better API Accuracy

- The Isaac documentation is wrong in a lot of places. Some functions are not implemented and some functions make the game crash.
- Don't bother waiting for a patch - the `isaacscript` framework fixes everything for you.

### <img src="/img/items/clockwork-assembly.png" className="features-icon" /> Automatic Mod Reloading

- Never close and reopen your game again when working on your mods.
- Never type the `luamod` console command again.
- If you use `require` hacks to get around the limitations of `include`, don't bother - that isn't needed here.

### <img src="/img/items/humbling-bundle.png" className="features-icon" /> Extra Enums

- Seamlessly utilize [community-contributed enums](https://github.com/IsaacScript/isaac-typescript-definitions/tree/main/typings/unofficial) for things that the developers forgot to include in the "enums.lua" file.

### <img src="/img/items/pencil.png" className="features-icon" /> Automatic Formatting

- Never waste time formatting a file again. Automatic file formatting with [Prettier](https://prettier.io/) comes running out-of-the-box.

### <img src="/img/items/spider-mod.png" className="features-icon" /> Automatic Linting

- Squash all the bugs and ensure code consistency with the world's best linter, [ESLint](https://eslint.org/). It comes running out-of-the-box.

### <img src="/img/items/poke-go.png" className="features-icon" /> Extra Callbacks

- Ever wish that there was a callback for the particular thing you are working on? Wish no longer.
- IsaacScript mods can use [many extra callbacks](function-signatures-custom.md) as part of the expanded standard library.

### <img src="/img/items/book-of-virtues.png" className="features-icon" /> Expanded Standard Library

- In Lua, leveraging 3rd party modules is a pain, so you typically end up copy-pasting the same boilerplate functions into your mods. But there's a better way.
- IsaacScript offers [an expanded standard library](https://isaacscript.github.io/isaacscript-common/) out of the box for you to use, allowing you to write high-level code that is concise and easy to read.

### <img src="/img/items/box.png" className="features-icon" /> Save Data Manager

- The best mods serialize all state to disk so that saving and continuing a run results in a seamless experience. But getting this right is tricky.
- Optionally leverage IsaacScript's build-in save data manager that allows for automatic resetting of variables and keeping mod-feature variables scoped as locally as possible.

### <img src="/img/items/undefined.png" className="features-icon" /> Crash Debugging

- Troubleshooting crashes is no longer a nightmare. Enable crash debugging and IsaacScript will tell you the exact line that the game crashed on.

### <img src="/img/items/bffs.png" className="features-icon" /> TypeScript

Enjoy all the benefits of a strongly typed language over the shit-show that is Lua:

- Never make a typo on a variable name again. Or a function name. Or an import. You get the point.
- Split code up into separate files without risking something breaking when you rename something.
- Your editor shows you the **exact** variables and functions that you can use.
- Auto-complete **everything** you type, making programming a breeze.
- Auto-completing functions automatically imports it from the right place! Or, use the <code>Ctrl + .</code> hotkey to automatically import whatever the cursor is over.
- Use the <code>F12</code> hotkey (for "Go to Definition") to automatically jump around in your code. Press <code>Alt + Left</code> to return.
- Use the <code>F2</code> hotkey to rename a variable. The editor will automatically rename it everywhere in your entire project!
- Use the <code>Shift + Alt + F12</code> hotkey (for "Find All References") to automatically find all places where something is used. With this, it is trivial to work your way backwards from a nested function.
- And more!

<br>

There are plenty of reasons to use IsaacScript, but it isn't for everyone. Read on.
