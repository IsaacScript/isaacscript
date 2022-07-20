---
title: Features
hide_table_of_contents: true
---

IsaacScript is a framework that allows you to code [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/) mods using the [TypeScript](https://www.typescriptlang.org/) programming language instead of the [Lua](https://www.lua.org/) programming language. It automatically converts your TypeScript code into optimized Lua, similar to how a C++ compiler automatically converts C++ code into X86.

So why would you want to use TypeScript over Lua? Why would you want to introduce a compiler into your workflow and make things more complicated?

Programming mods in Lua can be really painful. Because it isn't type safe, it is easy to shoot yourself in the foot after making even the smallest typo. And while the tooling in Lua has gotten better in the past few years (e.g. [the Lua language server](https://github.com/sumneko/lua-language-server)), it still doesn't hold a candle to what TypeScript has to offer.

After five years of programming Isaac mods in Lua, I got frustrated enough to take a [level 2 action](https://www.lesswrong.com/posts/guDcrPqLsnhEjrPZj/levels-of-action) - to build the ultimate Isaac developer experience, using TypeScript as a basis. The improvement is so significant that once you start, you will never go back. Here's a short list of features:

### <img src="/img/items/magic-mushroom.png" className="features-icon" /> The Entire Isaac API, Strongly Typed

- Code fearlessly without having to worry about making a typo.

### <img src="/img/items/marked.png" className="features-icon" /> Mouseover Documentation

- Don't waste time looking up API methods in the docs. Instead, mouseover them to see what they do and what parameters they expect.
- Many methods have extensive documentation written inside of the mouseover tooltip.

### <img src="/img/items/clockwork-assembly.png" className="features-icon" /> Automatic Mod Reloading

- Never close and reopen your game again when working on your mods.
- Never type the `luamod` console command again.
- If you use `require` hacks to get around the limitations of `include`, don't bother - that isn't needed here.

### <img src="/img/items/humbling-bundle.png" className="features-icon" /> Extra Enums

- Seamlessly utilize [community-contributed enums](https://isaacscript.github.io/isaac-typescript-definitions/modules#enumerations) for things that the developers forgot to include in the "enums.lua" file.

### <img src="/img/items/pencil.png" className="features-icon" /> Automatic Formatting

- Never waste time formatting a file again. Automatic file formatting with [Prettier](https://prettier.io/) comes running out-of-the-box.

### <img src="/img/items/spider-mod.png" className="features-icon" /> Automatic Linting

- Squash all the bugs and ensure code consistency with the world's best linter, [ESLint](https://eslint.org/). It comes running out-of-the-box.

### <img src="/img/items/poke-go.png" className="features-icon" /> Extra Callbacks

- Ever wish that there was a callback for the particular thing you are working on? Wish no longer.
- IsaacScript mods can use [many extra callbacks](/isaacscript-common/other/enums/ModCallbackCustom.md) as part of the expanded standard library.

### <img src="/img/items/book-of-virtues.png" className="features-icon" /> Expanded Standard Library

- In Lua, leveraging 3rd party modules is a pain, so you typically end up copy-pasting the same boilerplate functions into your mods. But there's a better way.
- IsaacScript offers [an expanded standard library](/isaacscript-common) out of the box for you to use, allowing you to write high-level code that is concise and easy to read.

### <img src="/img/items/box.png" className="features-icon" /> Save Data Manager

- The best mods serialize all state to disk so that saving and continuing a run results in a seamless experience. But getting this right is tricky.
- Optionally leverage IsaacScript's build-in save data manager that allows for automatic resetting of variables and keeping mod-feature variables scoped as locally as possible.

### <img src="/img/items/undefined.png" className="features-icon" /> Crash Debugging

- Troubleshooting crashes is no longer a nightmare. Enable crash debugging and IsaacScript will tell you the exact line that the game crashed on.

### <img src="/img/items/bffs.png" className="features-icon" /> TypeScript

Enjoy all the benefits of a strongly typed language:

- Never make a typo on a variable name again. Or a function name. Or an import. You get the point.
- Split code up into separate files without risking something breaking when you rename something.
- Your editor shows you the **exact** variables and functions that you can use.
- Auto-complete **everything** you type, making programming a breeze.
- Auto-completing functions automatically imports it from the right place! Or, use the <code>Ctrl + .</code> hotkey to automatically import whatever the cursor is over.
- Use the <code>F12</code> hotkey (for "Go to Definition") to automatically jump around in your code. Press <code>Alt + Left</code> to return.
- Use the <code>F2</code> hotkey to rename a variable. The editor will automatically rename it everywhere in your entire project!
- Use the <code>Shift + Alt + F12</code> hotkey (for "Find All References") to automatically find all places where something is used. With this, it is trivial to work your way backwards from a nested function.
- And more!

<br />

There are plenty of reasons to use IsaacScript, but it isn't for everyone. Read on.
