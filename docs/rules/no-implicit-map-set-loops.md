# `no-implicit-map-set-loops`

Disallows implicit iteration for `Maps` and `Sets`.

This makes it more clear to the reader what type of data structure is being used.

## Rule Details

```ts
const myMap = new Map();

// Bad
for (const [key, value] of myMap) {
}

// Good
for (const [key, value] of myMap.entries()) {
}
```

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
