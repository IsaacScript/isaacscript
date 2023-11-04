---
title: Using Feature Classes - The Modern Way to Write Isaac Mods
---

## The Problem

As your mod grows bigger, organization becomes more important: nobody wants to work in a pigsty.

Most people already understand the basics: split code up into separate files. For example, it makes sense for a mod pack that contains 10 items to have all of the code for each individual item live in a file dedicated to just that item. That way, you can leverage the `Ctrl + p` hotkey in VSCode to jump to the exact spot that you need to go. And if you need to fix a bug with item 1, then you don't have to go on a scavenger hunt throughout the entire repository - you can just focus all of your attention on the file called "item1.ts".

But beyond the basics of "split code up into separate files", things get more tricky. What is the best way to organize a big Isaac mod with lots of features? (In this context, a "feature" refers to a new item, a new enemy, and so on.)

<br />

## The Benefits of Feature Classes

Historically, Isaac mods have subscribed feature functions to callbacks directly in the same file, and then imported the feature files from the main file. However, importing files for side effects like this can lead to spaghetti code. So, other mods unify callback logic into a single file per callback, and then have the callback files call the individual feature functions. Both of these mod organization strategies have pros and cons.

In 2022, the IsaacScript community discovered a powerful new pattern for writing Isaac mods: using TypeScript classes to represent individual mod features. This pattern is extremely powerful for a few reasons:

1. It allows you to use method decorators to subscribe individual class methods to callbacks. This allows you to get rid of callback files that "glue" together your "main.ts" file and your individual feature files.
1. Method decorators allow you to colocate the originating callback declaration alongside the actual code that is being executed. This makes the execution path much easier to read and understand.
1. Classes allow you do provide conditional logic for decorated methods such that any callback will only fire if your logic passes. This allows you to very easily turn off individual mod features via e.g. Mod Config Menu or Dead Sea Scrolls.
1. Classes can be extended from parent classes, allowing you to unify initialization logic by writing it in the parent class constructor (e.g. `MyNPC1` extends `MyNPCFeatures` extends `ModFeature`).
1. Classes can subscribe and unsubscribe from callbacks when arbitrary conditions are met. This can be useful if your callback functions are expensive.
1. Classes automatically subscribe to the [save data manager](/isaacscript-common/features/SaveDataManager/), which reduces boilerplate.

In short, feature classes are a powerful abstraction that allows you to write concise, easy-to-read code. They also provide a great deal of flexibility and control.

<br />

## Example

Let's start with a quick example to showcase the power of the feature class pattern. We will be creating an item called the Green Candle. We won't fully implement the item; we just want you to get the idea of how the pattern works.

First off, we create a mod and upgrade it so that we can use features with the standard library:

```ts
// mod.ts

import { ISCFeature, upgradeMod } from "isaacscript-common";

const ISC_FEATURES_FOR_THIS_MOD = [ISCFeature.SAVE_DATA_MANAGER] as const;

const modVanilla = RegisterMod("Green Candle", 1);
export const mod = upgradeMod(modVanilla, ISC_FEATURES_FOR_THIS_MOD);
```

This part is pretty standard practice for all IsaacScript mods.

Next, we define a class that will contain the logic for the Green Candle feature:

```ts
// features/GreenCandle.ts

import { ModCallback } from "isaac-typescript-definitions";
import { Callback, DefaultMap, ModFeature } from "isaacscript-common";

// We create a typical "v" object to hold our variables for this feature. (Hopefully at this point
// you have already written an IsaacScript mod and are familiar with the save data manager. If not,
// that's okay; the the takeaway here is that "v" objects have special meaning.)
const v = {
  room: {
    countersMap: new DefaultMap<PtrHash, int>(0),
  },
};

// Mod classes should extend from the `ModFeature` class. This allows their methods to be decorated
// by the `@Callback` and `@CallbackCustom` decorator functions.
export class GreenCandle extends ModFeature {
  // Whatever we specify as the class member of `v` will automatically be registered with the save
  // data manager. Note that we could also declare `v` entirely inside the class, but it is
  // conventional to do it this way so that we can type `v.room.countersMap` instead of
  // `this.v.room.countersMap`.
  v = v;

  // By putting `@Callback` before a method, it decorates that method, which runs special logic
  // upon class instantiation. In this case, it subscribes to the specified callback. Note that
  // similar to a "real" callback registration, you could also provide an additional argument here
  // to make the class method only fire for a specific kind of NPC.
  @Callback(ModCallback.POST_NPC_UPDATE)
  postNPCUpdate(npc: EntityNPC): void {
    // The following code is just to show off getting a counter from our `v` object; it does not
    // have to do with the class pattern specifically. Most of your mod features will probably use
    // the save data manager in a way similar to this, but they don't necessarily have to.
    const ptrHash = GetPtrHash(npc);
    const counters = v.room.countersMap.getAndSetDefault(ptrHash);
    const newCounters = counters + 1;
    v.room.countersMap.set(ptrHash, newCounters);

    // TODO: Do something with `newCounters`.
  }
}
```

Now, we can instantiate our mod feature classes in our "main.ts" file by using the `initModFeatures` helper function:

```ts
// main.ts

import { initModFeatures } from "isaacscript-common";
import { GreenCandle } from "./features/GreenCandle";
import { mod } from "./mod";

const MOD_FEATURES = [GreenCandle] as const;

initModFeatures(mod, MOD_FEATURES);
```

That's it! The code in our Green Candle class will now automatically run whenever an NPC is present.

As our mod gets bigger, we can add more classes to the `MOD_FEATURES` array. We could also create an intermediary class if two or more mod features will have shared logic (e.g. `GreenCandle extends CollectibleModFeature` + `CollectibleModFeature extends ModFeature`).

<br />

## Other `ModFeature` Features

More advanced features of the `ModFeature` class are listed below.

### Decorators

In addition to `@Callback`, you can also use `@CallbackCustom` to register class methods with custom callbacks from the standard library. You can also use `@PriorityCallback` and `@PriorityCallbackCustom` to make a certain method run before or after other registered callbacks.

### Using `shouldCallbackMethodsFire` For Conditional Firing

If you want the decorated methods of a class to conditionally fire, then specify a function for the `shouldCallbackMethodsFire` property. For example:

```ts
export class GreenCandle extends ModFeature {
  protected override shouldCallbackMethodsFire = (): boolean => {
    // We don't need to track anything if no players have the collectible.
    return anyPlayerHasCollectible(CollectibleTypeCustom.GREEN_CANDLE);
  };

  // [The rest of the class logic goes here.]
}
```

### Delayed Initialization

We recommend that you use the `initModFeatures` helper function to instantiate your mod features. That way, the `v` variables will be properly registered with the save data manager.

By default, when a `ModFeature` is instantiated, it will immediately subscribe all of the decorated methods. If you want to defer the callback subscription for some reason, then you can manually instantiate your mod features by passing `false` to the third argument of the constructor like this:

```ts
const instantiatedModFeatures = initModFeatures(mod, modFeatures, false);
```

Now, `instantiatedModFeatures` will contain an array of the instantiated feature classes, but none of the callbacks will be subscribed and the variables will not be registered with the save data manager. Later on, when you actually need to use a class, you can initialize it with the `init` method:

```ts
const firstInstantiatedModFeature = instantiatedModFeatures[0];
if (firstInstantiatedModFeature === undefined) {
  error("Failed to get the first instantiated mod feature.");
}

firstInstantiatedModFeature.init();
```
