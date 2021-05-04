---
title: Gotchas
---

This page lists several "gotchas" or things that might be weird about IsaacScript.

<br />

### Extending Enums --> Custom Enums

In your Lua mods, you may have extended the game's built-in enums. For example:

```lua
-- At the top of your Lua mod:
CollectibleType.COLLECTIBLE_MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item")

-- Elsewhere in the code:
if (
  player:HasCollectible(CollectibleType.COLLECTIBLE_MY_CUSTOM_ITEM)
  and player:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
) then
  -- Handle the specific synergy with My Custom Item + Epic Fetus
end
```

In TypeScript, you cannot extend existing enums for safety reasons. Instead, create your own enum:

```typescript
// At the top of your TypeScript mod:
enum CollectibleTypeCustom {
  COLLECTIBLE_MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item"),
}

// Elsewhere in the code:
if (
  player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_CUSTOM_ITEM)
  && player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
) {
  // Handle the specific synergy with My Custom Item + Epic Fetus
}
```

Note that you don't have to worry about polluting the global namespace: due to how the transpiler works, your enum will be local to your own project.

<br />

### `int` and `float`

In Lua, there is only one type of number. (The programming language doesn't differentiate between integers, floats, etc.)

TypeScript works the same way as Lua. There is only one kind of number type: `number`.

However, the official Isaac API documentation uses integers and floats. For example, this is the entry for the `EntityPlayer:AddCollectible()` function:

```c++
AddCollectible (CollectibleType Type, integer Charge, boolean AddConsumables)
```

In order to more closely match the API, the TypeScript API definitions use `int` and `float` types. Thus, the above function is declared like this:

```typescript
AddCollectible(collectibleType: int, charge: int, addConsumables: boolean): void;
```

If you want, you can use the `int` and `float` types in your own code too (instead of just using `number`, like you would in other typical TypeScript code). But if you do use `int` and `float`, be aware that they are simply aliases for `number`, so they don't provide any actual type safety.

In other words, it is possible to do this, so beware:

```typescript
// Give the player a Sad Onion
player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)

// Find out how many Sad Onions they have
let numSadOnions = player.GetCollectibleNum(CollectibleType.COLLECTIBLE_SAD_ONION)
// numSadOnions is now an "int" with a value of "1"

numSadOnions += 0.5
// numSadOnions is still an "int", but now it has a value of "1.5"
// This is a bug and TypeScript won't catch this for you!
```

<br />

### No Operator Overloading / Vector Addition

Due to [limitations in TypeScriptToLua](https://typescripttolua.github.io/docs/advanced/writing-declarations/#operator-overloads), operator overloads will not work directly. The workaround for this is to call the methods directly.

```lua
-- Lua code
local vector = Vector(1, 1) * 5 + 2
```

```typescript
// TypeScript code
const vector = Vector(1, 1).__mul(5).__add(2)
```

If you are converting Lua code, make sure to account for order of operations:

```lua
-- Lua code
local vector = Vector(1, 1) + Vector(3, 3) * 6 -- Multiplication happens before addition
```

```typescript
// TypeScript code
// Do one thing at a time so that the code is clear to read
let vector = Vector(3, 3);
vector = vector.__mul(6);
vector = vector.__add(Vector(1, 1));
```

<br />

### Using JSON

Isaac mods are allowed to write save data to the "save1.dat", "save2.dat", and "save3.dat" files (for save slot 1, save slot 2, and save slot 3 respectively). This is accomplished via the `Isaac.SaveModData()` function.

Any non-trivial mod will need to save many different variables. Since the `Isaac.SaveModData()` function takes a string instead of a Lua table, it is standard practice to convert a Lua table to a string using JSON. Lua functions to accomplish this are provided with the game in the `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\json.lua` file. All you have to do is require the file:

```lua
-- Lua code
local json = require("json")

-- Register the mod
local Revelations = RegisterMod("Revelations", 1)

-- Define default values for the save data
local RevelationsSaveData = {
  currentHP = 3,
  currentNumFamiliars = 4,
  currentCharge = 10,
}

local function saveModData()
  local encodedData = json.encode(RevelationsSaveData)
  Isaac.SaveModData(Revelations, encodedData)
end
```

In TypeScript, we can directly call the Lua code in the same way. Note that IsaacScript automatically includes type definitions for the `json.lua` file, so you don't have to worry about that part.

```typescript
// TypeScript code
import * as json from "json";

// Register the mod
const Revelations = RegisterMod("Revelations", 1);

// Define default values for the save data
const RevelationsSaveData = {
  currentHP = 3,
  currentNumFamiliars = 4,
  currentCharge = 10,
}

function saveModData() {
  const encodedData = json.encode(RevelationsSaveData)
  Isaac.SaveModData(Revelations, encodedData)
}
```

<br />

### NPM Dependencies

Currently, TypeScriptToLua does not support installing dependencies from NPM. See [this issue](https://github.com/TypeScriptToLua/TypeScriptToLua/issues/432), which should hopefully be resolved soon. This means that it will be cumbersome to write Isaac-specific libraries for people to use.

In the meantime, the `create-isaacscript-mod` tool manually bundles [some initialization code](https://github.com/IsaacScript/create-isaacscript-mod/blob/main/templates/static/isaacScriptInit.ts) in all new projects.

<br />

### No Blank Mod Classes

You cannot instantiate a blank mod object/class:

```typescript
// TypeScript code
const Revelations = RegisterMod("Revelations", 1) // "Revelations" has the type "Mod"

class Foo {
  // We might not want to define a type of "Mod | null", so what if we use a blank class?
  modObject = Mod();
}
const foo = new Foo();

// Later on in the code, we can overwrite it
foo.modObject = Revelations;
```

Doing this will result in an error in the following TypeScriptToLua boilerplate code:

```lua
function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype) -- Error on this line
```

Instead, do something like the following:

```typescript
// TypeScript code
const Revelations = RegisterMod("Revelations", 1) // "Revelations" has the type "Mod"

class Foo {
  modObject: Mod | null = null;
}
const foo = new Foo();

// Later on in the code, we can overwrite it
foo.modObject = Revelations;
```
