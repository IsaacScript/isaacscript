# `no-explicit-array-loops`

Disallows explicit iteration for arrays.

In this case, "explicit iteration" means using `array.values()` in a for loop. Doing this can make code easier to read.

Also see the [`no-implicit-map-set-loops`](no-implicit-map-set-loops.md) rule.

## Rule Details

Using implicit iteration for arrays is extremely common. For example:

```ts
for (const value of thing) {
}
```

Most people will read the above for loop and inuit: "Oh, `thing` is an array."

However, you can also explicitly iterate over arrays by invoking `.values()`. For example:

```ts
for (const value of thing.values()) {
}
```

This is confusing for people reading the code, because it softly implies that `thing` is either a `Map` or a `Set`. Instead, you should always use implicit iteration for arrays, and [explicit iteration for everything else](no-implicit-map-set-loops.md).

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-explicit-array-loops": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-explicit-array-loops.ts)
- [Test source](../../tests/rules/no-explicit-array-loops.test.ts)
