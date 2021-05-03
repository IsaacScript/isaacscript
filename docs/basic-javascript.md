---
title: Basic JavaScript/TypeScript
---

This page shows off some of the differences between Lua and TypeScript. Below, you can compare Lua code side by side with the equivalent TypeScript code. For experienced coders, reading through this page will probably be enough to get you started.

With that said, this page isn't meant to cover everything about TypeScript. If you still have questions, we recommend reading the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) or just searching [Stack Overflow](https://stackoverflow.com/).

<br />

## Level 1 - Basic

<br />

### Comments

```lua
-- This is a single-line comment in Lua

--[[

This is a multi-line comment in Lua.
It's very long.
And wordy.

--]]
```

```typescript
// This is a single-line comment in TypeScript

/*

This is a multi-line comment in TypeScript.
It's very long.
And wordy.

*/
```

<br />

### Semi-Colons

Unlike Lua, TypeScript code should have semi-colons after every line.

```lua
-- Lua code
Isaac.DebugString("hello world")
```

```typescript
// TypeScript code
Isaac.DebugString("hello world");
```

But don't bother typing the semi-colons yourself - just hit `Ctrl + s` and the editor will automatically insert them for you. That's [Prettier](https://prettier.io/) doing its job.

(In fact, you should always hit `Ctrl + s` periodically as you code, so that the code is constantly formatting itself. This frees you from the tedium of aligning things, breaking up long if statements, and so forth. If the file is not auto-formatting itself, then you probably need to add a bracket somewhere so that the code can properly compile.)

<br />

### Colons

Sometimes in Lua, you call functions with a colon, and sometimes you call them with a period. This is kind of annoying.

In TypeScript, you just call everything with a period. Easy.

```lua
-- Lua code
Isaac.DebugString("hello world")
Game():GetPlayer(0):AddMaxHearts(2)
```

```typescript
// TypeScript code
// This line is the same thing as in Lua
Isaac.DebugString("hello world");
// This line is also the same thing, but with periods instead of colons
Game().GetPlayer(0).AddMaxHearts(2);
```

<br />

### `if` Statements and Operators

In TypeScript, you have to put parentheses around the conditions of an if statement.

Also, the operators are a bit different:

- `and` --> `&&`
- `or` --> `||`
- `==` --> `===`
- `~=` --> `!==`
- `..` --> `+`

For example:

```lua
-- Lua code
if x == 1 and y ~= 0 then
  -- Do something
end
```

```typescript
// TypeScript code
if (x === 1 && y !== 0) {
  // Do something
}
```

<br />

### `nil` --> `null`

```lua
-- Lua code
if entity.SpawnerEntity == nil then
  -- This entity was not spawned by anything in particular
end
```

```typescript

if (entity.SpawnerEntity === null) {
  // This entity was not spawned by anything in particular
}
```

<br />

### `local` --> `const` and `let`

In Lua, you generally type `local` before everything to stop it from being turned into a global.

In TypeScript, this isn't necessary. There are no globals variables, unless we explicitly create one.

Furthermore, in TypeScript, there are two kinds of variable declarations: `let` and `const`.<br />
(Don't ever use `var`, which is only used in older JavaScript code.)

```lua
-- Lua code
local poop = "poop"
local fart = "fart"
fart = fart .. " modified" -- fart is now equal to "fart modified"

local function getPoop()
  return "poop"
end
```

```typescript
// TypeScript code
const poop = "poop"; // We use "const" because this value never changes
let fart = "fart"; // We use "let" because we have to modify it later
// We use the "+=" operator instead of ".." to concatenate a string
fart += " modified"; // fart is now equal to "fart modified"

function getPoop() { // No local here
  return "poop";
}
```

<br />

### TypeScript Type Annotations

The main thing that TypeScript adds to JavaScript is type annotations. Here's a quick example:

```lua
-- Lua code
local Revelations = RegisterMod("Revelations", 1)

local function PostPlayerInit(player)
  player:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
end

Revelations:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostPlayerInit);
```

```javascript
// JavaScript code
const Revelations = RegisterMod("Revelations", 1);

function PostPlayerInit(player) {
  player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
}

Revelations.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostPlayerInit);
```

```typescript
// TypeScript code
const Revelations = RegisterMod("Revelations", 1);

// Below, we mark "player" as a "EntityPlayer" type (by using a colon)
// The "EntityPlayer" type is automatically provided by the
// "isaac-typescript-definitions" package, and corresponds to the "EntityPlayer"
// in the official docs
// The "isaac-typescript-definitions" package is automatically imported in any
// IsaacScript project
function PostPlayerInit(player: EntityPlayer) {
  // Now, TypeScript has knowledge of all the legal methods for "player"
  // Our editor can now tab-complete everything
  // And if we make a typo on "AddCollectible",
  // the editor will immediately tell us
  player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
}

Revelations.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostPlayerInit);
```

<br />

## Level 2 - Advanced

<br />

### Splitting Your Code Into Multiple Files: `require()` --> `import`

In Lua, you split your code into multiple files by using `require()`. In TypeScript, this is done with `import`. (Don't ever use the JavaScript/TypeScript version of `require()`, which is only used in older JavaScript code.)

```lua
-- main.lua
local PostPlayerInit = require("revelations.postplayerinit")
-- (the text in "require()" must be lowercase in order for mods to work on
-- Linux, even if the files on the file system are not actually lowercase)

local Revelations = RegisterMod("Revelations", 1)
Revelations:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostGameStarted.Main);
```

```lua
-- PostPlayerInit.lua
local PostPlayerInit = {}

function PostPlayerInit:Main(player)
  player:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
end

return PostPlayerInit
```

```typescript
// main.ts
import * as postPlayerInit from './postPlayerInit';
// (we don't have to worry about the lowercase Linux hack since we are bundling
// all of our code into one "main.lua" file)

const Revelations = RegisterMod("Revelations", 1);
Revelations.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit.Main);
```

```typescript
// postPlayerInit.ts
export function Main(player: EntityPlayer) {
  player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
}
```

<br />

### Importing Global Variables

Sometimes, your mod might need to use a global variable exported by someone else's mod. For example, maybe you need to use the `InfinityTrueCoopInterface` global variable from the True Co-op Mod.

<br />

#### Option 1 - Inline Declarations

You can add the global declaration right before the code:

```lua
-- Lua code
if InfinityTrueCoopInterface ~= nil then
  -- The user has the True Co-op mod enabled, so now do something
end
```

```typescript
// TypeScript code
declare const InfinityTrueCoopInterface: null | unknown;
if (InfinityTrueCoopInterface !== null) {
  // The user has the True Co-op mod enabled, so now do something
}
```

<br />

#### Option 2 - A Declaration File

If you need to check for `InfinityTrueCoopInterface !== null` in more than one place in your mod, then option 1 is bad, because you would be [need to repeat yourself before each check](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Instead, make a TypeScript definition file that corresponds to the variable / table.

For example, to declare `InfinityTrueCoopInterface`, starting from the root of your project:
- Create the `src/types` directory.
- Create the `src/types/InfinityTrueCoopInterface.d.ts` file.
- Put the following in it:

```typescript
declare const InfinityTrueCoopInterface: null | unknown;
```

Now, your other TypeScript files will see it as a global variable without you having to do anything else.

<br />

#### More Complicated Declarations

The `InfinityTrueCoopInterface` allows other mods to add new characters with the `AddCharacter` method. What if your mod creates a new character and you want to add it to the True Co-op Mod? If you try calling `InfinityTrueCoopInterface.AddCharacter()`, TypeScript will throw and error and say that it doesn't exist.

The solution is to add the `AddCharacter()` method to the definition file. We need to flesh out the `src/types/InfinityTrueCoopInterface.d.ts` file a bit:

```typescript
// The global variable exists and it is a Lua table of type TrueCoop,
// which we will immediately define below
declare const InfinityTrueCoopInterface: TrueCoop;

// We declare a TrueCoop class that only has one method
declare class TrueCoop() {
  AddCharacter(playerData: TrueCoopPlayerData)
}

// We also have to specify what the True Co-op mod expects to be passed for this
// method
// This (partially) matches the documentation near the top of the "main.lua"
// file for the True Co-op Mod
interface TrueCoopPlayerData {
  Name: string;
  Type: PlayerType;
  SelectionGfx: string;
  GhostCostume: NullCostumeID;
  MaxHearts: int;
  Hearts: int;
  // etc.
}
```

<br />

### Exporting Global Variables

In Lua, some mods export functionality by using a global variable:

```lua
-- A Lua file in someone else's mod
RevelationsVersion = "2.1" -- "RevelationsVersion" is now a global variable
```

In TypeScript:

```typescript
declare let RevelationsVersion: string;
RevelationsVersion = '2.1'; // "RevelationsVersion" is now a global variable
```

Building on this example, you can also expose both variables and methods:

```typescript
class Exports() {
  IncreaseStrength(amount: int) {
    // [code here, etc.]
  }
}
const exports = new Exports()

declare let RevelationsExports: Exports;
RevelationsExports = exports; // "RevelationsExports" is now a global variable
```
