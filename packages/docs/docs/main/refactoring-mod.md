---
title: Refactoring an Example Mod
---

This tutorial is designed for people who are already familiar with IsaacScript and already have some working code. If that sounds like you, then read on.

Small mods can be written inside of a single file: "main.ts". In most cases, it doesn't make sense to split up a small mod into multiple files. If you did that, then someone reading your code would have to jump back and forth between files while trying to understand how everything works. Better to have everything in one place, so that they can read it in order, from top to bottom.

However, this logic starts to break down once the mod gets over a few hundred lines. Imagine that we have a mod that adds multiple items, and all of the logic is inside of the "main.ts" file. When working in the large file, it might be hard to orient ourselves: are we in a function that deals with item 1? Or item 2?

Furthermore, in bigger files, it's easier for things to get messy. Imagine that we wanted to put all of the constants and functions for item 1 in the middle of the file, and all of the constants and functions for item 2 at the bottom of the file. But after working on the mod for a while and adding/removing things, things often get shuffled around and the organization gets messed up.

Instead, it's better to have each item in a dedicated file for that item. That way, if someone wants to know how a specific item works, they can just open the one item file and read it without having to wade through everything else. And if you ever find a bug with item 1, then you don't have to go on a scavenger hunt throughout your codebase - you can just focus all of your effort on looking through and troubleshooting the file for item 1.

In TypeScript, we split code up into multiple files by using `import` and `export`. As an example, let's build on the previous [Green Candle mod](example-mod.md). Imagine that we want to add a few more custom items, so that the mod becomes an item pack. Before we continue to clutter our "main.ts" file, let's refactor our code to keep things clean.

<br />

## 1) `src/main.ts`

We don't want to have any logic in the "main.ts" file. This purpose of this file is to simply register the mod and glue together all of the callbacks.

```ts
import { postUpdateInit } from "./callbacks/postUpdate";

const MOD_NAME = "Green Candle";

main();

function main(): void {
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

// (All of the rest of the Green Candle poisoning code goes here. Make sure to change the
// "GREEN_CANDLE" constant to "CollectibleTypeCustom.GREEN_CANDLE" to reflect the fact that we moved
// it to an enum.)
```

## 5) Done

Now, our project looks like this:

```text
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

This is a pretty good way to organize a mod. But of course, it is not the only way. If you have a really big mod, then build on the concepts introduced here and think about a hierarchy that will make sense and work best for you.

If you want to delve deeper into the topic of structuring a large Isaac mod, you can read my [blog on mod organization](https://github.com/Zamiell/isaac-faq/blob/main/mod-organization.md).
