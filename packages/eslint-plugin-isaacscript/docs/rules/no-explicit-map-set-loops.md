# `no-explicit-map-set-loops`

Disallows explicit iteration for maps and sets.

In this case, "explicit iteration" means using the `values` method in a for loop. Forbidding this can make code easier to read.

Also see the [`no-explicit-array-loops`](no-explicit-array-loops.md) rule.

## Rule Details

In JavaScript/TypeScript, you can iterate over map or set elements implicitly:

```ts
for (const value of myMap) {
}

for (const value of mySet) {
}
```

Or, you can iterate over map or set elements explicitly:

```ts
for (const [key, value] of myMap.entries()) {
}

for (const [key, value] of mySet.values()) {
}
```

Nearly all code iterates implicitly. Explicit iteration is rare because it is needlessly verbose and can be confusing to people reading the code. Thus, it is recommended to forbid this pattern in your codebase to ensure consistency.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-explicit-map-set-loops": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-explicit-map-set-loops.ts)
- [Test source](../../tests/rules/no-explicit-map-set-loops.test.ts)
