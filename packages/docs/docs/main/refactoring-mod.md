---
title: Refactoring an Example Mod
---

As your mod grows larger and larger, you will want to stay organized. Splitting up your mod into different files is easy with TypeScript by using `import` and `export`. There are many ways to structure a big mod, so think about a hierarchy that makes sense for you.

Let's build on the previous [Green Candle example mod](example-mod.md). Imagine that we want to add a few more custom items, so that the mod becomes an item pack. Before we continue to clutter our "main.ts" file, let's refactor our code to keep things clean.

<br />

## 1) `src/main.ts`

We don't want to have any logic in the "main.ts" file. This purpose of this file is to simply register the mod and glue together all of the callbacks.

```ts
import { postUpdateInit } from "./callbacks/postUpdate";

const MOD_NAME = "Green Candle";

export function main(): void {
  const mod = RegisterMod(MOD_NAME, 1);
  registerCallbacks(mod);
}

function registerCallbacks(mod: Mod) {
  postUpdateInit(mod);
  // Add init functions for new callbacks here.
}
```

<br />

## 2) `src/enums/CollectibleTypeCustom.ts`

Before, we had a `GREEN_CANDLE_COLLECTIBLE_TYPE` constant at the top of the file. This probably belongs in its own file. Furthermore, instead of having individual variables for every collectible type, we can put them all in a `CollectibleTypeCustom` enum, which helps us stay more organized.

```ts
export const CollectibleTypeCustom = {
  GREEN_CANDLE: Isaac.GetItemIdByName("Green Candle"),
} as const;
```

Enums are typically stored in files of the same name in an "enums" subdirectory.

(More technical information: Here, we use a normal object as a stand-in for a "real" TypeScript enum. This is because enums have the quirk that they must have only number or string values, and we need this enum to have `CollectibleType` values. Using an object for this purpose instead of an enum is conventional in IsaacScript mods, and works just fine.)

<br />

## 3) src/callbacks/postUpdate.ts

Each callback can have its own dedicated file in a "callbacks" subdirectory.

```ts
import { ModCallback } from "isaac-typescript-definitions";
import { greenCandlePostUpdate } from "../items/greenCandle";

export function postUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, main);
}

function main() {
  greenCandlePostUpdate();
  // Add code for new items here.
}
```

<br />

## 4) src/items/greenCandle.ts

Each item can have its own dedicated file in an "items" subdirectory.

```ts
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

// ModCallback.POST_UPDATE (1)
export function greenCandlePostUpdate(): void {
  checkApplyGreenCandleEffect();
}

// (All of the rest of the Green Candle poisoning code goes here.)
```

## 5) Done

Now, our project looks like this:

```ts
src/
├── main.ts
├── callbacks/
│   └── postUpdate.ts
├── items/
│   └── greenCandle.ts
└── enums/
    └── CollectibleTypeCustom.ts
```

Much better!

If you want to delve deeper into the topic of structuring a large Isaac mod, you can read my [blog on mod organization](https://github.com/Zamiell/isaac-faq/blob/main/mod-organization.md).
