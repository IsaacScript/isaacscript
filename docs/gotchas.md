---
title: Gotchas
---

This page lists several "gotchas" or things that might be weird about IsaacScript.

<br />

### Local Enums and Importing

In the Isaac Lua environment, several enums are declared as global variables. In typical Lua code, you would just use them directly, like the following:

```lua
local player = Isaac.GetPlayer() -- The "Isaac" class is a global
player:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION) -- The "CollectibleType" enum is a global
```

However, relying on global variables is dangerous, as other mods can change the contents of the enums. (We have observed this happening in the past from time to time.) Thus, as an extra safety feature, IsaacScript includes a local copy of every enum for your personal use.

Additionally, since we don't have to rely on using the official enums, the local version of the IsaacScript enums can fix all of the spelling errors and inconsistencies that have gone unfixed in the official game. Furthermore, as a big quality of life improvement, we also remove the prefix from every enum to make them easy to type. (For example, `CollectibleType.COLLECTIBLE_SAD_ONION` is changed to `CollectibleType.SAD_ONION`.)

Since enums are no longer global variables, you must import them in your code whenever you need to use them. For example, to write the Lua code snippet above in TypeScript:

```ts
import { CollectibleType } from "isaac-typescript-definitions";

const player = Isaac.GetPlayer();
player.AddCollectible(CollectibleType.SAD_ONION);
```

However, don't ever type the imports manually, because that's a big waste of time! If you tab-complete the name of an enum, it should automatically import it for you. If you already have an enum that is written out, then you can auto-import it by putting the text cursor on the right-side of the enum and hit `Ctrl + space + enter`.

<br />

### `int` and `float`

In Lua, there is only one type of number. (The programming language does not differentiate between integers, floats, etc.)

TypeScript works the same way as Lua. There is only one type of number: `number`.

However, the official Isaac API documentation uses integers and floats. For example, this is the entry for the `EntityPlayer.AddHearts` function:

```c++
void AddHearts(int hearts)
```

In order to more closely match the API, the TypeScript API definitions use `int` and `float` types. Thus, the above function is declared like this:

```ts
AddHearts(hearts: int): void;
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
  MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item"),
}

// Elsewhere in the code:
if (
  player.HasCollectible(CollectibleTypeCustom.MY_CUSTOM_ITEM) &&
  player.HasCollectible(CollectibleType.EPIC_FETUS)
) {
  // Handle the specific synergy with My Custom Item + Epic Fetus
}
```

Note that you don't have to worry about polluting the global namespace: due to how the transpiler works, your enum will be local to your own project.

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

But this is **not recommended** because vectors won't be type-safe anymore.

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
    print("Player pressed: " .. keyName)
  end
end
```

In TypeScript, we can use the `getEnumEntries` helper function:

```ts
// TypeScript code
// "Keyboard" is an enum provided by the game
for (const [keyName, keyCode] of getEnumEntries(Keyboard)) {
  if (Input.IsButtonPressed(keyCode, 0)) {
    print(`Player pressed: ${keyName}`);
  }
}
```

You can also use the `getEnumKeys` and `getEnumValues` helper functions, depending on what you need to do.

If you stick with these helper functions, everything should work great. If you want to know more about what is happening under-the-hood, then read the next section.

### Enum Reverse Mappings

First, see the previous section on [iterating over enums](#iterating-over-enums).

Normally, TypeScript transpiles enums to JavaScript with a double mapping of key to value and value to key. TypeScriptToLua also copies this behavior when transpiling TypeScript to Lua. For example:

```ts
enum TestEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}
```

Will transpile to:

```lua
local TestEnum = {}
TestEnum.ONE = 1
TestEnum[TestEnum.ONE] = "ONE"
TestEnum.TWO = 2
TestEnum[TestEnum.TWO] = "TWO"
TestEnum.THREE = 3
TestEnum[TestEnum.THREE] = "THREE"
```

This is a great feature, because you can get the key name of an enum value super easily:

```ts
const currentTestValue = TestEnum.TWO;
print(`currentTestValue = ${currentTestValue}: ${TestEnum[currentTestValue]}`);
// Prints "currentTestValue: 2 (TWO)"
```

However, this means that if you were to naively iterate over the enum with `Object.entries` or `pairs`, you have to use some type-checking:

```ts
for (const [key, value] of Object.entries(TestEnum)) {
  // Ignore the reverse mappings created by TypeScriptToLua
  if (type(key) !== "string") {
    continue;
  }

  print(`Key: ${key}`);
  print(`Value: ${value}`);
}
```

This is exactly what the `getEnumValues` helper function does.

Finally, there are some other small things to mention:

1. Reverse mappings are not created for string-based enums, so you only have to worry about this for number-based enums.

1. All of the "flag" enums (e.g. `EntityFlag`, `TearFlag`, etc.) do not have a reverse mapping. This is because they are not "real" TypeScript enums, but are instead objects that are branded with a `BitFlag` type. If you want to get the key of a "fake" enum like this, use the `getEnumKey` helper function. (The compiler won't let you index these types of enums, so the problem should be obvious if you ever come across it.)

1. The `getEnumEntries` (and related) helper functions will return the entries sorted by value. This may be surprising to you. For example:

```ts
enum MyEnum {
  ThirdValue = "third-value",
  FourthValue = "fourth-value",
}

for (const key of getEnumKeys(MyEnum)) {
  print(key); // Will print "fourth-value", then "third-value"
}
```

Instead, you might expect that the enum helper functions would return the entries in the order that they were defined in. However, it is impossible to determine declaration order at runtime. This is because under-the-hood, the `pairs` function is used to iterate over an enum table, and it will always return the results in a random order.

Since number enums are always declared in order of value, you would probably only ever observe this oddity with an enum that has string values.

<br />

### NPM Dependencies

Unfortunately, you can't use JavaScript or TypeScript libraries from NPM, since TypeScriptToLua does not support that. However, if you need a specific function, then you can simply copy paste it into your own code.

On the other hand, if you want to split IsaacScript code between repositories or share a library with others, TypeScriptToLua does allow [using and creating npm packages containing .lua files](https://typescripttolua.github.io/docs/external-lua-code). This is exactly what the `isaacscript-common` package does. Check out the TypeScriptToLua docs for more details.

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
