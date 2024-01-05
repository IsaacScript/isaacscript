# `no-explicit-array-loops`

Disallows explicit iteration for arrays.

In this case, "explicit iteration" means using the `values` method (or `Object.values`) in a for loop. Forbidding this can make code easier to read.

Also see the [`no-explicit-map-set-loops`](no-explicit-map-set-loops.md) rule.

## Rule Details

In JavaScript/TypeScript, you can iterate over array elements implicitly:

```ts
for (const element of myArray) {
}
```

Or, you can iterate over array elements explicitly:

```ts
for (const element of thing.values()) {
}
```

Idiomatic TypeScript code iterates implicitly. Explicit iteration is rare because it is needlessly verbose. Thus, it is recommended to forbid this pattern in your codebase to prevent confusion and ensure consistency.

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

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/no-explicit-array-loops.ts)
- [Test source](../../tests/rules/no-explicit-array-loops.test.ts)
