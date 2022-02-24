---
title: Refactoring an Example Mod
---

As your mod grows larger and larger, you will want to stay organized. Splitting up your mod into different files is easy with TypeScript by using `import` and `export`. There are many ways to structure a big mod, so think about a hierarchy that makes sense for you.

Let's say that in our example mod, we want to add a few more custom items, so that the mod becomes an item pack. Before we continue to clutter our "main.ts" file, let's refactor our code to keep things clean.

<br>

## 1) src/main.ts

We don't want to have any logic in the "main.ts" file. This purpose of this file is to simply register the mod and glue together all of the callbacks.

```ts
import * as postUpdate from "./callbacks/postUpdate";

const MOD_NAME = "Green Candle";

export function main(): void {
  const mod = RegisterMod(MOD_NAME, 1);
  registerCallbacks(mod);
}

function registerCallbacks(mod: Mod) {
  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main);
  // TODO - Add code for new callbacks here
}
```

<br>

## 2) src/types/CollectibleTypeCustom.ts

Before, we had a `GREEN_CANDLE_COLLECTIBLE_TYPE` constant at the top of the file. This probably belongs in its own file. Furthermore, instead of having individual variables for every collectible type, we can put them all in a "CollectibleTypeCustom" enum, which helps us stay more organized.

```ts
export enum CollectibleTypeCustom {
  COLLECTIBLE_GREEN_CANDLE = Isaac.GetItemIdByName("Green Candle"),
}
```

Types, interfaces, and enums are typically stored in files of the same name in a "types" subdirectory.

<br>

## 3) src/callbacks/postUpdate.ts

Each callback can have its own dedicated file in a "callbacks" subdirectory.

```ts
import * as greenCandle from "../items/greenCandle";

export function main(): void {
  greenCandle.checkApplyEffect();
  // TODO - Add code for new items here
}
```

<br>

## 4) src/items/greenCandle.ts

Each item can have its own dedicated file in an "items" subdirectory.

```ts
import { CollectibleTypeCustom } from "../types/CollectibleTypeCustom";

export function checkApplyGreenCandleEffect(): void {
  for (const player of getPlayers()) {
    if (player.HasCollectible(GREEN_CANDLE_COLLECTIBLE_TYPE)) {
      applyGreenCandleEffect(player);
    }
  }
}

function applyGreenCandleEffect(player: EntityPlayer) {
  for (const entity of getEntities()) {
    if (shouldApplyGreenCandleEffectToEntity(entity)) {
      entity.AddPoison(EntityRef(player), 100, player.Damage);
    }
  }
}

function shouldApplyGreenCandleEffectToEntity(entity: Entity) {
  return entity.IsVulnerableEnemy() && getRandomInt(1, 500) === 1;
}
```

## 5) Done!

Now, our project looks like this:

```ts
src/
├── main.ts
├── callbacks/
│   └── postUpdate.ts
├── items/
│   └── greenCandle.ts
├── types/
│   └── CollectibleTypeCustom.ts
```
