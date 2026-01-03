---
title: Using IsaacScript in Lua
---

<!-- markdownlint-disable MD034 -->

A [library](<https://en.wikipedia.org/wiki/Library_(computing)>) is a collection of helper functions and features that make writing your program easier. Instead of sticking a ton of low-level code in your program, you can instead call a single library function, abstracting away all the complexity and keeping your program nice and clean. In the Isaac modding scene, libraries are really great because the standard API is quite limited.

The IsaacScript framework contains two _Binding of Isaac: Repentance_ libraries:

- `isaac-typescript-definitions` - A leveled-up version of the vanilla enums with many bug fixes and community contributed additions for everything that the developers forgot to include. You can learn more about every enum by [reading the documentation](/isaac-typescript-definitions).
- `isaacscript-common` - Helper functions and features that abstract away much of the complexity in working with the Isaac API. It's the biggest and most advanced Isaac library ever written. You can learn more about every function and feature by [reading the documentation](/isaacscript-common).

If you are writing your mod in [TypeScript](features.md), then using these libraries is effortless - you can just start typing the names of the enums or functions, and the auto-complete will automatically import them (and include them in your final bundled mod).

If you are writing your mod in Lua, then you can also leverage the power of these libraries by downloading the `isaacscript-common.lua` file and placing it alongside your Lua code. Read on for the specifics.

Note that for Lua users, both `isaac-typescript-definitions` and `isaacscript-common` are combined into one library bundle, so all you need is one file. From here on out, both libraries will be simply referred to as "the library".

<br />

## Automatic Installation (Optional)

If you have Python installed on your computer and you know what a terminal/shell is, then the easiest way to install the library is to use the `isaacscript-lua` Python tool. Otherwise, you can use the [manual installation](#manual-installation) (see below).

- In a terminal, navigate to the directory of your mod.
- Install the tool: `python -m pip install isaacscript-lua --upgrade`
- Install the Lua library: `isaacscript-lua install`

If you get `ERROR: Could not find a version that satisfies the requirement isaacscript-lua (from versions: none)`, that means that your version of Python is too old. Make sure that you have Python version 3.10 or later installed.

<br />

## Manual Installation

Here, "installing" is a loose term. All you really need to do is to put the `isaacscript-common.lua` file inside your mod. (This is essentially the same thing as copy-pasting code snippets directly into your mod, except that the library code lives in its own dedicated file.)

### Step 1 - Download the Library

Download it from the npm registry: https://unpkg.com/isaacscript-common@latest/dist/isaacscript-common.lua

Use right-click + save link as.

(Note that by specifying "latest" as the version in the URL, the website will redirect us to the numbers that correspond to the latest version.)

It will save to a file called "isaacscript-common.lua".

### Step 2 - Put It In Your Mod

- Create a subdirectory in your mod called the same thing as you mod.
  - For example, if your mod is located at `C:\Repositories\revelations`, create a subdirectory called `C:\Repositories\revelations\revelations`.
- Create a subdirectory in the new directory called `lib`.
  - For example, if your mod is located at `C:\Repositories\revelations`, create a subdirectory called `C:\Repositories\revelations\revelations\lib`.
- Put the "isaacscript-common.lua" file in the `lib` directory.
  - For example, if your mod is located at `C:\Repositories\revelations`, it would go to `C:\Repositories\revelations\revelations\lib\isaacscript-common.lua`.

In other words, your file structure should look something like this:

```text
my-mod/
|── main.lua (the Lua entry point to your mod)
|── metadata.xml (the Steam Workshop file)
└── my-mod/ (a subdirectory with the same name as your mod for the purpose of preventing namespace conflicts)
    └── lib/ (a subdirectory that contains 3rd-party library code)
        └── isaacscript-common.lua
```

(Creating a directory of the same name is necessary because in the Isaac environment, we must [namespace all of our code](https://wofsauge.github.io/IsaacDocs/rep/tutorials/Using-Additional-Lua-Files.html#the-namespacing-problem-with-require). As the documentation explains, using `include` does not obviate the need to do this because we need the ability to access the library in more than one Lua file. Having to namespace code is one of the disadvantages of using Lua instead of TypeScript.)

<br />

## Basic Usage

### Import the Library

At the top of the Lua file where you want to use the library, use the following import statement:

```lua
local isc = require("my-mod.lib.isaacscript-common")
```

Note that:

- You must replace "my-mod" with the name of your mod, which corresponds to the namespaced directory from the previous step.
- The period in the `require` invocation is a directory separator. (It is conventional in Lua to use a period instead of a slash.)
- You must repeat this import statement in every Lua file where you use the library. (One disadvantage of using Lua over TypeScript is that you don't have automatic imports.)

### Using Pure Functions

Most functions in the library are exported from the root. For example:

```lua
local isc = require("my-mod.lib.isaacscript-common")

local function anyPlayerHasSadOnion()
  return isc:anyPlayerHasCollectible(CollectibleType.COLLECTIBLE_SAD_ONION)
end

if anyPlayerHasSadOnion() then
  print("One or more players has a Sad Onion.")
end
```

Note that similar to most Lua libraries, you must use a colon (instead of a period) when invoking functions, since the library is an exported module.

### Using Enums

As previously mentioned, the enums from `isaac-typescript-definitions` are also exported from `isaacscript-common` for your use.

For example, there is no vanilla `GaperVariant` enum, but in IsaacScript, there is:

```lua
if entity.Type == EntityType.ENTITY_GAPER and entity.Variant === isc.GaperVariant.FLAMING_GAPER then
  print("This is a Flaming Gaper!")
end
```

One of the advantages of the improved enums is that they don't have the pointless prefix. So you could slightly improve the previous code snippet like this:

```lua
if entity.Type == isc.EntityType.GAPER and entity.Variant === isc.GaperVariant.FLAMING_GAPER then
  print("This is a Flaming Gaper!")
end
```

As a general safety practice, you should always use the library enums over the vanilla enums because the vanilla enums are not safe - they can be modified by other mods and deleted.

<br />

### Using Custom Callbacks

Like any good library, importing anything in `isaacscript-common` will not cause any code to be executed in your mod. Most of its functions are [pure functions](https://en.wikipedia.org/wiki/Pure_function).

However, in order for [the custom callbacks](/isaacscript-common/other/enums/ModCallbackCustom) and the [extra features](#using-extra-features) to work, some code does need to be executed. This is because these features need to track when certain things happen in-game. In order to enable this functionality, you must upgrade your mod with the `upgradeMod` function.

For example:

```lua
local isc = require("my-mod.lib.isaacscript-common")

local modVanilla = RegisterMod("Foo", 1)
local mod = isc:upgradeMod(modVanilla)

-- Register normal callbacks.
mod:AddCallback(ModCallbacks.MC_USE_ITEM, function(collectibleType)
  Isaac.DebugString("MC_USE_ITEM fired - item was: " .. tostring(collectibleType))
end)

-- Register custom callbacks.
mod:AddCallbackCustom(isc.ModCallbackCustom.POST_ITEM_PICKUP, function(player, pickingUpItem)
  Isaac.DebugString("POST_ITEM_PICKUP fired - item was: " .. tostring(pickupUpItem.subType))
end)
```

<br />

### Using Extra Features

Some helper functions rely on stateful tracking (like `isPlayerUsingPony`) or store data about what you want to do for later (like `setHotkey`). These fall under the category of "extra features". Since they are non-pure, you are only able to access them if you upgrade your mod. However, this is slightly different than upgrading your mod for custom callbacks.

Instead of activating every feature when you upgrade your mod, the standard library keeps things blazing fast by only activating the specific features that you need. Thus, when you upgrade your mod, you have to tell the library which features you want by passing them as the second argument to the `upgradeMod` function.

For example:

```lua
local isc = require("my-mod.lib.isaacscript-common")

local modVanilla = RegisterMod("Foo", 1)
local features = { -- An array of features.
  isc.ISCFeature.PONY_DETECTION,
}
local mod = isc:upgradeMod(modVanilla, features)

mod:AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, function (player)
  local usingPony = mod:isPlayerUsingPony(player);
  Isaac.DebugString("Is this player using a Pony? " .. tostring(usingPony));
end)
```

Here, by specifying that we want the "pony detection" feature, extra methods are added on to the mod object. Then, we can proceed to use those methods throughout our mod.

<br />

## Updating the Library

The `isaac-typescript-definitions` and `isaacscript-common` packages change frequently with bug fixes and new features. You can read about the latest changes on the [change log](change-log.md) or by reading the [commits to the monorepo](https://github.com/IsaacScript/isaacscript/commits/main). Subsequently, it is a good idea to keep your library version up to date.

- The version of your downloaded library can be found in a comment at the top of your `isaacscript-common.lua` file.
- The latest version of the `isaacscript-common` library can be found on [the npm page](https://www.npmjs.com/package/isaacscript-common) (below the title at the top of the page).

To update, you can manually download the latest Lua file again from the links above. Or, if you have the `isaacscript-common` Python tool installed, you can simply run: `isaacscript-common update`

<br />

## Using JavaScript/TypeScript Array Methods in Lua

In JavaScript/TypeScript, arrays come preloaded with [a bunch of useful methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) such as `map` and `filter`, which allow you to write functional, high-level code.

Many of these array methods are now provided as [convenience functions](/isaacscript-common/functions/arrayLua) inside of `isaacscript-common` specifically for Lua users who don't have these methods natively.

If you find yourself using a `for` loop to iterate over an array - stop. Become a better programmer and [use a higher-order function instead.](https://www.syncfusion.com/blogs/post/javascript-higher-order-functions-a-complete-guide.aspx)

<br />

## Steam Workshop

You might be wondering why `isaacscript-common` is not offered on the Steam Workshop. Having Isaac libraries live on the workshop is a poor design choice, as it forces end-users to subscribe to an extra thing. When someone wants to play your mod, they should only have to subscribe to one thing - your mod.

Furthermore, having the library logic bundled with the mod preserves backwards compatibility and ensures that library is tightly-coupled to the mod logic that is using it. It also allows the mod author to be in complete control of when they update to the latest version, if ever. This also allows the upstream library to make breaking changes and stay clean without having to worry about having perpetual technical debt.

<br />

## The IsaacScript Stage Library

The IsaacScript standard library contains the ability to create [custom stages](custom-stages.md), which was inspired by StageAPI and aims [to improve upon it](custom-stages.md#motivation).

<!-- cspell:ignore setcustomstage -->

Note that some of the custom stage functions (such as e.g. `setCustomStage`) cannot be used in Lua, since they require a compiler to generate the custom stage metadata. For advanced users, you could manually prepare the metadata, but at that point you would probably be better off using [StageAPI](https://github.com/Meowlala/BOIStageAPI15), since nothing you write is going to be type safe anyway.

<br />

## File Size

The file size of the library is around 2 megabytes, so using the library will increase the total size of your mod by that amount. With that said, the file size of your mod is mostly irrelevant for a few reasons. This is a common misconception by newer programmers, so it is worth taking a few minutes to explain why this is.

### Running Time

A library's run-time is defined as the time it takes for its code to execute while the player is inside of the game, actively playing. Just because a library has a large file size does not mean that it takes a long time to execute. Obviously, not all lines of code are created equal, and different kinds of code will take varying amounts of time to execute.

As [previously mentioned](#using-custom-callbacks), `isaacscript-common` will not cause any code to be executed in your mod by default. Thus, it has no run-time cost whatsoever if you are just using enums and pure functions.

On the other hand, if you explicitly upgrade your mod, some extra code is executed using some vanilla callbacks. However, the code is extremely efficient such that callback code is only ever executed if you are actually using the specific callback. Thus, thousands of copies of the standard library can run simultaneously without ever measuring a run-time performance penalty.

### Loading Time

Loading time is defined as the time it takes for the game to load the Lua code when the game first boots. Just because a library has a large file size does not mean that it takes a long time for the game to load it.

In general, we care about loading time a lot less than the run-time, because it only happens when the user first launches the game. And it is largely invisible to the end-user playing the mod.

With that said, loading the library has been measured to take around 4 milliseconds. Thus, you could load the library around 250 times in a row before an end-user would ever even start to notice. So, even if you are passionate enough to care about this, the library is around three orders of magnitude too small for it to matter.

### Download Time

Download time is defined as the time it takes to download the mod over Steam. This is probably the place where the size of your mod matters the most.

With that said, we care about download time even less than loading time, because it only happens once on the initial mod download. (It would also happen if you upload a mod patch post-release.) Obviously, this is going to happen a lot less and matter a lot less than the previous two sections.

In 2022, the [average internet speed is 64.7 Mbps](https://www.oberlo.com/statistics/average-internet-speed-by-country). This means that on average, users will be able to download the library in just 0.3 seconds. (Average speed also increases every year, so this number will be even smaller by the time you are reading this.)

How much does 0.3 seconds matter? That depends on your much you value sub-second optimizations that will only happen once-per-user over the lifetime of your product. For most sane people, this will be near-zero.

### Other Assets

Note that for many mods, the size of your assets (e.g. sprite files, sound files, music files, room files) will vastly outweigh the size of all of your code. So even if the file size of your code did matter (which it doesn't), it would quickly become more important to spend time and energy on reducing the file size of the assets instead of worrying about optimizing the code.

In order to further drive home this point home, consider that the most popular Repentance mod of all time is [Fiend Folio](https://steamcommunity.com/sharedfiles/filedetails/?id=2851063440), which clocks in at around 581 megabytes. That is **several orders of magnitude larger than the standard library**, and yet virtually no-one in the Isaac ecosystem cares.

### Minification

It is possible to reduce the file size of the library by using a [Lua minifier](https://www.npmjs.com/package/isaacscript-common). However, it is not recommended to do this, because it will not improve the run-time speed of your mod. (The whole point of minification is to reduce the file size of the mod, but doing that is near-pointless, as the previous four sections have established.)

Furthermore, minification is actively harmful since it will obfuscate the line numbers of your run-time errors. (Run-time errors are mostly non-existent if you use TypeScript, but they happen a ton in Lua.)

## TypeScript

If you find the IsaacScript standard library useful, you should consider using it in a TypeScript mod. TypeScript has the advantage of auto-complete, auto-importing, and the compiler preventing you from ever misusing anything in the library. Taken together, it makes for a dream-like Isaac development experience.

For more information, see the [list of features](features.md). (If you don't know how to program in TypeScript, then you can learn in around [30 minutes](javascript-tutorial.md).)
