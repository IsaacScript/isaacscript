# `strict-enums`

Disallows the usage of unsafe enum patterns. Designed to be used in addition to [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison).

## Rule Details

Horrifyingly, the TypeScript compiler will allow you to use number literals interchangeably with number enums. For example:

```ts
enum Fruit {
  Apple,
  Banana,
}

let fruit = Fruit.Apple;
fruit = 1; // No error!
```

The above code snippet should instead be written as `fruit = Fruit.Banana`. Allowing raw numeric literals subverts the whole point of using enums in the first place.

This type-checking looseness has resulted in many TypeScript programmers avoiding the use of enums altogether in favor of arrays and/or string unions. Other TypeScript programmers avoid number enums in favor of string enums (which have better safety guarantees from the TypeScript compiler). However, [numeric enums have some advantages over string enums](#number-enums-vs-string-enums).

In the cases where you need to use number enums, you should use this lint rule to make number enums just as safe as string enums are. See the examples below for the types of patterns that are prevented.

## Goals

The goal of this rule is to make enums work like they do in other languages. One of the main benefits of enums is that they allow you to write code that is future-safe, because enums are supposed to be resilient to reorganization. If you arbitrarily change the values of an enum (or change the ordering of an enum with computed values), the idea is that nothing in your code-base should break.

## Banned Patterns

This rule bans:

1. Enum incrementing/decrementing - `incorrectIncrement`
1. Mismatched enum declarations/assignments - `mismatchedAssignment`
1. Mismatched enum function arguments - `mismatchedFunctionArgument`

(It does not ban mismatched enum comparisons, since that is handled by [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison).)

<!--tabs-->

### ❌ Incorrect

```ts
let fruit = Fruit.Apple;
fruit++;
```

```ts
const fruit: Fruit = 0;
```

```ts
function useFruit(fruit: Fruit) {}
useFruit(0);
```

### ✅ Correct

```ts
let fruit = Fruit.Apple;
fruit = Fruit.Banana;
```

```ts
const fruit = Fruit.Apple;
```

```ts
let fruit = Fruit.Apple;
fruit = Fruit.Banana;
```

```ts
function useFruit(fruit: Fruit) {}
useFruit(Fruit.Apple);
```

## Error Information

- `incorrectIncrement` - You cannot increment or decrement an enum type.
  - Enums are supposed to be resilient to reorganization, so you should explicitly assign a new value instead. For example, if someone someone reassigned/reordered the values of the enum, then it could potentially break your code.
- `mismatchedAssignment` - The type of the assignment does not match the declared enum type of the variable.
  - In other words, you are trying to assign a `Foo` enum value to a variable with a `Bar` type. Enums are supposed to be resilient to reorganization, so these kinds of assignments can be dangerous.
- `mismatchedFunctionArgument` - The argument in the function call does not match the declared enum type of the function signature.
  - You might be trying to use a number literal, like `useFoo(1)`. Or, you might be trying to use a disparate enum type, like `useFoo(Bar.Value1)`. Either way, you need to use a value that corresponds to the correct enum, like `useFoo(Foo.Value1)`. Enums are supposed to be resilient to reorganization, so non-exact function calls like this can be dangerous.

## Number Enums vs String Enums

Surprisingly, the TypeScript compiler deals with string enums in a safer way than it does with number enums. If we duplicate the first example above by using a string enum, the TypeScript compiler will correctly throw an error:

```ts
enum Vegetable {
  Lettuce = "Lettuce",
  Carrot = "Carrot",
}

let vegetable = Vegetable.Lettuce;
vegetable = "Carrot"; // Type '"Carrot"' is not assignable to type 'Vegetable'.
```

Thus, the `isaacscript/strict-enums` rule is mostly concerned with throwing errors for misused number enums. (Note that even if you use string enums, you should still be using the [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison) rule, since string enums are still bugged when using comparison operators or switch statements.)

But why would you want to use numeric enums over string enums at all? Note that they have some advantages:

- Numeric enums can use computed members, which allow for extremely concise and easy to read code. Additionally, when all of the enum members are computed, they can easily be reorganized without having to change N other lines, which causes lot of noise in Git.
- Numeric enums can save memory in the cases where the codebase has a huge amount of them (such as [the `@typescript-eslint` repository](https://github.com/typescript-eslint/typescript-eslint/)).
- Numeric enums can save bandwidth in the cases where they are serialized over the wire. This can matter in applications that do a lot of back and forth communication (with e.g. WebSockets) or in cases where you have millions of users and the tiny amount of bandwidth saved scales to big numbers.
- Numeric enums often have to be used when modelling upstream APIs that you don't have control over.

For this reason, we recommend that use you the [`isaacscript/no-number-enums`](no-number-enums.md) rule by default in your TypeScript projects. But in the specific projects where you need number enums, you can disable that rule and rely on the `isaacscript/strict-enums` rule to keep you safe.

## Limitations

### The `satisfies` Operator

The `strict-enums` rule cannot see through the `satisfies` operator. In other words, this rule will not be able to catch the following bug:

```ts
enum Fruit {
  Apple,
  Banana,
}

const FRUIT_PRICES = {
  [Fruit.Apple]: 5,
  [1]: 10,
} as const satisfies Record<Fruit, number>;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/strict-enums": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/strict-enums.ts)
- [Test source](../../tests/rules/strict-enums.test.ts)
