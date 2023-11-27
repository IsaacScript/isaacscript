---
title: Using Entity.GetData and the Save Data Manager
---

A common task in Isaac mods is to make new enemies, new familiars, and so on. All of these things are grouped under the umbrella of the `Entity` class. Custom entities often have some state associated with them. For example, you might have a custom familiar that eats bombs. In this case, you would need to keep track of how many bombs it has eaten already.

Additionally, a common task in modding is to make new functionality for vanilla entities. For example, you might want to make a custom collectible that inflicts sleep counters on all NPCs. In this case, you would need to keep track of a sleep counter for every NPC.

These are just two examples. Regardless of the specific thing that you need to do, if you need to store data about an entity, then you have a few different options.

<br />

## Using `Entity.GetData`

There is a helpful method on the `Entity` class called `GetData`. It returns a table that allows you to store arbitrary key/value pairs. Since the data is attached to the `Entity` class, it can be easily retrieved from any callback.

Unfortunately, `GetData` has many downsides, but we will get to that later.

To start with, the return type of `GetData` is `Record<string, unknown>`, which is essentially untyped. The first thing you will want to do is define the structure of the data that you will be storing on the entity. This is done by declaring an [interface](https://www.typescriptlang.org/docs/handbook/2/objects.html).

For example, say that we want to store sleep counters on an entity. And when the counter reaches a certain value, then the enemy will fall asleep.

```ts
interface FooData {
  sleepCounters: int | undefined;
}
```

Here, the `|` symbol creates a [type union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types). In other words, the type is "an integer or undefined". (It can't just be an integer because prior to us initializing it with a value, it won't exist at all.)

Once the interface is declared, we can use a type assertion to make retrieving the counters type safe:

```ts
const data = entity.GetData() as FooData;
print(`Sleep counters: ${data.sleepCounters}`); // Auto-completes and is type safe!
if (data.sleepCounters === undefined) {
  // Initialize the sleep counters to an initial value.
  data.sleepCounters = 0;
}

// Do something with the sleep counters.
```

<br />

## Downsides of `Entity.GetData`

### It's a Global Variable

The `GetData` table is a global variable, meaning that all mods share the same table. Thus, there can be conflicts, and other mods can modify or destroy your data. Carefully namespacing your variable names can mitigate this problem, but it's still not a good solution if you want your mod to be perfect.

### It's Ephemeral

The table is ephemeral, meaning that when the entity despawns, the table will be deleted and you will lose your data.

For example, pickups are a type of entity that appear to be persistent: when you get a heart drop in one room, you can backtrack to that room later, and the heart drop will still be there. However, behind the scenes, what is really happening is that the heart drop is despawned when you leave the room, and then a brand-new heart pickup entity is respawned when you re-enter the room. In this situation, if you had previously stored data on the `GetData` table of the heart pickup, the brand-new entity would not have this same data.

### It's _Really_ Ephemeral

Even for real persistent entities like players and familiars, the table is still ephemeral. For example, a familiar is never despawned; the same entity continues to exist as the player moves from room to room. Thus, the problem in the previous section would not apply to data stored in the `GetData` table for a familiar. However, once the player saves and quits and continues, the familiar will also be despawned in the exact same way that the heart drop was, and all of the data will be lost. Saving and quitting and continuing is a common thing for players to do (so that they can finish the run at a later time), so any well-designed mod must be able to handle this case.

<br />

## Using Local Variables Instead

Using the IsaacScript save data manager, it's relatively easy to replace `Entity.GetData` variables with a standard object. Let's use the same example as before: we store sleep counters for every NPC in the room, and once they get enough counters, they fall asleep.

### Data Definition

To start with, we could use the exact same interface as the previous example, and it would work just fine. But here, it makes sense to use a class, because we can leverage the constructor to initialize default values without having to manually write any custom code. (All NPCs should start with 0 counters to begin with.)

```ts
class FooData {
  sleepCounters = 0;
}
```

And when we need to initialize the data, we can simply do: `new FooData()`

### Local Variables

First, before we declare our variables, we need to set up the save data manager, which involves upgrading our mod:

```ts
// mod.ts
import { upgradeMod } from "isaacscript-common";

const modVanilla = RegisterMod("my-mod", 1);
const features = [ISCFeature.SAVE_DATA_MANAGER] as const;
export const mod = upgradeMod(modVanilla, features);
```

Now, the `mod` object can be imported by the feature files in our project.

Next, in our "foo.ts" file, we need to define a local object to store our variables for the entity, and then feed it to the save data manager:

```ts
interface FooData {
  sleepCounters: int;
}

const v = {
  room: {
    fooData: new Map<PtrHash, FooData>(),
  },
};

mod.saveDataManager("foo", v);
```

Let's break this down.

The object name of `v` is conventionally used to denote "variables", or more specifically, "variables that are local to this file or feature only". We would stick every variable that we need for this sleep feature on the `v` object. (And we would not put any other variables on it, to keep the variables scoped properly.)

`v` is composed of sub-objects. By specifying a `room` sub-object, that tells the save data manager to automatically wipe the data in that sub-object when a new room is entered. This is what we want, because in this example, enemy NPCs will only exist in the context of the current room, and we don't care about keeping data for NPCs that have already despawned.

Finally, inside of the `room` sub-object, we define the `fooData` map. (If you don't know what a `Map` is, read the [JavaScript/TypeScript tutorial](javascript-tutorial.md#maps), as understanding maps is essential for this section.) The `fooData` map is two-dimensional in that it will contain the data for every NPC in the room.

So, we need a way to identify each NPC in the room, and then use this identifier as the index in our map. The solution is to use the pointer hash, which a unique string that can be retrieved with the global function `GetPtrHash`:

```ts
const ptrHash = GetPtrHash(entity);
```

Imagine that we are in the `POST_ENTITY_DMG` callback, and an NPC has just gotten hit by the player's tear. So now, we want to increment the number of sleep counters:

```ts
function incrementSleepCounter(npc: EntityNPC) {}
  const ptrHash = GetPtrHash(npc);
  let data = v.run.fooData.get(ptrHash);
  if (data === undefined) {
    data = new FooData();
    v.run.fooData.set(data);
  }

  data.sleepCounters += 1;
}
```

That's about all there is to it. Here, the `FooData` class corresponds to the old `GetData` table. You can add as many variables to the class as you need.

### DefaultMap

The previous example is a very common pattern in Isaac modding. The IsaacScript standard library offers a data structure called a `DefaultMap` that can simplify this pattern even further. A `DefaultMap` allows you to specify a default value for things in the map. Subsequently, you don't have to worry about checking for the case where the data doesn't exist yet, because the `DefaultMap` automatically instantiates it for you.

```ts
const v = {
  room: {
    fooData: new DefaultMap<PtrHash, FooData>(() => new FooData()),
  },
};

// We call "fooInit() in our "main.ts" file after first initializing our mod.
export function fooInit(): void {
  saveDataManager("foo", v);
}

function incrementSleepCounter(npc: EntityNPC) {}
  const ptrHash = GetPtrHash(npc);
  const data = v.run.fooData.getAndSetDefault(ptrHash);
  data.sleepCounters += 1;
}
```

Let's break this down.

You specify the default value of the map with the first argument of the constructor. The first argument can either be a raw value, like 0. Or, it can be a function that dynamically calculates/creates a value. Here, we pass a very simple function that just instantiates a new class.

In the `incrementSleepCounter` function, we use the `getAndSetDefault` method instead of the `get` method. If the monster already exists in the map, then the `getAndSetDefault` will do the same thing as the `get` method. If the monster does not exist yet in the map, the `DefaultMap` will run the function we provided and give us the new data.

<br />

## Tracking Other Kinds of Entities

In the previous example, we used the save data manager to track data about entities that only exist in the context of a single room. However, mods will also commonly want to store data about players. Players exist for an entire run, not just a single room. This means that a slightly different approach is necessary.

For this case, instead of using `GetPtrHash`, you can use `getPlayerIndex`. (The corresponding type is `PlayerIndex`.)

So, for example, you might have a `v` that looks something like this:

```ts
const v = {
  run: {
    playerCounters: new DefaultMap<PlayerIndex, int>(0),
  },
};
```

For pickups, use `getPickupIndex`. (The corresponding type is `PickupIndex`.)

For familiars (and Dark Esau), use the `Entity.InitSeed`. (The corresponding type is `Seed`.)

## Saving and Continuing

A huge benefit of using the save data manager is that any variables you create will be automatically saved to disk if the player decides to save and quit the run.

In the first example above, we were adding sleep counters to enemy NPCs. For this case, the save data manager wouldn't actually save anything, because nothing in `room` sub-object needs to be permanently saved. (Since the player reloads the room when continuing the game, the `room` object is flushed in the same way that it is flushed when the player enters a new room normally. For this reason, saving any of the `room` values would be superfluous.)

In the second example above, we were tracking counters on players. For this case, since players exist over the course of the entire run, the save data manager would automatically save everything without you having to worry about anything at all! (This is magic that would take around a thousand of lines of code to write yourself.)

## Storing Other Variables

The point of this article is to showcase how you can use a local object to store data about an entity as an alternative to using `GetData`. But note that in IsaacScript mods, using `v` is the typical way to store data about anything, not just entities. Your `v` object will contain all the variables needed to make your feature work. So using the `v` pattern is very powerful.
