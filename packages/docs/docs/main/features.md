---
title: Features
hide_table_of_contents: true
---

IsaacScript is a framework that allows you to code [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/) mods using the [TypeScript](https://www.typescriptlang.org/) programming language instead of the [Lua](https://www.lua.org/) programming language. It automatically converts your TypeScript code into Lua, similar to how a C++ compiler automatically converts C++ code into X86.

<br />

## <img src="/img/lua.png" className="features-language-icon" /> The Downsides of Lua

The vast majority of Isaac mods are programmed in Lua. So why would you want to use TypeScript over Lua? Why would you want to introduce a compiler into your workflow and make things more complicated for yourself?

Programming mods in Lua can be really painful:

### <img src="/img/items/error.png" className="features-icon" /> No Type Safety

With Lua, it is easy to shoot yourself in the foot after making even the smallest typo. When building an Isaac mod, you end up wasting an enormous amount of time running around in-game debugging run-time errors, and pouring through the "log.txt" file. Not my idea of fun, and probably not yours either.

### <img src="/img/items/sad-onion.png" className="features-icon" /> Limited Language Constructs

In Lua, you type `x = x + 1`. In TypeScript, you type `x++`. Lua doesn't have increment/decrement operators, assignment operators, switch statements, optional function arguments, array/object destructuring, or map/filter/reduce. And that's just to start with.

### <img src="/img/items/finger.png" className="features-icon" /> No Automatic Importing

In Lua, you can't just start typing a function and have it magically be imported from where it lives. So you are stuck between using monolithic files (messy), or manually typing "require" over and over (tedious).

### <img src="/img/items/wooden-spoon.png" className="features-icon" /> Bad In-Editor Tooling

Lua has gotten some nifty improvements in the past few years, like [Sumneko's Lua language server](https://github.com/sumneko/lua-language-server). Using the language server brings us some of the in-editor goodies that we are used to from other languages, like variable renaming. But the experience still pales in comparison to other modern programming languages like TypeScript and Rust.

<br />

## <img src="/img/typescript.png" className="features-language-icon" /> The Upsides of TypeScript

After five years of programming Isaac mods in Lua, I got frustrated enough to take a [level 2 action](https://www.lesswrong.com/posts/guDcrPqLsnhEjrPZj/levels-of-action) - to build the ultimate Isaac developer experience, using TypeScript as a basis. The improvement is so significant that once you start, you will never go back. Here's a short list of features:

### <img src="/img/items/magic-mushroom.png" className="features-icon" /> The Entire Isaac API, Strongly Typed

- Code fearlessly without having to worry about the format of the API call or whether using it incorrectly will crash the game.
- The compiler catches every possible type error, making refactoring your code easier than you ever imagined that it could be.

### <img src="/img/items/marked.png" className="features-icon" /> Mouseover Documentation

- Don't waste time looking up API methods in the docs. Instead, hover over the classes and functions in your actual code editor to see what they do and what parameters they expect.
- Many methods have extensive documentation written inside of the mouseover tooltip.

### <img src="/img/items/clockwork-assembly.png" className="features-icon" /> Automatic Mod Reloading

- Never close and reopen your game again when working on your mods. Never type the `luamod` console command again.
- With the IsaacScript watcher, as soon as you press `Ctrl + s` to save a file, you can instantly view the changes in-game without having to do anything else.
- If you use `require` hacks to get around the limitations of `include` + `luamod`, don't bother - that isn't needed here.

### <img src="/img/items/pencil.png" className="features-icon" /> Automatic Formatting

- Never waste time formatting a file again. Automatic file formatting with [Prettier](https://prettier.io/) comes running out-of-the-box.

### <img src="/img/items/spider-mod.png" className="features-icon" /> Automatic Linting

- Squash all the bugs and ensure code consistency with the world's best linter, [ESLint](https://eslint.org/). It comes running out-of-the-box.

### <img src="/img/items/humbling-bundle.png" className="features-icon" /> Extra Enums

- Seamlessly utilize [community-contributed enums](/isaac-typescript-definitions) for things that the developers forgot to include in the "enums.lua" file.

### <img src="/img/items/book-of-virtues.png" className="features-icon" /> Expanded Standard Library

- Seamlessly utilize hundreds of helper functions and features from the [expanded standard library](/isaacscript-common), allowing you to write high-level code that is concise and easy to read.

### <img src="/img/items/poke-go.png" className="features-icon" /> Extra Callbacks

- Seamlessly utilize [many extra callbacks](/isaacscript-common/other/enums/ModCallbackCustom.md) as part of the expanded standard library.

<br />

There are plenty of reasons to use IsaacScript, but it isn't for everyone. Read on.
