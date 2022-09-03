---
title: Using IsaacScript in Lua
---

<!-- markdownlint-disable MD034 -->

The IsaacScript framework contains two libraries:

- `isaac-typescript-definitions` - A leveled-up version of the vanilla enums with many bug fixes and community contributed additions for everything that the developers forgot to include. You can learn more about every enum by [reading the documentation](/isaac-typescript-definitions).
- `isaacscript-common` - Helper functions and features that abstract away much of the complexity in working with the Isaac API. You can learn more about every function and feature by [reading the documentation](/isaacscript-common).

If you are writing your mod in TypeScript, then using these libraries is effortless - you can just start typing the names of the enums or functions, and the auto-complete will automatically import them (and include them in your final bundled mod).

If you are writing your mod in Lua, then you can also leverage the power of these libraries in the same way that you would any other Lua library: by downloading them and putting them alongside your Lua code. Read on for the specifics.

<br />

## Automatic Installation

If you have Python installed on your computer and you know what a terminal/shell is, then the easiest way is to use the `isaacscript-lua` Python tool.

- In a terminal, navigate to the directory of your mod.
- Install the tool: `pip install isaacscript-lua`
- Install the Lua library: `isaacscript-lua install`

<br />

## Manual Installation

### Step 1 - Download the Library

Depending on which library you want to use, download it from the npm registry:

- `isaac-typescript-definitions` - https://unpkg.com/isaac-typescript-definitions@latest/dist/isaac-typescript-definitions.lua
- `isaacscript-common` - https://unpkg.com/isaacscript-common@latest/dist/isaacscript-common.lua

Use right-click + save link as.

(Note that by specifying "latest" as the version, the website will redirect us to the numbers that correspond to the latest version.)

### Step 2 - Put It In Your Mod

Create a subdirectory called `lib` inside the namespaced directory for your mod and put the library file there.

If you do not already have a directory structure for your mod (i.e. all you have is a "main.lua" file), then create a directory structure like this:

```text
my-mod/
|── main.lua (the Lua entry point to your mod)
|── metadata.xml (the Steam Workshop file)
└── my-mod/ (a subdirectory with the same name as your mod for the purpose of preventing namespace conflicts)
    └── lib/ (a subdirectory that contains 3rd-party library code)
        |── isaac-typescript-definitions.lua
        └── isaacscript-common.lua
```

(Creating a directory of the same name is necessary because in the Isaac environment, we must [namespace all of our code](https://wofsauge.github.io/IsaacDocs/rep/tutorials/Using-Additional-Lua-Files.html#the-namespacing-problem-with-require). As the documentation explains, using `include` does not obviate the need to do this because we need the ability to access the library in more than one Lua file.)

<br />

## Basic Usage

### Import the Library

At the top of the Lua file where you want to use the enums or functions, use one of the following import statements, depending on the library that you want to use:

```lua
local itd = require("my-mod.lib.isaac-typescript-definitions")
```

```lua
local isc = require("my-mod.lib.isaacscript-common")
```

Note that:

- You must replace "my-mod" with the name of your mod, which corresponds to the directory in the previous step.
- The period in the `require` invocation is a directory separator. (It is conventional in Lua to use a period instead of a slash.)
- You must repeat this import statement in every Lua file where you use the library. (One disadvantage of using Lua over TypeScript is that you don't have automatic imports.)

### Use the Function or Feature

Every function in the library is exported from the root. Thus, you can simply call any function you want from the `itd` or `isc` import. For example:

```lua
local hasSadOnion = isc:anyPlayerHasCollectible(CollectibleType.COLLECTIBLE_SAD_ONION)
if hasSadOnion then
  print("One or more players has a Sad Onion.")
end
```

Note that similar to most Lua libraries, you must use a colon (instead of a period) when invoking functions, since the libraries are exported modules.

<br />

## Callback and Feature Usage

Like any good library, importing `isaac-typescript-definitions` or `isaacscript-common` will not cause any code to be executed in your mod. Most of its functions are [pure functions](https://en.wikipedia.org/wiki/Pure_function).

However, in order for [the custom callbacks](/isaacscript-common/other/enums/ModCallbackCustom) and the ["Extra Features"](/isaacscript-common/features/characterHealthConversion) to work, some code does need to be executed. This is because these features need to track when certain things happen in-game. In order to enable this functionality, you must upgrade your mod with the `upgradeMod` function. For example:

```lua
-- Imports
local isc = require("my-mod.lib.isaacscript-common")

local modVanilla = RegisterMod("Foo", 1)
local mod = isc:upgradeMod(modVanilla)

-- Register normal callbacks.
mod:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, function()
  Isaac.DebugString("POST_GAME_STARTED fired")
end)

-- Register custom callbacks.
mod:AddCallbackCustom(isc.ModCallbackCustom.POST_PLAYER_INIT_FIRST, function()
  Isaac.DebugString("POST_PLAYER_INIT_FIRST fired")
end)
```

<br />

## Updating the Library

The `isaac-typescript-definitions` and `isaacscript-common` packages change frequently with bug fixes and new features. You can read about the latest changes on the [change log](change-log.md). Subsequently, it is a good idea to keep your library version up to date.

- The version of your downloaded library can be found in a comment at the top of your `isaac-typescript-definitions.lua` or `isaacscript-common.lua` file.
- The latest version of the [`isaac-typescript-definitions` library](https://www.npmjs.com/package/isaac-typescript-definitions) or [`isaacscript-common` library](https://www.npmjs.com/package/isaacscript-common) can be found on their respective npm pages (below the title at the top of the page).

To update, you can manually download the latest Lua file again from the links above. Or, if you have the `isaacscript-common` Python tool installed, you simply run `isaacscript-common update`.

<br />

## Steam Workshop

You might be wondering why `isaac-typescript-definitions` or `isaacscript-common` is not offered on the Steam Workshop. Having Isaac libraries live on the workshop is a poor design choice, as it forces end-users to subscribe to an extra thing. When someone wants to play your mod, they should only have to subscribe to one thing - your mod.

Furthermore, having the library logic bundled with the mod preserves backwards compatibility and ensures that library is tightly-coupled to the mod logic that is using it. It also allows the mod author to be in complete control of when they update to the latest version, if ever. This also allows the upstream library to make breaking changes and stay clean without having to worry about having perpetual technical debt.

<br />

## TypeScript

If you find `isaac-typescript-definitions` or `isaacscript-common` useful, you should consider using these libraries in a TypeScript mod. TypeScript has the advantage of auto-complete, auto-importing, and the compiler automatically preventing you from misusing anything in the library. Taken together, it makes for a dream-like Isaac development experience that has to be seen to be believed.

For more information, see the [list of features](features.md). (If you don't know how to program in TypeScript, then you can learn in just [30 minutes](javascript-tutorial.md).)
