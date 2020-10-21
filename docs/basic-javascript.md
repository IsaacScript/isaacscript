---
title: Basic JavaScript/TypeScript
---

If you have never programmed anything in JavaScript before, then it might be a good idea to follow a basic JavaScript tutorial before you start working on a mod. As they say, you have to learn to walk before you can learn to run. There are plenty of online resources out there - just use Google and find something you like. Teaching you how to program well in JavaScript is beyond the scope of this article.

TypeScript is 99% the same as JavaScript. It is a "superset" language, meaning that TypeScript just adds some extra things on top of JavaScript.

In general, JavaScript/TypeScript is pretty similar to Lua. Here are some differences, in no particular order.

<br />

### Convert `nil` --> `null`

```lua
-- Lua code
if entity.SpawnerEntity == nil then
  -- This entity was not spawned by anything in particular
end
```

```typescript
// In TypeScript, you have to put parenthesis around all the conditions of an if
// statement
// In TypeScript, you should always use "===" (strict equals) instead of "=="
// (normal equals)
if (entity.SpawnerEntity === null) {
  // "null" instead of "nil"
  // This entity was not spawned by anything in particular
}
```

<br />

### Colons

Sometimes in Lua, you call functions with a colon, and sometimes you call them with a period. This is kind of annoying.

In TypeScript, you just call everything with a period. Easy.

```lua
-- Lua code
Isaac.ConsoleOutput("hello world")
Game():GetPlayer(0):AddMaxHearts(2)
```

```typescript
// TypeScript code
// This line is the exact same thing as in Lua (not counting the semi-colon)
Isaac.ConsoleOutput("hello world");
// This line is also the same thing, but with periods instead of colons
Game().GetPlayer(0).AddMaxHearts(2);
```

<br />

### Convert `local` --> `const` and `let`

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
fart += " modified";
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
// The "isaac-typescript-definitions" package is automatically imported by
// IsaacScript when you create a new project
function PostPlayerInit(player: EntityPlayer) {
  // Now, TypeScript has full knowledge of all the legal methods for "player"
  // Our editor can now tab-complete everything
  // And if we make a typo on "AddCollectible",
  // the editor will immediately tell us
  player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);
}

Revelations.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostPlayerInit);
```

<br />

### Extending Enums --> Custom Enums

In your Lua mods, you may have extended the game's built-in enums. For example:

```lua
-- At the top of your mod:
CollectibleType.COLLECTIBLE_MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item")

-- Elsewhere in the code:
if (
  player:HasCollectible(CollectibleType.COLLECTIBLE_MY_CUSTOM_ITEM)
  and player:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
) then
  -- Handle the specific synergy with My Custom Item + Epic Fetus
  -- etc.
end
```

In TypeScript, you cannot extend existing enums for safety reasons. Instead, create your own enum:

```typescript
// At the top of your mod:
enum CollectibleTypeCustom {
  COLLECTIBLE_MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item")
}

// Elsewhere in the code:
if (
  player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_CUSTOM_ITEM)
  and player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
) {
  // Handle the specific synergy with My Custom Item + Epic Fetus
  // etc.
}
```

Don't worry - due to how the transpiler works, your enum will be local to your own project and will not pollute the global namespace.

<br />

### Splitting Your Code Into Multiple Files: `require()` --> `import`

In Lua, you split your code into multiple files by using `require()`. In TypeScript, this is done with `import`. (Don't ever use `require()`, which is only used in older JavaScript code.)

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
import * as PostPlayerInit from './PostPlayerInit';
// (we don't have to worry about the lowercase Linux hack since we are bundling
// all of our code into one "main.lua" file)

const Revelations = RegisterMod("Revelations", 1);
Revelations.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, PostPlayerInit.Main);
```

```typescript
// PostPlayerInit.ts
export function Main(player: EntityPlayer) {
  player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
}
```

<br />

### Using Global Variables

Sometimes, your mod might need to use a global variable exported by someone else's mod. For example, maybe you need to use the `InfinityTrueCoopInterface` global variable from the True Co-op Mod.

<br />

#### Option 1 - Inline Declarations

You can add the global declaration right before the code:

```lua
-- Lua code
if InfinityTrueCoopInterface ~= nil then
  -- The user has the True Coop mod enabled, so now do something
end
```

```typescript
// TypeScript code
declare global {
  const InfinityTrueCoopInterface: null | unknown;
}
if (InfinityTrueCoopInterface !== null) {
  // The user has the True Coop mod enabled, so now do something
}
```

<br />

#### Option 2 - A Separate File

A much better way is to make a file that corresponds to the variable / table. From the root of your project, create the `src/types/InfinityTrueCoopInterface.d.ts` file, and put the following in it:

```typescript
declare const InfinityTrueCoopInterface: null | unknown;
```

Now, your other TypeScript files will see it as a global variable without you having to do anything else.

<br />

#### More Complicated Declarations

The `InfinityTrueCoopInterface` allows other mods to add new characters with the `AddCharacter` method. What if your mod creates a new character and you want to add it to the True Coop Mod? If you try calling `InfinityTrueCoopInterface.AddCharacter()`, TypeScript will say that it doesn't exist.

The solution is to add that method to the definition file. We need to flesh out the `src/types/InfinityTrueCoopInterface.d.ts` file a bit:

```typescript
// The global variable exists and it is a Lua table of type TrueCoop,
// which we will immediately define below
declare const InfinityTrueCoopInterface: TrueCoop;

// We declare a TrueCoop class that only has one method
declare class TrueCoop() {
  AddCharacter(playerData: TrueCoopPlayerData)
}

// We also have to specify what the True Coop mod expects to be passed for this
// method
// This (partially) matches the documentation near the top of the "main.lua"
// file for the True Coop Mod
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
