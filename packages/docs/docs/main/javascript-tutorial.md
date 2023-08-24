---
title: JavaScript/TypeScript Tutorial
---

If you have never programmed in JavaScript/TypeScript before, but you **have** programmed in Lua, then this page is for you. Below, you can compare Lua code side by side with the equivalent TypeScript code. If you have coded a mod in Lua before, reading through this page will probably be enough to get you started.

If you have never programmed in Lua before, then this page will still be useful, but you can skip reading all of the Lua code blocks. (But it can't hurt to learn some Lua too. The best Isaac modders will fluently know both languages.)

<br />

## Level 1 - Basic

<br />

### Comments

```lua
-- This is a single-line comment in Lua.

--[[

This is a multi-line comment in Lua.
It's very long.
And wordy.

--]]
```

```ts
// This is a single-line comment in TypeScript.

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

```ts
// TypeScript code
Isaac.DebugString("hello world");
```

But don't bother typing the semi-colons yourself - just hit `Ctrl + s` and the editor will automatically insert them for you. That's [Prettier](https://prettier.io/) doing its job.

(In fact, you should always hit `Ctrl + s` periodically as you code, so that the code is constantly formatting itself. This frees you from the tedium of aligning things, breaking up long if statements, and so forth. If the file is not auto-formatting itself, then you probably need to add a bracket somewhere so that the code can properly compile.)

<br />

### Colons

In Lua, you sometimes call functions with a colon, and you sometimes call functions with a period. This is really annoying.

In TypeScript, you call all functions with a period. Easy.

```lua
-- Lua code
Isaac.DebugString("hello world")
Isaac.GetPlayer():AddMaxHearts(2)
```

```ts
// TypeScript code
Isaac.DebugString("hello world");
Isaac.GetPlayer().AddMaxHearts(2);
```

<br />

### Variables: `local` ➜ `const` and `let`

In Lua, you type `local` before declaring a variable to stop it from being turned into a global.

In TypeScript, this isn't necessary. There are no global variables, unless we explicitly decide to create one.

Furthermore, in TypeScript, there are two kinds of variable declarations: `let` and `const`.<br />
(Don't ever use `var`, which is only used in older JavaScript code.)

```lua
-- Lua code
local poop = "poop"
local numFarts = 1
numFarts = numFarts + 1 -- numFarts is now equal to 2.
```

```ts
// TypeScript code
const poop = "poop"; // We use "const" because this value never changes.
let numFarts = 1; // We use "let" because we have to modify it later.
numFarts = numFarts + 1; // numFarts is now equal to 2.
```

<br />

### Functions

```lua
-- Lua code
function getNumPoops() -- This is a global function.
  return 2
end

local function getNumFarts() -- This is a local function.
  return 3
end
```

```ts
// TypeScript code
// All functions in TypeScript are local by default.
function getNumPoops() {
  return 2;
}
```

<br />

### Anonymous Functions

For very small functions, it is common to type them anonymously (i.e. without a name).

```lua
-- Lua code
mod:AddCallback(ModCallbacks.POST_NEW_LEVEL, function()
  Isaac.DebugString("Arrived on a new floor.")
end);
```

```ts
// Typescript code
mod.AddCallback(ModCallbacks.POST_NEW_LEVEL, () => {
  Isaac.DebugString("Arrived on a new floor.");
});
```

(If this syntax looks confusing, google "JavaScript arrow functions" in order to get more familiar with them. But of course, you don't have to use arrow functions if you don't want to.)

<br />

### Arrays

An array is a data structure that is an ordered list of elements. In Lua, you use a table to represent an array.

```lua
local myArray = {"foo", "bar", "baz"}
```

In TypeScript, there is a dedicated syntax for arrays: the square brackets.

```ts
const myArray = ["foo", "bar", "baz"];
```

In Lua, there are two different ways to add an element to an array:

```lua
table.insert(myArray, "someNewElement")
myArray[#myArray + 1] = "anotherNewElement"
```

In TypeScript, you use the `push` method:

```ts
myArray.push("someNewElement");
```

In addition to `push`, arrays have a lot of other handy methods that you can use. You can see all of them in [the MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

<br />

### Objects

An object is a data structure that stores key/value pairs. In Lua, you use a table to represent an object. (An equal sign is used in between the keys and values.)

```js
local myObject = {
  foo = 123,
  bar = 456,
  baz = 789,
}
```

In TypeScript, there is a dedicated syntax for objects: the curly brackets. (A colon is used in between the keys and the values.)

```ts
const myObject = {
  foo: 123,
  bar: 456,
  baz: 789,
};
```

In Lua, there are two different ways to set an element:

```lua
myObject.foo = 999
myObject["foo"] = 999
```

In TypeScript, it is the exact same thing:

```ts
myObject.foo = 999;
myObject["foo"] = 999;
```

(But ESLint will change the second form to the first form automatically when you save the file, so that everything remains consistent.)

<br />

### `if` Statements and Operators

In Lua, you don't put parentheses around the conditions of an `if` statement. But in TypeScript, you do.

Also, the operators are a bit different:

- `and` ➜ `&&`
- `or` ➜ `||`
- `==` ➜ `===`
- `~=` ➜ `!==`
- `..` ➜ `+`

For example:

```lua
-- Lua code
if x == 1 and y ~= 0 then
  -- Do something.
end
```

```ts
// TypeScript code
if (x === 1 && y !== 0) {
  // Do something.
}
```

If you find typing three equal signs annoying, then don't bother: if you type `==` instead, ESLint will automatically convert it to `===` when you save the file.

<br />

### `for` Statements for Counting

In Lua, basic `for` loops look like this:

```lua
-- Lua code
for i = 1, 10 do
  -- "i" will iterate upwards from 1 to 10.
end
```

In TypeScript, you use the more-standard C-style syntax:

```ts
// TypeScript code
for (let i = 1; i <= 10; i++) {
  // "i" will iterate upwards from 1 to 10.
}
```

Alternatively, you can use the `iRange` helper function provided by the `isaacscript-common` standard library. This allows the code to be a bit more safe & understandable:

```ts
// TypeScript code
for (const i of iRange(1, 10)) {
  // "i" will iterate upwards from 1 to 10.
}
```

In Lua, you count downwards like this:

```lua
-- Lua code
for i = 10, 1, -1 do
  -- "i" will iterate downwards from 10 to 1.
end
```

In TypeScript, that would be:

```ts
// TypeScript code
for (let i = 10; i >= 1; i--) {
  // "i" will iterate downwards from 10 to 1.
}
```

Or, with the `iRange` helper function:

```ts
// TypeScript code
for (const i of iRange(10, 1)) {
  // "i" will iterate downwards from 10 to 1.
}
```

Note that you can also use the `eRange` helper function for an exclusive range (instead of an inclusive range).

<br />

### `for` Statements for Arrays

In Lua, the typical way to iterate over an array is with `ipairs`.

```lua
-- Lua code
local gapers = Isaac.FindByType(EntityType.ENTITY_GAPER)

for i, gaper in ipairs(gapers) do
  gaper:Remove()
  print("Removed gaper number:", i);
end
```

In TypeScript, you have a few different options.

```ts
// Typescript code
const gapers = Isaac.FindByType(EntityType.ENTITY_GAPER);

// A "for of" loop is the simplest way to iterate over an array. It provides the array element.
for (const gaper of gapers) {
  gaper.Remove();
}

// If you need the array index and the array element, use the `entries` method.
for (const [i, gaper] of gapers.entries()) {
  gaper.Remove();
  print("Removed gaper number:", i);
}

// If you just need the array index, use the `keys` method.
// The keys start at 0, unlike Lua. (In Lua, array keys start at 1.)
for (const i of gapers.keys()) {
  print("On gaper index:", i);
}
```

<br />

### `for` Statements for Key/Value Tables

In Lua, the typical way to iterate over a key/value table is with `pairs`.

```lua
-- Lua code
-- Define a table of collectible prices.
-- (We must put "[]" around the collectible types since the table keys are numbers.)
local collectiblePrices = {
  [3] = 15, -- Spoon Bender is 15 coins.
  [4] = 15, -- Cricket's Head is 15 coins.
  [5] = 7, -- My Reflection is 7 coins.
}

for collectibleType, price in pairs(collectiblePrices) do
  -- Do something with "collectibleType" and "price".
end
```

In TypeScript, you have a few different options.

```ts
// TypeScript code
// Define an object containing collectible prices.
const collectiblePrices = {
  [3]: 15, // Spoon Bender is 15 coins.
  [4]: 15, // Cricket's Head is 15 coins.
  [5]: 7, // My Reflection is 7 coins.
};

for (const [collectibleType, price] of Object.entries(collectiblePrices)) {
  // Do something with "collectibleType" and "price".
}

// Or, if you just need the collectible type, you would use the "keys()" method.
for (const collectibleType of Object.keys(collectiblePrices)) {
  // Do something with "collectibleType".
}

// Or, if you just need the price, you would use the "values()" method.
for (const price of Object.values(collectiblePrices)) {
  // Do something with "price".
}
```

<br />

### `nil` ➜ `undefined`

```lua
-- Lua code
if entity.SpawnerEntity == nil then
  -- This entity was not spawned by anything in particular.
end
```

```ts
// TypeScript code
if (entity.SpawnerEntity === undefined) {
  // This entity was not spawned by anything in particular.
}
```

Note that `null` also transpiles to `nil` (in addition to `undefined`). In order to keep your code easy to read, never use `null` unless you specifically want to model an actual null-type defined value.

<br />

## Level 2 - Intermediate

<br />

### Assignment Operators

Lua does not have assignment operators, because it is a terrible language.

```lua
-- Lua code
local numFarts = 1
numFarts = numFarts + 1 -- numFarts is now equal to 2.
```

```ts
// TypeScript code
let numFarts = 1;
numFarts += 1; // numFarts is now equal to 2.
```

<br />

### Increment and Decrement Operators

Lua does not have increment or decrement operators. Handily, TypeScript does.

```lua
-- Lua code
local numFarts = 1
numFarts = numFarts + 1 -- numFarts is now equal to 2.
```

```ts
// TypeScript code
let numFarts = 1;
numFarts++; // numFarts is now equal to 2.
```

<br />

### String Concatenation

The way to concatenate strings is different:

```lua
-- Lua code
local poopString = "Poop"
local fartString = "Fart"
local combinedString = poopString .. fartString -- combinedString is now equal to "PoopFart".
```

```ts
// TypeScript code
const poopString = "Poop";
const fartString = "Fart";
const combinedString = poopString + fartString; // combinedString is now equal to "PoopFart".
```

(Unlike Lua, TypeScript uses the same operator for adding numbers and concatenating strings.)

<br />

### String Conversion

```lua
-- Lua code
local numPoops = 3
local numPoopsString = tostring(numPoops)
```

```ts
// TypeScript code
const numPoops = 3;
const numPoopsString1 = tostring(numPoops); // You can do the same thing as you would in Lua.
const numPoopsString2 = numPoops.toString(); // Or, you can use the typical JavaScript conversion method.
```

Feel free to use either the standard Lua method or the JavaScript conversion method - it will be transpiled to the same thing.

Furthermore, when concatenating numbers to strings, TypeScript will automatically convert them to strings for you:

```lua
-- Lua code
local numPoops = 3
local numFarts = 4
Isaac.DebugString("numPoops: " .. tostring(numPoops) .. ", numFarts: " .. tostring(numFarts))
```

```ts
// Typescript code
const numPoops = 3;
const numFarts = 4;
Isaac.DebugString("numPoops: " + numPoops + ", numFarts: " + numFarts); // No conversion necessary!
```

### String Templates

TypeScript has a special feature that Lua does not have called _string templates_. String templates allow you to easily create a string that has a bunch of variables in it. They are denoted by the <code>`</code> character.

In the previous section, we used the `+` operator to combine a bunch of variables with text. But it would be better written by using a string template, like this:

```ts
// Typescript code
const numPoops = 3;
const numFarts = 4;
Isaac.DebugString(`numPoops: ${numPoops}, numFarts: ${numFarts}`);
```

You will probably want to get in the habit of using string templates, since they end up making your code more concise and easier to read.

<br />

### TypeScript Type Annotations

The main thing that TypeScript adds to JavaScript is type annotations. Here's a quick example:

```lua
-- Lua code
function postPlayerInit(player)
  player:AddCollectible(1, 0, false) -- Sad Onion
end
```

```javascript
// JavaScript code
function postPlayerInit(player) {
  player.AddCollectible(1, 0, false); // Sad Onion
}
```

```ts
// TypeScript code
function postPlayerInit(player: EntityPlayer) {
  player.AddCollectible(1, 0, false); // Sad Onion
}
```

In the TypeScript code snippet, you can see that we marked the `player` function argument as the `EntityPlayer` type by using a colon. The `EntityPlayer` type is automatically provided by the `isaac-typescript-definitions` package, and corresponds to [`EntityPlayer` in the official docs](https://wofsauge.github.io/IsaacDocs/rep/EntityPlayer.html). (The `isaac-typescript-definitions` package is automatically added to any IsaacScript project.)

Once the type has been annotated, your editor will know about all of the legal methods for the `player` variable. For example, if you make a typo on the `AddCollectible` method, the editor will immediately tell you by drawing a red squiggly line underneath it.

When coding in TypeScript, you will need to add the type for every function argument. That way, the compiler can catch all of the bugs.

(Note that if you are just trying out a new function, then you can quickly type it out without the types. The compiler will give errors, but you can ignore them and everything will work fine as you test the function in-game. Once you are satisfied with the function, you can go back and fill in the types.)

<br />

### Type Inference For Variables

In the previous section, we provided a type annotation for a function argument (by using a colon). It is also possible to provide a type annotation for other things. For example, this is providing a type annotation for a variable declaration:

```ts
const myNumber: number = 123;
```

Here, we are explicitly telling the compiler what the type of the variable is. But in this case, doing this is redundant. The type is obviously a number, because 123 is a number. So we can just type out the variable like normal:

```ts
const myNumber = 123;
```

Here, TypeScript will infer that `myNumber` is of type `number`, because it knows that 123 is a number. This is called [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html). So, in general, we should never explicitly put the types on variables when they can be inferred, because it adds useless noise to the code. In this way, TypeScript saves a ton of time over older programming languages like Java. (In Java, you have to type out the type for every single variable, which is a pain.)

However, in some cases, we do need to specify what the type of the variable is. Imagine that we are creating a new array that will contain numbers:

```ts
// We will add some numbers types later on, but right now we just need to initialize the array.
const numberArray = [];
```

Here, TypeScript is able to infer that the type of the variable is an array. But it can't infer what is supposed to go inside of the array, for obvious reasons. So the type defaults to `any[]` (which means "an array containing anything").

This is bad, because we want our arrays to be type safe. Thus, when we declare arrays (and other container-like objects), we have to tell TypeScript what kinds of things they should contain:

```ts
const numberArray: number[] = [];
```

Much better!

<br />

### Type Inference For Functions

You can also use type annotations to specify the return type of a function, like this:

```ts
// The return type is "boolean".
function isEven(num: number): boolean {
  return num % 2 === 0;
}
```

Here, providing the return type annotation is optional. If we don't specify it, the compiler would infer what the return type is automatically, saving us the time from having to type it out.

With that said, just because we don't _have_ to type it does not mean that we should _never_ type it. Having return type annotations on functions is often pretty useful, as it can catch bugs when you accidentally return things that you did not intend.

<br />

### Void

If a function is not expected to return anything, then the return type is `void`. For example:

```ts
function addSadOnion(player: EntityPlayer): void {
  player.AddCollectible(1); // Sad Onion
}
```

But annotating a return type of void is pretty pointless, so the function is better written without the return type annotation:

```ts
function addSadOnion(player: EntityPlayer) {
  player.AddCollectible(1); // Sad Onion
}
```

One exception is when the function is exported. (More on what exported functions are later.) By default, the IsaacScript linter is configured to require return types for all exported functions. So, if the previous function was exported, you would write it like this:

```ts
export function addSadOnion(player: EntityPlayer): void {
  player.AddCollectible(1); // Sad Onion
}
```

<br />

### Splitting Your Code Into Multiple Files: `require()` ➜ `import`

In Lua, you split your code into multiple files by using `require()`.

#### `main.lua`

```lua
-- In Lua, we must namespace the mod's Lua files in a directory of the same name to avoid require
-- conflicts.
local postGameStarted = require("revelations.callbacks.postGameStarted")

local mod = RegisterMod("Revelations", 1)
postGameStarted:init(mod)
```

#### `revelations/callbacks/postGameStarted.lua`

```lua
local postGameStarted = {}

function postGameStarted:init(mod)
  mod:AddCallback(ModCallbacks.POST_GAME_STARTED, postGameStarted.main);
end

function postGameStarted:main()
  local player = Isaac.GetPlayer()
  player:AddCollectible(1, 0, false) -- Sad Onion
end

return postGameStarted
```

In TypeScript, this is accomplished with `import`.<br />
(Don't ever use the JavaScript/TypeScript version of `require()`, which is only used in older JavaScript code.)

#### `main.ts`

```ts
import { postGameStartedInit } from "./callbacks/postGameStarted";

const mod = RegisterMod("Revelations", 1);
postGameStartedInit(mod);
```

#### `callbacks/postGameStarted.ts`

```ts
// "export" makes it so that other files can use this function.
export function postGameStartedInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.POST_GAME_STARTED, main);
}

function main() {
  const player = Isaac.GetPlayer();
  player.AddCollectible(1, 0, false); // Sad Onion
}
```

(With TypeScript, there is no need to have a superfluous namespacing directory like in Lua.)

<br />

## Level 3 - Advanced

<br />

### Using Global Variables

Sometimes, your mod might need to use a global variable exported by someone else's mod. For example, you might need to use the `InfinityTrueCoopInterface` global variable from the True Co-op Mod. (This mod is useless now in Repentance, but in Afterbirth+, most character mods would want to register their character with the True Co-op Mod.)

<br />

#### Option 1 - Inline Declarations

In Lua, checking to see if the user has the True Co-op Mod installed would look something like this:

```lua
-- Lua code
if InfinityTrueCoopInterface ~= nil then
  -- The user has the True Co-op mod enabled, so now do something.
end
```

The TypeScript equivalent would look like this:

```ts
// TypeScript code
if (InfinityTrueCoopInterface !== undefined) {
  // The user has the True Co-op mod enabled, so now do something.
}
```

However, this exact code would result in an error, because the TypeScript compiler (rightly) complains that the "InfinityTrueCoopInterface" variable does not exist. Normally, this kind of thing is extremely useful, because when a variable "does not exist", it usually means we forgot to initialize it or we made a typo somewhere. However, in this case, the "InfinityTrueCoopInterface" variable really does exist - it's just not a part of _our_ code. So, we just need a way to tell the TypeScript compiler that.

The way to do that is to use the `declare` keyword, like this:

```ts
// TypeScript code
declare const InfinityTrueCoopInterface: unknown | undefined;

if (InfinityTrueCoopInterface !== undefined) {
  // The user has the True Co-op mod enabled, so now do something.
}
```

The `declare` keyword essentially means "the following variable exists outside of the context of this program, and is provided by some other running code". Importantly, `declare` statements do not actually result in any transpiled Lua code; they are purely messages to the TypeScript compiler.

In this context, we annotate the type of the variable as `unknown | undefined`, which means that it is either "something" or "does not exist". (`unknown` is a special TypeScript type that you can use when you don't know what the real type of something is.)

<br />

#### Option 2 - A Declaration File

If you check for `InfinityTrueCoopInterface !== undefined` in more than one place in your mod, then option 1 is bad, because you would be [need to repeat yourself before each check](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Instead, make a TypeScript definition file that corresponds to the variable / table.

For example, to declare `InfinityTrueCoopInterface`, starting from the root of your project:

- Create the `src/types` directory.
- Create the `src/types/InfinityTrueCoopInterface.d.ts` file. (A `d.ts` file is a TypeScript _declaration_ file.)
- Put the following in it:

```ts
declare const InfinityTrueCoopInterface: unknown | undefined;
```

Now, your other TypeScript files will "see" it as a global variable without you having to do anything else.

<br />

### Creating Global Variables

In Lua, some mods export functionality by using a global variable:

```lua
-- Lua code
RevelationsVersion = "2.1"
-- "RevelationsVersion" is now a global variable.
```

In TypeScript, you just have to declare it beforehand:

```ts
// TypeScript code
declare let RevelationsVersion: string;
RevelationsVersion = "2.1";
// "RevelationsVersion" is now a global variable.
```

Building on this example, you can also expose both variables and methods:

```ts
declare let RevelationsExports: unknown;
RevelationsExports = {
  myVariable1,
  myVariable2,
  myFunction1,
  myFunction2,
};
// "RevelationsExports" is now a global variable.
```

<br />

### Enums

In the previous [`for` loop section](#for-statements-for-keyvalue-tables), we defined a mapping of collectibles to prices.

Imagine that in our mod, collectibles can only be sold for three different prices:

- 15 coins (normal)
- 30 coins (double)
- 7 coins (on sale)

This means that we can get even more specific with our collectible prices definition by using an `enum`. Unlike Lua, TypeScript has a built-in `enum` data type.

```ts
enum CollectiblePrice {
  NORMAL = 15,
  DOUBLE = 30,
  SALE = 7,
}

// collectiblePrices now only has values of CollectiblePrice, which is even safer than before!
const collectiblePrices = {
  [3: CollectiblePrice.NORMAL, // Spoon Bender
  [4]: CollectiblePrice.NORMAL, // Cricket's Head
  [5]: CollectiblePrice.SALE, // My Reflection
};
```

<br />

### Maps

In the previous [enums](#enums) section, we defined `collectiblePrices` as an object, which is roughly equivalent to a Lua table.

Objects are good for cases where every possibility is accounted for. But this isn't the case for `collectiblePrices`. Here, we are only specifying the prices for _some_ of the collectibles in the game. If a collectible isn't in the list, we'll probably want to ignore it, or give it a default value, or something along those lines.

In this example, what `collectiblePrices` _really_ represents is a [_map_](https://en.wikipedia.org/wiki/Associative_array) of a specific collectible type to a price. Unlike Lua, TypeScript has a built-in `Map` data type. So, the example would be better written like this:

```ts
const collectiblePrices = new Map<number, CollectiblePrice>([
  [3, CollectiblePrice.NORMAL], // Spoon Bender
  [4, CollectiblePrice.NORMAL], // Cricket's Head
  [5, CollectiblePrice.SALE], // My Reflection
]);

for (const [collectibleType, price] of collectiblePrices.entries()) {
  // Do something with "collectibleType" and "price".
}
```

In this example, `collectiblePrices` has a type of `Map<number, CollectiblePrice>`, which is more specific than an untyped object.

- The first value in the angle brackets corresponds to the map key type.
- The second value in the angle brackets corresponds to the map value type.

We initialize the map by passing an array of key/value pairs to the constructor. (Alternatively, we could start the map empty and then use the `set` method to set some values later on.)

With a map, you can use all of the handy methods [shown in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (listed on the left side). Here's an example of using the `get` method to emulate checking for a value in a Lua table:

```lua
-- Lua code
function pickingUpCollectible(player, collectibleType)
  -- If the player picked up a new collectible,
  -- subtract the price of that collectible from their coin amount.
  local price = collectiblePrices[collectibleType]
  if price ~= nil then
    player:AddCoins(price * -1)
  end
end
```

```ts
// TypeScript code
function pickingUpCollectible(player: EntityPlayer, collectibleType: int) {
  // If the player picked up a new collectible,
  // subtract the price of that collectible from their coin amount.
  const price = collectiblePrices.get(collectibleType);
  if (price !== undefined) {
    player.AddCoins(price * -1);
  }
}
```

<br />

### Type Narrowing

Lua allows you to write unsafe code. Consider the following:

```lua
-- Lua code
local player = entity:ToPlayer() -- Convert the entity to a player.
player:AddMaxHearts(2) -- Give them a heart container.
```

Not all entities convert to players though, so this code can fail. In fact, for most entities, the `ToPlayer` method would return `nil` and cause the next line to throw a run-time error, preventing all of the subsequent code in the callback from firing. In TypeScript, writing this code would cause a compiler error:

```ts
const player = entity.ToPlayer();
player.AddMaxHearts(2); // Error: Object is possibly 'undefined'
```

This error is because the return type of the `ToPlayer()` method is `EntityPlayer | undefined` (which means "either an `EntityPlayer` or nothing"). To solve this error, we can use _type narrowing_:

```ts
const player = entity.ToPlayer();
if (player === undefined) {
  error("Failed to convert the entity to a player.");
}
player.AddMaxHearts(2); // The type of player is now narrowed to "EntityPlayer".
```

Here, we explicitly handle the error case and supply a helpful error message. But this code does something more important than simply providing the error message.

`error` is a Lua function that causes execution of the function to immediately end. Thus, TypeScript is smart enough to realize that if the code gets to the `AddMaxHearts` line, the type of `player` is no longer `EntityPlayer | undefined` - it would have to be a `EntityPlayer`. You can confirm this by mousing over the variable in VSCode.

Since many of the Isaac API methods can fail, you will have to use _type narrowing_ like this in many places in your code. Sometimes, it can be annoying to explicitly check to see if things go wrong. But _type narrowing_ should be seen as a good thing: by handling errors in a sane way, you safely compartmentalize the damage that run-time errors can cause. And when things do go wrong, troubleshooting what happened becomes a lot easier.
