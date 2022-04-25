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

```ts
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

```ts
AddCollectible(collectibleType: int, charge: int, addConsumables: boolean): void;
```

If you want, you can use the `int` and `float` types in your own code too (instead of just using `number`, like you would in other typical TypeScript code). But if you do use `int` and `float`, be aware that they are simply aliases for `number`, so they don't provide any actual type safety.

In other words, it is possible to do this, so beware:

```ts
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

```ts
// TypeScript code
const vector = Vector(1, 1).mul(5).add(2);
```

If you are converting Lua code, make sure to account for order of operations:

```lua
-- Lua code
local vector = Vector(1, 1) + Vector(3, 3) * 6
-- (multiplication happens before addition)
```

```ts
// TypeScript code
let vector = Vector(3, 3).mul(6).add(Vector(1, 1);
```

Note that if you really need to, you can restore operator overloading for Vectors by creating a [branded type](https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d) with something along the lines of:

```ts
type Vector = number & { __intBrand: unknown };
```

But this is **not recommend** because it destroys type-safety.

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

```ts
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

```ts
// TypeScript code
// "Keyboard" is an enum provided by the game
for (const [keyName, keyCode] of Object.entries(Keyboard)) {
  if (Input.IsButtonPressed(keyCode, 0)) {
    Isaac.DebugString(`Player pressed: ${keyName}`);
  }
}
```

One important thing to note about this is that iterating over enums **will not happen in order**. This is because `Object.entries()` (and the other related functions) transpile to use Lua's `pairs()` function, and that is designed to return table entries in a random order. If you need to get the contents of a Lua enum in order, then either sort the keys before you iterate over them, or re-create the data as an array.

Furthermore, it is important that in the previous example, we are iterating over a "normal" enum provided by the game. You **will not be able to iterate over your own enums** in this way because of how TypeScriptToLua transpiles them. TypeScriptToLua creates a double mapping of key to value and value to key. For example:

```ts
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

This is a great feature, because you can pretty print what an enum is super easily:

```ts
const currentTestValue = TestEnum.TWO;

Isaac.DebugString(
  `currentTestValue = ${currentTestValue} - ${TestEnum[currentTestValue]}`,
);
// Prints "currentTestValue = 2 (TWO)"
```

However, this means that if you want to iterate over your own enums in a way similar to the previous example, you have to use some type-checking:

```ts
for (const [key, value] of Object.entries(TestEnum)) {
  if (type(key) !== "string") {
    // Ignore the reverse mappings created by TypeScriptToLua
    continue;
  }

  Isaac.DebugString(`Key: ${key}`);
  Isaac.DebugString(`Value: ${value}`);
}
```

Or, simply use `getEnumValues`, which is a provided convenience function from `isaacscript-common`:

```ts
for (const value of getEnumValues(TestEnum)) {
  Isaac.DebugString(`Value: ${value}`);
}
```

<br />

### NPM Dependencies

Unfortunately, you can't use JavaScript or TypeScript libraries from NPM, since TypeScriptToLua does not support that. However, if you need a specific function, then you can simply copy paste it into your own code.

On the other hand, if you want to split IsaacScript code between repositories or share a library with others, TypeScriptToLua does allow [using and creating npm packages containing .lua files](https://typescripttolua.github.io/docs/external-lua-code). Check out the TypeScriptToLua docs for more details.

<br />

### Throwing Errors

Normally, in TypeScript programs, you would handle errors with `throw new Error("foo")`. For example:

```ts
const player = entity.ToPlayer(); // The type of player is "EntityPlayer | undefined"
if (player === undefined) {
  throw new Error("Failed to convert the player!");
}
player.AddSoulHearts(1); // The type of player is now "EntityPlayer"
```

However, in Isaac mods, this code won't work. It will error with something along the lines of the following:

`[Foo] Error in "foo" call: ...n\The Binding of Isaac Rebirth/mods/foo/main.lua:100: attempt to index a nil value (global 'debug')`

This is because TypeScriptToLua transpiles `throw` to a function that uses Lua's `debug` library, and Isaac does not normally have access to `debug` for sandboxing reasons. But not to worry, because we can simply use Lua's `error()` function instead. For example:

```ts
const player = Isaac.ToPlayer(); // The type of player is "EntityPlayer | undefined"
if (player === undefined) {
  error("Failed to convert the player!");
}
player.AddSoulHearts(1); // The type of player is now "EntityPlayer"
```

(TypeScript is smart enough to know that `error()` can constrain the type of player in the same way that `throw` normally would.)

<br />
