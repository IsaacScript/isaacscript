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
  player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_CUSTOM_ITEM) &&
  player.HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)
) {
  // Handle the specific synergy with My Custom Item + Epic Fetus
}
```

Note that you don't have to worry about polluting the global namespace: due to how the transpiler works, your enum will be local to your own project.

<br />

### `int` and `float`

In Lua, there is only one type of number. (The programming language doesn't differentiate between integers, floats, etc.)

TypeScript works the same way as Lua. There is only one type of number: `number`.

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
player.AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false);

// Find out how many Sad Onions they have
let numSadOnions = player.GetCollectibleNum(
  CollectibleType.COLLECTIBLE_SAD_ONION,
);
// numSadOnions is now an "int" with a value of "1"

numSadOnions += 0.5;
// numSadOnions is still an "int", but now it has a value of "1.5"
// This is a bug and TypeScript won't catch this for you!
```

<br />

### Vector Operators

In Isaac modding, working with Vectors is common. For example, you might want to double the speed of an enemy projectile. Doing this in Lua is simple:

```lua
-- Lua code
-- Double the speed of the projectile
projectile.Velocity = projectile.Velocity * 2
```

This code is the actually the same as writing:

```lua
-- Lua code
-- Double the speed of the projectile
projectile.Velocity = projectile.Velocity:__mul(2)
```

Under the hood, Lua converts the first code snippet to the second code snippet automatically. This is because it understands that `__mul` is a special operator method. Most people write code in the first way instead of the second way, because it is more convenient.

