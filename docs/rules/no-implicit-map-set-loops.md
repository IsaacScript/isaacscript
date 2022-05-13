# `no-implicit-map-set-loops`

Disallows implicit iteration for `Maps` and `Sets`.

This can make code easier to read.

## Rule Details

Using implicit iteration for arrays is extremely common. For example:

```ts
for (const value of thing) {
}
```

Most people will read the above for loop and inuit: "Oh, `thing` is an array."

However, you can also implicitly iterate over maps (which defaults to `.entries()`) and sets (which defaults to `.values()`). For example:

```ts
const thing = new Set();

// Later on in the code
for (const value of thing) {
}
```

Uh oh! Now you might have mislead someone into thinking that `thing` is actually an array. It's nice to flag to the reader that this isn't an array, by doing this:

```ts
for (const value of thing.values()) {
}
```

The idea is that you should use implicit iteration for arrays, and explicit iteration for everything else.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-implicit-map-set-loops": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-implicit-map-set-loops.ts)
- [Test source](../../tests/rules/no-implicit-map-set-loops.test.ts)
