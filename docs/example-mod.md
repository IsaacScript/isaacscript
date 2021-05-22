---
title: Building an Example Mod
---

This is a tutorial that shows off how to code a simple mod with IsaacScript. Our goal will be to create a new passive item in the game called the _Green Candle_.

<br />

## 0) Unpack the Games Resources

Most modders will have already done this, but just in case you haven't, you should run the game's unpacker. This is located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ResourceExtractor\ResourceExtractor.exe`.

Doing this allows you to see all of the vanilla assets and how the directory structure is laid out.

<br />

## 1) Initializing the Project

For this tutorial, we will be using `C:\Repositories\green-candle` as the directory for our mod.

In a Windows command prompt:

```batch
mkdir C:\Repositories\green-candle
cd C:\Repositories\green-candle
npx isaacscript init --use-current-dir --save-slot=1 --vscode
npx isaacscript
```

At this point, the skeleton for our mod is in place, and IsaacScript is running in the background. We can now begin working.

<br />

## 2) Create the Image for the Item

First, we will set up the image for how the item will appear in-game. We'll use this image: ![Green Candle](/images/items/green_candle.png)

Most images for a mod should be placed in a "resources" subdirectory. (This corresponds to how things are organized in `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources`.)

For our purposes, we will need to copy [the Green Candle image](/images/items/green_candle.png) to `C:\Repositories\green-candle\mod\resources\gfx\items\collectibles\green_candle.png`. (You will need to create the "resources", "gfx", "items", and "collectibles" directories, since they won't exist yet.)

Notice that this path corresponds to the "real" items graphics directory of `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\gfx\items\collectibles\`. Under the hood, the game will merge the two directories when you enable the mod.

<br />

## 3) Create the Entry For the Item in `items.xml`

Next, we need to tell the game that the new item should exist. This is done by adding a new entry to the "items.xml" file.

New entries for things go in the "content" subdirectory. Make a blank file at `C:\Repositories\green-candle\mod\content\items.xml`. (You will need to create the "content" directory, since it won't exist yet.)

In this file, add the following:

```xml
<items gfxroot="gfx/items/" version="1">
  <passive description="Mass poison" gfx="green_candle.png" name="Green Candle" />
</items>
```

Now, the item will exist in the game, and you can give it to yourself with the console command of `giveitem green candle`.

Notice that this file is in the same format as the "real" items.xml file located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\items.xml`. Under the hood, the game will merge the contents of your little items.xml file with the big items.xml file when you enable the mod.

<br />

## 4) Create the Entry for the Item in `itempools.xml`

Even though the item exists in the game, it is not yet present in any of the item pools. This means that players will never randomly discover your item as they play the game.

So, let's add the item to the _Treasure Room_ pool. Make a blank file at `C:\Repositories\green-candle\mod\content\itempools.xml` and add the following to it:

```xml
<ItemPools>
  <Pool Name="treasure">
    <Item Name="Green Candle" Weight="1" DecreaseBy="1" RemoveOn="0.1"/>
  </Pool>
</ItemPools>
```

