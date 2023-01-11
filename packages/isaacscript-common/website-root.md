---
sidebar_label: Introduction
sidebar_position: 0
custom_edit_url: null
---

# `isaacscript-common`

In addition to having access to all of the vanilla classes and enums, IsaacScript mods also can access optional helper functions and features. These are bundled as part of the `isaacscript-common` package. Think of this as an extended part of the Isaac API; they can perform common tasks in a safe way that abstracts away the complexity from you.

You can explore what `isaacscript-common` offers via the left navigation bar.

If you want to use `isaacscript-common` as a Lua library for your Lua code, see the [using IsaacScript in Lua](../main/isaacscript-in-lua.md) page.

<br />

## Using Pure Functions

`isaacscript-common` offers many helper functions. Most functions are [pure functions](https://en.wikipedia.org/wiki/Pure_function) that do not require or modify any global state. Thus, you can simply auto-import them as you write your mod and they will work anywhere.

For example:

```ts
import { anyPlayerHasCollectible } from "isaacscript-common";

function anyPlayerHasSadOnion(): boolean {
  return anyPlayerHasCollectible(CollectibleType.SAD_ONION);
}
```

<br />

## Using Custom Callbacks

Like any good library, importing anything `isaacscript-common` will not cause any code to be executed in your mod. However, in order for [the custom callbacks](/isaacscript-common/other/enums/ModCallbackCustom) and the [extra features](#using-extra-features) to work, some code does need to be executed. This is because these features need to track when certain things happen in-game. In order to enable this functionality, you must upgrade your mod with the `upgradeMod` function.

For example:

```ts
import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom, modVanilla } from "isaacscript-common";

const modVanilla = RegisterMod("Foo", 1);
const mod = upgradeMod(modVanilla);

// Register normal callbacks.
mod.AddCallback(ModCallback.POST_USE_ITEM, (collectibleType) => {
  Isaac.DebugString(`POST_USE_ITEM fired - item was: ${collectibleType}`);
});

// Register custom callbacks.
mod.AddCallbackCustom(
  ModCallbackCustom.POST_ITEM_PICKUP,
  (player, pickingUpItem) => {
    Isaac.DebugString(
      `POST_ITEM_PICKUP fired - item was: ${pickupUpItem.subType}`,
    );
  },
);
```

<br />

## Using Extra Features

Some helper functions rely on stateful tracking (like `isPlayerUsingPony`) or store data about what you want to do for later (like `setCustomHotkey`). These fall under the category of "extra features". Since they are non-pure, you are only able to access them if you upgrade your mod. However, this is slightly different than upgrading your mod for custom callbacks.

Instead of activating every feature when you upgrade your mod, the standard library keeps things blazing fast by only activating the specific features that you need. Thus, when you upgrade your mod, you have to tell the library which features you want by passing them as the second argument to the `upgradeMod` function.

For example:

```ts
import { ModCallback } from "isaac-typescript-definitions";
import { ISCFeature, upgradeMod } from "isaacscript-common";

const modVanilla = RegisterMod("Foo", 1);
const features = [ISCFeature.PONY_DETECTION] as const;
const mod = upgradeMod(modVanilla, features);

mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, (player) => {
  const usingPony = mod.isPlayerUsingPony(player);
  Isaac.DebugString(`Is this player using a Pony? ${usingPony}`);
});
```

Here, by specifying that we want the "pony detection" feature, extra methods are added on to the mod object. Then, we can proceed to use those methods throughout our mod.

The extra methods are type safe such that if you tried to use the `isPlayerUsingPony` method without explicitly specifying `ISCFeature.PONY_DETECTION`, TypeScript would complain that the method does not exist.

<br />

## Passing the `mod` Object Throughout Your Mod

Historically, Isaac mods have created the `mod` object in the `main.ts` root file, and then passed it elsewhere if needed. (You only typically need to pass it around for callback registration purposes, since the IsaacScript save data manager handles all saving and loading of the "save#.dat" file.)

However, now that the `mod` object contains useful methods, the various files in your mod will need access to the `mod` object. There are a few different ways to accomplish this. For example, you could use [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) or create a `getMod` function. However, the simplest way is to just upgrade the mod in a separate file, and then import it for side-effects, like this:

<!-- markdownlint-disable MD001 -->

#### `mod.ts`

```ts
import { ISCFeature, upgradeMod } from "isaacscript-common";

const modVanilla = RegisterMod("Foo", 1);
const features = [ISCFeature.PONY_DETECTION] as const;
export const mod = upgradeMod(modVanilla, features);
```

#### `callbacks/postUpdate.ts`

```ts
import { ModCallback } from "isaac-typescript-definitions";
import { mod } from "../mod";

export function postUpdateInit(): void {
  mod.AddCallback(ModCallback.POST_UPDATE, main);
}

function main() {
  Isaac.DebugString("ModCallback.POST_UPDATE");
}
```

This has the downside of importing for side-effects, but it keeps your mod clean of other boilerplate.

(Generally, we don't want to import for side-effects because it can obfuscate when code is being executed and make troubleshooting startup run-time errors more difficult. However, making an exception for this case is reasonable, since invoking `RegisterMod` or `upgradeMod` should not be generating any run-time errors, and `mod` is something that needs to be easily accessible throughout your program.)
