---
title: Building an Example Mod
---

This is a tutorial that shows off how to code a simple mod with IsaacScript. Our goal will be to create a new passive item in the game called the _Green Candle_.

(If you don't know what IsaacScript is, see the [features](features.md) page. If you don't know whether you should use it yet, see the [Is IsaacScript Right for Me?](right-for-me.md) page.)

<br />

## 0) Extract the Game's Resources

Most modders will have already done this, but just in case you haven't, you should run the game's resource extractor. (This is also referred to as the unpacker.) The extractor is located at: `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ResourceExtractor\ResourceExtractor.exe`

(Messages like `WARNING: could not return filename for entry 35a142c2bed2d0cf` are normal.)

After running the unpacker, you can find all of the vanilla assets in the `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\` directory and the `resources-dlc3\` directory. (The latter contains only Repentance files.) Study the layout of the files in these two directories so that you can get familiar with where particular files need to live.

<br />

## 1) Initializing the Project

First, make sure that you have already read the [Getting Started](getting-started.md) section of the IsaacScript docs and have a rough understanding of how IsaacScript works.

For this tutorial, we will be using `C:\Repositories\green-candle` as the directory for our mod. So, in a Windows command prompt, create that directory, change into that directory, and initialize a new IsaacScript project

```batch
mkdir C:\Repositories\green-candle
cd C:\Repositories\green-candle
npx isaacscript init --use-current-dir --save-slot=1 --vscode
```

At this point, the skeleton for our mod is in place. Now, start IsaacScript and let it run in the background:

```batch
npx isaacscript
```

We can now begin working.

<br />

## 2) Create the Image for the Item

First, we will set up the image for how the item will appear in-game. We will use this image: ![Green Candle](/img/items/green-candle.png)

Most images for a mod should be placed in a "resources" subdirectory. (This corresponds to how things are organized in `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources`.)

For our purposes, we will need to copy [the Green Candle image](/img/items/green-candle.png) to `C:\Repositories\green-candle\mod\resources\gfx\items\collectibles\green-candle.png`. (You will need to create the "resources", "gfx", "items", and "collectibles" directories, since they won't exist yet.)

Notice that this path corresponds to the "real" items graphics directory of `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\gfx\items\collectibles\`. Under the hood, the game will merge the two directories when you enable the mod.

<br />

## 3) Create the Entry For the Item in `items.xml`

Next, we need to tell the game that the new item should exist. This is done by adding a new entry to the "items.xml" file.

New entries for things go in the "content" subdirectory. Make a blank file at `C:\Repositories\green-candle\mod\content\items.xml`. (You will need to create the "content" directory, since it won't exist yet.)

In this file, add the following:

```xml
<items gfxroot="gfx/items/" version="1">
  <passive
    description="Mass poison"
    gfx="green-candle.png"
    name="Green Candle"
  />
</items>
```

Now, the item will exist in the game, and you can give it to yourself with the console command of `giveitem green candle`.

Notice that this file is in the same format as the "real" items.xml file located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\items.xml`. Under the hood, the game will merge the contents of your little items.xml file with the big items.xml file when you enable the mod.

<br />

## 4) Create the Entry for the Item in `itempools.xml`

Even though the item exists in the game, it is not yet present in any of the item pools. This means that players will never randomly discover your item as they play the game.

So, let's add the item to the Treasure Room pool. Make a blank file at `C:\Repositories\green-candle\mod\content\itempools.xml` and add the following to it:

```xml
<ItemPools>
  <Pool Name="treasure">
    <Item Name="Green Candle" Weight="1" DecreaseBy="1" RemoveOn="0.1" />
  </Pool>
</ItemPools>
```

