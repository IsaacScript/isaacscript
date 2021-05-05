---
title: Refactoring an Example Mod
---

As your mod grows larger and larger, you will want to stay organized. Splitting up your mod into different files is easy with TypeScript by using `import` and `export`. There are many ways to structure a big mod, so think about a hierarchy that makes sense for you.

Let's say that in our example mod, we want to add a few more custom items, so that the mod becomes an item pack. Before we continue to clutter our "main.ts" file, let's refactor our code to keep things clean.

<br />

## 1) src/main.ts

We don't want to have any logic in the "main.ts" file. This purpose of this file is to simply register the mod and glue together all of the callbacks.

```typescript
// Define imports
import * as postUpdate from "./callbacks/postUpdate";
import isaacScriptInit from "./isaacScriptInit";

// Initialize some IsaacScript-specific functions
isaacScriptInit();

// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const greenCandle = RegisterMod("greenCandle", 1);

// Register callbacks
greenCandle.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main);
// TODO - Add code for new callbacks here

// Print an initialization message to the "log.txt" file
Isaac.DebugString("The Green Candle mod is initialized.");
```

<br />

## 2) src/constants.ts

Before, we had a `greenCandleItemID` variable. This is a constant and will never change, so it belongs in its own "constants.ts" file. Furthermore, instead of having individual variables for every item ID, we can put them all in a "CollectibleTypeCustom" enum, which helps us stay more organized.

```typescript
export enum CollectibleTypeCustom {
  COLLECTIBLE_GREEN_CANDLE = Isaac.GetItemIdByName("Green Candle"),
}
```

<br />

## 3) src/callbacks/postUpdate.ts

Each callback can have its own dedicated file in the "callbacks" directory. Here's the code for "postUpdate.ts":

```typescript
import * as greenCandle from "../items/greenCandle";

export function main(): void {
  greenCandle.checkApplyEffect();
  // TODO - Add code for new items here
}
```

<br />

## 4) src/items/greenCandle.ts

Each item can have its own dedicated file in the "items" directory.

```typescript
import { CollectibleTypeCustom } from "../constants";

export function checkApplyEffect(): void {
  const game = Game();
  const numPlayers = game.GetNumPlayers();
  for (let i = 1; i <= numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    if (
      player !== null &&
      player.HasCollectible(CollectibleTypeCustom.COLLECTIBLE_GREEN_CANDLE)
    ) {
      applyEffect(player);
    }
  }
}

function applyEffect(player: EntityPlayer) {
  for (const entity of Isaac.GetRoomEntities()) {
    if (shouldApplyEffectToEntity(entity)) {
      entity.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyEffectToEntity(entity: Entity) {
  // "math.random(500)" generates a random number between 1 and 500
  // This is a 1 / 500 chance, or 0.2%
  return entity.IsVulnerableEnemy() && math.random(500) === 1;
}
```

## 5) Done!

Now, our project looks like this:

```typescript
src/
├── main.ts
├── constants.ts
├── callbacks/
│   └── postUpdate.ts
└── items/
    └── greenCandle.ts
```