Here, we use values for "Weight", "DecreaseBy", and "RemoveOn" that match what is used for all of the other items in the Treasure Room pool. (You can see this if you open the "real" itempools.xml file at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\items.xml`.)

Now, the item will sometimes randomly appear for players when they enter a Treasure Room!

<br />

## 5) Start Coding the Effect

Right now, if players pick up your item, it won't actually do anything. This is where the Lua code comes in.

Open `C:\Repositories\green-candle\src\main.ts`, which contains the TypeScript code that will be transpiled to the "main.lua" file and read by the game.

The bootstrapper created a skeleton of a mod for us. As you can see, it calls the `Isaac.DebugString()` function when the `MC_POST_GAME_STARTED` callback is fired.

(`Isaac` is a global class provided by the game with helpful methods on it. `Isaac.DebugString()` simply writes something to the log.txt file, which is located at `C:\Users\james\Documents\My Games\Binding of Isaac Repentance\log.txt`.)

The `MC_POST_GAME_STARTED` callback is useful for initializing things at the start of every run or making the player start with some novel ability. For our purposes, we don't need it, so we can remove all of the lines relating to that.

Let's start by fixing the capitalization:

```typescript
const greenCandle = RegisterMod("Green Candle", 1);
```

```typescript
Isaac.DebugString("The Green Candle mod is initialized.");
```

<br />

## 6) Get the ID for the Green Candle Item

When the game loads a new item, it assigns it an item ID. These IDs start at 730 and count upwards. (729 is the item ID of the final vanilla item, "Decap Attack", so the first available ID for mods is 730.)

The item ID that the Green Candle gets will depend on how many other custom modded items that we have loaded. So, in order to write code for the Green Candle, we have to ask the game what the current ID is and store it for later.

In order to do this, we need to use the `Isaac.GetItemIdByName()` method:

```typescript
const greenCandleItemID = Isaac.GetItemIdByName("Green Candle");
```

Put this below the line that registers the mod.

<br />

## 7) Add a New Callback

We want the Green Candle to have a random chance to poison every enemy in the room on every frame. So, we need code to run on every frame, and that means we need to use the `MC_POST_UPDATE` callback.

Add the following code:

```typescript
function postUpdate() {
  Isaac.DebugString("A game frame just passed!");
}

// Register callbacks
greenCandle.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
```

Now, we can run the mod and confirm that this code makes tons of messages in the log.txt file at the rate of 30 times a second.

<br />

## 8) Getting the Number of Green Candles

Let's get rid of the `Isaac.DebugString()` call and set up a new function for applying the green candle effect:

```typescript
function postUpdate() {
  checkApplyGreenCandleEffect();
}

function checkApplyGreenCandleEffect() {
  // TODO - Fill this in
}
```

Since Isaac is a co-op game, it is possible that up to 4 players could all have the Green Candle at the same time. We want our mod to work properly in multiplayer, so we have to loop over all the players.

To start with, we get a variable for the current game by invoking `Game()`, which is a global variable provided for us, similar to the `Isaac` class. Once we have the game object, we can use the `GetNumPlayers()` method:

```typescript
function checkApplyGreenCandleEffect() {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 1; i <= numPlayers; i++) {
    // TODO - Check if the player has Green Candle
  }
}
```

The `Isaac.GetPlayer()` method allows us to get a specific player object. Once we have that, we can check to see if they have the Green Candle by using the `HasCollectible()` method:

```typescript
function checkApplyGreenCandleEffect() {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 1; i <= numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (player !== null && player.HasCollectible(greenCandleItemID)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  // TODO
}
```

<br />

## 9) Looping Over All the Enemies in a Room

Every enemy in the room should have a chance of being poisoned. So, we need to loop over all enemies in the room with `Isaac.GetRoomEntities()`.

```typescript
function applyGreenCandleEffect(player: EntityPlayer) {
  for (const entity of Isaac.GetRoomEntities()) {
    if (shouldApplyGreenCandleEffectToEntity(entity)) {
      // TODO - Apply poison
    }
  }
}

function shouldApplyGreenCandleEffectToEntity(entity: Entity) {
  // TODO - Return true or false based on a random chance
  return true;
}
```

<br />

## 10) Applying the Poison

Adding the poison is done with the `AddPoison` method. However, notice that your IDE will give you an error if you try to supply the player as the source:

```typescript
function applyGreenCandleEffect(player: EntityPlayer) {
  for (const entity of Isaac.GetRoomEntities()) {
    if (shouldApplyGreenCandleEffectToEntity(entity)) {
      // The source is the player
      // The duration is 100 frames
      // The damage is equal to the player's damage stat
      entity.AddPoison(player, 100, player.Damage);
      // (this shows an error in the IDE because AddPoison expects an EntityRef)
    }
  }
}
```

TypeScript saves the day, telling us that we actually need to feed the function an entity reference. This is accomplished by simply casting the player as an `EntityRef`. (The "EntityRef()" function is a global.)

```typescript
entity.AddPoison(EntityRef(player), 100, player.Damage);
```

<br />

## 11) Detect Invulnerable Enemies and Add a Random Chance

Now, let's fill in the `shouldApplyGreenCandleEffectToEntity()` function.

First, we also need to check to see if the entity is supposed to be damaged by using the `IsVulnerableEnemy()` method.

(Some enemies, like Stonies, are supposed to be invincible, so it would be a bug in our mod if the poison effect actually applied to them.)

```typescript
function shouldApplyGreenCandleEffectToEntity(entity: Entity) {
  // "math.random(500)" generates a random number between 1 and 500
  // This is a 1 / 500 chance, or 0.2%
  return entity.IsVulnerableEnemy() && math.random(500) === 1;
}
```

Notice here that we use Lua's `math.random()` function, which is available to use in TypeScript thanks to the underlying TypeScriptToLua library that is currently loaded. (If you don't like using Lua libraries for whatever reason, you could also use the equivalent JavaScript version, which is `Math.floor(Math.random() * 10) + 1`. It would transpile to the same thing.)

<br />

## 12) Done!

The mod is now complete. It looks like the following:

```typescript
// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const greenCandle = RegisterMod("greenCandle", 1);

// Mod variables
const greenCandleItemID = Isaac.GetItemIdByName("Green Candle");

// Define callback functions
function postUpdate() {
  checkApplyGreenCandleEffect();
}

function checkApplyGreenCandleEffect() {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 1; i <= numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (player !== null && player.HasCollectible(greenCandleItemID)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  for (const entity of Isaac.GetRoomEntities()) {
    if (shouldApplyGreenCandleEffectToEntity(entity)) {
      entity.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyGreenCandleEffectToEntity(entity: Entity) {
  // "math.random(500)" generates a random number between 1 and 500
  // This is a 1 / 500 chance, or 0.2%
  return entity.IsVulnerableEnemy() && math.random(500) === 1;
}

// Register callbacks
greenCandle.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);

// Print an initialization message to the "log.txt" file
Isaac.DebugString("The Green Candle mod is initialized.");
```