In TypeScript, we unfortunately cannot code in the first way due to [limitations in TypeScriptToLua](https://typescripttolua.github.io/docs/advanced/writing-declarations/#operator-overloads). Since operator overloads will not work, we instead call the convenience methods `add`, `sub`, `mul`, and `div`.

Here's an example:

```lua
-- Lua code
local vector = Vector(1, 1) * 5 + 2
```

```typescript
// TypeScript code
const vector = Vector(1, 1).mul(5).add(2);
```

If you are converting Lua code, make sure to account for order of operations:

```lua
-- Lua code
local vector = Vector(1, 1) + Vector(3, 3) * 6
-- (multiplication happens before addition)
```

```typescript
// TypeScript code
let vector = Vector(3, 3).mul(6).add(Vector(1, 1);
```

Note that if you really need to, you can restore operator overloading for Vectors by creating a [branded type](https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d) with something along the lines of:

```typescript
type Vector = number & { __intBrand: any };
```

But this is **not recommend** because it destroys type-safety.

<br />

### Using TearFlags / BitSet128

First, see the section above on [vector operators](#vector-operators), which explains that you can't use Lua's operator overloading functionality in TypeScript.

In the Repentance DLC, TearFlags were changed from an integer to a new `BitSet128` object. (This is because Lua can only handle 64-bit numbers, and the data type of TearFlags had to change to a 128-bit integer because of all of the new tear effects that were introduced.)

Previously, in Afterbirth+ code, you would add spectral tears to the player like so:

```typescript
const player = Isaac.GetPlayer(0);
player.TearFlags |= TearFlags.TEAR_SPECTRAL;
```

Now, since TearFlags are a `BitSet128` object, we can't directly use bitwise operators anymore. Instead, use the provided [convenience methods](https://github.com/IsaacScript/isaac-typescript-definitions/blob/main/typings/BitSet128.d.ts) like so:

```typescript
const player = Isaac.GetPlayer(0);
player.TearFlags = player.TearFlags.bor(TearFlags.TEAR_SPECTRAL);
```

(`bor` stands for "binary OR".)

As a reminder, remember that to remove a tear flag, you need to use a [bitwise AND with a bitwise NOT](https://stackoverflow.com/questions/3920307/how-can-i-remove-a-flag-in-c). In Afterbirth+, that would look like this:

```typescript
// Remove spectral tears from the player
const player = Isaac.GetPlayer(0);
player.TearFlags &= ~TearFlags.TEAR_SPECTRAL;
```

But now in Repentance, it looks like this:

```typescript
// Remove spectral tears from the player
const player = Isaac.GetPlayer(0);
player.TearFlags = player.TearFlags.band(~TearFlags.TEAR_SPECTRAL);
```

(`band` stands for "binary AND".)

<br />

### Using JSON

Isaac mods are allowed to write save data to the "save1.dat", "save2.dat", and "save3.dat" files (for save slot 1, save slot 2, and save slot 3, respectively). This is accomplished via the `Isaac.SaveModData()` function.

Any non-trivial mod will need to save many different variables. Since the `Isaac.SaveModData()` function takes a string instead of a Lua table, it is standard practice to convert a Lua table to a string using JSON.

Handily, Lua functions to accomplish this are provided with the game in the `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\json.lua` file. All you have to do is require the file:

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
};

function saveModData() {
  const encodedData = json.encode(RevelationsSaveData);
  Isaac.SaveModData(Revelations, encodedData);
}
```

<br />

### Iterating Over Enums

Sometimes, you might want to iterate over an enum. For example, the following Lua code is a pretty good way to detect if the player is pressing any particular button on the keyboard:

```lua
-- Lua code
-- "Keyboard" is an enum provided by the game
for keyName, keyCode in pairs(Keyboard) do
  if Input.IsButtonPressed(keyCode, 0) then
    Isaac.DebugString("Player pressed: " .. keyName)
  end
end
```

In TypeScript, it would be exactly like iterating over any other object:

```typescript
// TypeScript code
// "Keyboard" is an enum provided by the game
for (const [keyName, keyCode] of Object.entries(Keyboard)) {
  if (Input.IsButtonPressed(keyCode, 0)) {
    Isaac.DebugString(`Player pressed: ${keyName}`);
  }
}
```

One important thing to note about this is that iterating over enums **will not happen in order**. This is because Lua's `pairs()` function is designed to return table entries in a random order. If you need to get the contents of a Lua enum in order, then you will have to re-create that data as an array.

Furthermore, it is important that in the previous example, we are iterating over a "normal" enum provided by the game. You **will not be able to iterate over your own enums** in this way because of how TypeScriptToLua transpiles them. In order to increase performance, TypeScriptToLua creates a double mapping of key to value and value to key. For example:

```typescript
enum TestEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}
```

Will transpile to:

```lua
local TestEnum = TestEnum or ({})
TestEnum.ONE = 1
TestEnum[TestEnum.ONE] = "ONE"
TestEnum.TWO = 2
TestEnum[TestEnum.TWO] = "TWO"
TestEnum.THREE = 3
TestEnum[TestEnum.THREE] = "THREE"
```

This means that if you want to iterate over your own enums in a way similar to the previous example, you have to use some type-checking:

```typescript
for (const [key, value] of Object.entries(TestEnum)) {
  if (type(key) !== "string") {
    // Ignore the reverse mappings created by TypeScriptToLua
    continue;
  }

  Isaac.DebugString(`Key: ${key}`);
  Isaac.DebugString(`Value: ${value}`);
}
```

<br />

### NPM Dependencies

Currently, TypeScriptToLua does not support installing dependencies from NPM; see [this issue](https://github.com/TypeScriptToLua/TypeScriptToLua/issues/432). This means that for now, it will be cumbersome to write Isaac-specific libraries for people to use.

Hopefully, this feature will be ready soon.

<br />

### Throwing Errors

Normally, in TypeScript programs, you would handle errors with `throw new Error("foo")`. For example:

```typescript
const player = Isaac.GetPlayer(); // The type of player is "EntityPlayer | null"
if (player === null) {
  throw new Error("Failed to get the player!");
}
player.AddSoulHearts(1); // The type of player is now "EntityPlayer"
```

However, in Isaac mods, this code won't work. It will error with something along the lines of the following:

`[Foo] Error in "foo" call: ...n\The Binding of Isaac Rebirth/mods/foo/main.lua:100: attempt to index a nil value (global 'debug')`

This is because TypeScriptToLua transpiles `throw` to a function that uses Lua's `debug` library, and Isaac does not have access to `debug` for sandboxing reasons. But not to worry, because instead we can simply use Lua's `error()` function. For example:

```typescript
const player = Isaac.GetPlayer(); // The type of player is "EntityPlayer | null"
if (player === null) {
  error("Failed to get the player!");
}
player.AddSoulHearts(1); // The type of player is now "EntityPlayer"
```

(TypeScript is smart enough to know that `error()` can constrain the type of player in the same way that `throw` normally would.)

<br />

### No Blank Mod Classes

You cannot instantiate a blank mod object/class:

```typescript
// TypeScript code
const Revelations = RegisterMod("Revelations", 1); // "Revelations" has the type "Mod"

class Foo {
  // We might not want to define a type of "Mod | null",
  // so what if we use a blank class?
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

To fix this problem, do something like the following:

```typescript
// TypeScript code
const Revelations = RegisterMod("Revelations", 1); // "Revelations" has the type "Mod"

class Foo {
  modObject: Mod | null = null;
}
const foo = new Foo();

// Later on in the code, we can overwrite it
foo.modObject = Revelations;
```
