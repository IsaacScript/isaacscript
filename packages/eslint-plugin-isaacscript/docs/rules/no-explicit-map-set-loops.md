# `no-explicit-map-set-loops`

Disallows explicit iteration for maps and sets.

In this case, "explicit iteration" means using a method like `entries` or `values` in a for loop, where omitting the method would result in equivalent code. Forbidding this can make code easier to read.

Also see the [`no-explicit-array-loops`](no-explicit-array-loops.md) rule.

## Rule Details

In JavaScript/TypeScript, you can iterate over map or set elements implicitly:

```ts
for (const [key, value] of myMap) {
}

for (const value of mySet) {
}
```

Or, you can iterate over map or set elements explicitly:

```ts
for (const [key, value] of myMap.entries()) {
}

for (const value of mySet.values()) {
}
```

Idiomatic TypeScript code iterates implicitly. Explicit iteration is rare because it is needlessly verbose. Thus, it is recommended to forbid this pattern in your codebase to prevent confusion and ensure consistency.

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
