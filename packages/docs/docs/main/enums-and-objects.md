---
title: The Difference Between Enums and Objects
---

In IsaacScript mods, both enums and objects are used, depending on the situation. This might be a little confusing.

For most purposes, it is not important to know the low-level details - you can use whichever one you like. But if you want to dive into some of the details and explore the differences, then read on.

<br />

### Enum Introduction

"Enum" is short for "enumeration". In programming, the term is used to describe an object that contains a finite set of values.

TypeScript has first-class support for enums. This means that you can type the word `enum` to create one, and this is part of the language itself, which is really handy. In good code, enums are used a lot: they get rid of [magic numbers](<https://en.wikipedia.org/wiki/Magic_number_(programming)>) and constrain possible values to a finite set.

For example, this is the enum that describes the four different kinds of slots that active items can go into:

```ts
enum ActiveSlot {
  PRIMARY = 0,
  SECONDARY = 1,
  POCKET = 2,
  POCKET_SINGLE_USE = 3,
}
```

But notice that we could also type this as an object instead:

```ts
const ActiveSlot = {
  PRIMARY: 0,
  SECONDARY: 1,
  POCKET: 2,
  POCKET_SINGLE_USE: 3,
};
```

This is _kind of_ the same thing, but there are a few key differences.

<br />

### Enums By Default

Let's start with the basics. By default, we should use enums over objects, where possible. Why?

#### 1) Clear Intent

First, enums make the intent more clear. Enums represent the concept of "a finite set of values". On the other hand, a plain object can represent basically anything. If we want to specify a finite set of values, then using an `enum` clearly communicates the intent to anyone reading the code.

#### 2) Computed Members

Second, enums have a feature called [computed members](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members). This means that we don't have to bother typing out what the values are. For example, we can type the `ActiveSlot` enum from earlier like this:

```ts
enum ActiveSlot {
  PRIMARY,
  SECONDARY,
  POCKET,
  POCKET_SINGLE_USE,
}
```

Here, TypeScript automatically assigns a value of 0 to the first member, a value of 1 to the second member, and so on. This saves time _now_, because we don't have to type `= 0` (and so on). It also saves time _later_, because if we add a new entry in the middle, we don't have to also modify all the lines that come afterwards.

#### 3) Reverse Mapping

Third, enums automatically get a reverse mapping at run-time. For example, imagine that you are debugging something to do the `ActiveSlot` enum above. You might type the following code to help troubleshoot it:

```ts
log(`DEBUG - The active slot is: ${activeSlot}`);
```

This might print out: `DEBUG - The active slot is: 2`. But that's annoying, because we might not know what 2 even means in this context. Instead, we can make life easier on ourselves by writing our debug statement like this:

```ts
log(`DEBUG - The active slot is: ${ActiveSlot[activeSlot]} (${activeSlot})`);
```

This would print out: `DEBUG - The active slot is: POCKET (2)`. Much better! In essence, the reverse mapping helps us easily retrieve the name of any enum value when we need it. (The lookup is done in O(1) time. On an object, it would be done in O(N) time, since we would have to iterate over the entries.)

#### Conclusion - Use Enums

Thus, in the general case, we use enums. We only have to resort to using objects in the special cases where "normal" enums won't work.

<br />

### The Differences Between Types and Containers

So, what are the situations where "normal" enums won't work?

In order to understand that, we first have to understand the difference between a "type" and a "container". Enums blur the distinction between these two things, so we need to take a step back and think about how they can be different.

#### 1) The `CollectibleType` Type

First, let's drill down on what exactly a "type" is. Consider the `EntityPlayer.AddCollectible` method. You can use it like this:

```ts
const player = Isaac.GetPlayer();
player.AddCollectible(CollectibleType.SAD_ONION);
```

The `EntityPlayer.AddCollectible` method takes in a variable of type `CollectibleType`. But notice that the following code will also work just fine:

```ts
const MY_CUSTOM_ITEM = Isaac.GetItemIdByName("My Custom Item");
const player = Isaac.GetPlayer();
player.AddCollectible(MY_CUSTOM_ITEM);
```

This is because the return type of the `Isaac.GetItemIdByName` method is `CollectibleType`.

The point of this example is to show that _any_ variable can be of type `CollectibleType`. As far as the `EntityPlayer.AddCollectible` method is concerned, the requirement is **not** that the incoming thing is attached to the `CollectibleType` enum, like `CollectibleType.SAD_ONION` is. Rather, the requirement is that the type of the variable matches the `CollectibleType` type.

So, in most cases, we use the word `CollectibleType` to refer to the `CollectibleType` type. But that's not all we use it for.

#### 2) The `CollectibleType` Container

We also use the word `CollectibleType` to refer to the "container" that holds all of the `CollectibleType` values. To illustrate this, we could create a container with a different name, but still having `CollectibleType` values:

```ts
const MyContainer = {
  VALUE_1: CollectibleType.SAD_ONION,
  VALUE_2: CollectibleType.INNER_EYE,
  VALUE_3: CollectibleType.SPOON_BENDER,
};
```

Here, `MyContainer` is not a type. It's just a container that holds values with the `CollectibleType` type. We can use these values without a problem:

```ts
const player = Isaac.GetPlayer();
player.AddCollectible(MyContainer.VALUE_1);
```

### The Differences Between Objects and Enums

With the previous section in mind, we now know the main difference between an object and an enum:

- Creating an object is just creating a container.
- Creating an enum is creating both a container **and** a type at the same time, with all of the values inside of it automatically being converted to the new type.

<br />

### Where Enums Don't Work

Now that we know the difference between objects and enums, we can explore the specific situations in which enums won't work. The most common situation is when we want to create an enum containing our modded items or entities.

For example, imagine that we had a custom collectible in our mod called "Foo". Try typing the following into your mod:

```ts
enum CollectibleTypeCustom {
  FOO = Isaac.GetItemIdByName("Foo"),
}
```

This will give an error:

> Type 'import("C:/Repositories/my-mod/node_modules/isaac-typescript-definitions/dist/enums/collections/subTypes").CollectibleType' is not assignable to type 'CollectibleTypeCustom'.

If we had typed `FOO = 1` or something like that, then under the hood, TypeScript would automatically convert "1" to a type of `CollectibleTypeCustom`, and we wouldn't get an error. But since we used the `Isaac.GetItemIdByName` method, the value is a `CollectibleType`, which is more specific than a `number`. TypeScript can't automatically convert `CollectibleType` to `CollectibleTypeCustom`, so it throws an error. (In TypeScript, the only supported types that you can feed to an enum for auto-conversion are `number` or `string`.)

We could temporarily fix the problem by using a type assertion, like this:

```ts
enum CollectibleTypeCustom {
  FOO = Isaac.GetItemIdByName("Foo") as number,
}
```

This is essentially telling the TypeScript compiler: "Hey, I'm positive this is a `number`, so forget whatever else you think you know about this line." Doing that would make TypeScript succeed in converting the result of the method to the `CollectibleTypeCustom` type. However, this isn't really what we want either. For example, say that later on, we want to give the player our custom collectible:

```ts
const player = Isaac.GetPlayer();
player.AddCollectible(CollectibleTypeCustom.FOO);
```

This would give a compiler error, because `CollectibleTypeCustom.FOO` is of type `CollectibleTypeCustom`. And as we said earlier, the `EntityPlayer.AddCollectible` method needs to take in a type of `CollectibleType`, not `CollectibleTypeCustom`. They are completely different types.

By now, hopefully it is clear that we do not want to actually create a new type (which is what making a new enum will do). Instead, what we really want to do is to create a new container that holds values of an existing type. So that's why the correct solution is to create a "pseudo-enum" object, like this:

```ts
const CollectibleTypeCustom = {
  FOO: Isaac.GetItemIdByName("Foo"),
};
```

You can use this pattern whenever you want to create a custom enum that "inherits" the type of an existing enum. For most intents and purposes, these "container" objects will work in the same way as a normal enum. (But note that they won't have a [reverse mapping](#3-reverse-mapping) embedded into them.)

<br />