Here, we use values for "Weight", "DecreaseBy", and "RemoveOn" that match what is used for all of the other items in the Treasure Room pool. (You can see this if you open the "real" itempools.xml file at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\items.xml`.)

Now, the item will sometimes randomly appear for players when they enter a Treasure Room!

<br />

## 5) Start Coding the Effect

Right now, if players pick up your item, it won't actually do anything. This is where the coding part comes in.

Mods affect the game by putting code inside of _callbacks_. Each callback fires when a particular event happens in the game. There are [72 different callbacks](https://wofsauge.github.io/IsaacDocs/rep/enums/ModCallbacks.html) to choose from, so you have to choose the right one depending on what you want to do. For example, the most basic callback is the `POST_GAME_STARTED`, which fires once at the beginning of a new run.

First, go through [the official docs](https://wofsauge.github.io/IsaacDocs/rep/enums/ModCallbacks.html) and read what all of the callbacks do so that you can get familiar with them.

Next, open `C:\Repositories\green-candle\src\main.ts` in VSCode, which contains the TypeScript code that will be transpiled to the "main.lua" file and read by the game.

The bootstrapper created a skeleton of a mod for us. As you can see, it calls the `Isaac.DebugString()` function when the `POST_GAME_STARTED` callback is fired.

(`Isaac` is a global class provided by the game with helpful general-purpose methods on it. `Isaac.DebugString()` simply writes something to the "log.txt" file, which is located at `C:\Users\%USERNAME%\Documents\My Games\Binding of Isaac Repentance\log.txt`.)

First, change the `MOD_NAME` constant to "Green Candle".

Second, remove all of the lines relating to the `POST_GAME_STARTED` callback. This callback is useful for initializing things at the start of every run. But for our purposes, we don't need to use it.

<br />

## 6) Get the ID for the Green Candle

When the game loads a new collectible, it assigns it a collectible type. These types start at 733 and count upwards. (732 is the collectible type of the final vanilla item, "Mom's Ring", so the first available collectible type for mods is 733.)

The collectible type that the Green Candle will get depends on how many other custom modded items that we have loaded. So, in order to write code for the Green Candle, we have to ask the game what the current ID is and store it for later.

In order to do this, we need to use the `Isaac.GetItemIdByName()` method:

```ts
const GREEN_CANDLE_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Green Candle");
```

This is a constant, so we name it with all capital letters and with SHOUTING_SNAKE_CASE. Put this at the top of the file next to the "MOD_NAME" constant.

<br />

## 7) Add a New Callback

As we discussed above, when adding new code, you have to put it in the right callback for what you want to do.

For our purposes, we want the Green Candle to have a random chance to poison every enemy in the room on every frame. So, that means that the code should run on every frame, and that means we need to use the `POST_UPDATE` callback, which runs 30 times a second.

(The game update loop runs at 30 times per second and the game render loop runs at 60 times per second. Since our code is gameplay-related, we should put it in the `POST_UPDATE` callback. On the other hand, if we were drawing a sprite on the screen, then we would use the `POST_RENDER` callback.)

Add the following code to the "main" function:

```ts
mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
```

As you type the `ModCallback` enum, it should automatically create an import statement for the enum at the top of the file, which will look like this:

<!-- We use "js" instead of "ts" to prevent the fixer from deleting the import statement. -->

```js
import { ModCallback } from "isaac-typescript-definitions";
```

If you pasted the code in from this website, then it wouldn't have gotten the chance to automatically import. Handily, VSCode has a feature to automatically import whatever the text cursor happens to be over. So, put the text cursor at the end of the "ModCallback" word, and then hit `Ctrl + space + enter`.

After importing the enum, we have to add the corresponding function that will be called when the callback fires:

```ts
function postUpdate() {
  Isaac.DebugString("A game frame just passed!");
}
```

Now, we can run the mod and confirm that this code makes tons of messages in the "log.txt" file at the rate of 30 times a second.

<br />

## 8) Getting the Number of Green Candles

Instead of sending messages to the log, let's set up a new function for applying the green candle effect:

```ts
function postUpdate() {
  checkApplyGreenCandleEffect();
}

function checkApplyGreenCandleEffect() {
  // TODO - Fill this in.
}
```

Since Isaac is a co-op game, it is possible that up to 4 players could all have the Green Candle at the same time. We want our mod to work properly in multiplayer, so we have to loop over all the players.

Since this is such a common task, there is a `getPlayers` function for this in the IsaacScript standard library:

```ts
function checkApplyGreenCandleEffect() {
  for (const player of getPlayers()) {
    // TODO - Check if the player has Green Candle.
  }
}
```

By simply typing in `getPlayers`, VSCode should automatically import it, which means that it will add the following line to the top of the file:

<!-- We use "js" instead of "ts" to prevent the fixer from deleting the import statement. -->

```js
import { getPlayers } from "isaacscript-common";
```

Now that we have the players, we can check to see if they have the Green Candle by using the `HasCollectible()` method:

```ts
function checkApplyGreenCandleEffect() {
  for (const player of getPlayers()) {
    if (player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  // TODO - Fill this in.
}
```

<br />

## 9) Looping Over All the Enemies in a Room

Every enemy in the room should have a chance of being poisoned. So, we need to loop over all enemies in the room with the `getNPCs()` function. (This is also a helper function from the IsaacScript standard library.)

```ts
function applyGreenCandleEffect(player: EntityPlayer) {
  for (const npc of getNPCs()) {
    if (shouldApplyGreenCandleEffectToNPC(npc)) {
      // TODO - Apply poison.
    }
  }
}

function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC) {
  // TODO - Return true or false based on a random chance.
  return true;
}
```

<br />

## 10) Applying the Poison

Adding the poison is done with the `AddPoison` method. However, notice that VSCode will show you an error if you try to supply the player as the source:

```ts
function applyGreenCandleEffect(player: EntityPlayer) {
  for (const npc of getNPCs()) {
    if (shouldApplyGreenCandleEffectToNPC(npc)) {
      // - The source is the player.
      // - The duration is 100 frames.
      // - The damage is equal to the player's damage stat.
      npc.AddPoison(player, 100, player.Damage);
      // (This shows an error in VSCode because the `AddPoison` method expects an `EntityRef`.)
    }
  }
}
```

This showcases the advantage of programming in TypeScript instead of Lua, because this is a common error. The TypeScript compiler tells us that we _actually_ need to give the function an entity reference instead of an entity. This is accomplished by converting the player to a reference by using the `EntityRef` global function:

```ts
npc.AddPoison(EntityRef(player), 100, player.Damage);
```

<br />

## 11) Detect Invulnerable Enemies and Add a Random Chance

Now, let's fill in the `shouldApplyGreenCandleEffectToNPC()` function.

Some enemies, like Stonies, are supposed to be invincible, so it would be a bug in our mod if the poison effect applied to them. So, we have to find a way to detect invincible enemies.

By looking through [the API docs](https://wofsauge.github.io/IsaacDocs/), we eventually find that there is a `IsVulnerableEnemy()` method. This sounds like what we need.

Furthermore, we want the random chance for the Green Candle to work to be around 1 in 500. We can accomplish that with the `getRandomInt` function. (This is also a helper function from the IsaacScript standard library.)

```ts
function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC) {
  return npc.IsVulnerableEnemy() && getRandomInt(1, 500) === 1;
}
```

<br />

## 12) Done

The mod is now complete. It looks like the following:

```ts
import { ModCallback } from "isaac-typescript-definitions";
import { getNPCs, getPlayers, getRandomInt } from "isaacscript-common";

const MOD_NAME = "Green Candle";
const GREEN_CANDLE_COLLECTIBLE_TYPE = Isaac.GetItemIdByName("Green Candle");

export function main() {
  const mod = RegisterMod(MOD_NAME, 1);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);

  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postUpdate() {
  checkApplyGreenCandleEffect();
}

function checkApplyGreenCandleEffect() {
  for (const player of getPlayers()) {
    if (player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  for (const npc of getNPCs()) {
    if (shouldApplyGreenCandleEffectToNPC(npc)) {
      // - The source is the player.
      // - The duration is 100 frames.
      // - The damage is equal to the player's damage stat.
      npc.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyGreenCandleEffectToNPC(npc: EntityNPC) {
  return npc.IsVulnerableEnemy() && getRandomInt(1, 500) === 1;
}
```

You should now know the basic anatomy of an Isaac mod:

- using the `content` folder for merging content additions
- using the `resources` folder for blowing away vanilla assets and adding new files
- adding TypeScript code to the `main.ts` file
- using callbacks such as `POST_GAME_STARTED` and `POST_UPDATE`
- using the IsaacScript watcher to automatically compile and see your changes in-game

For a recommendation on what to do next, see the [next steps](next-steps.md) page.
