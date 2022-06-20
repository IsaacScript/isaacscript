# `no-invalid-default-map`

Disallows invalid constructors for the `DefaultMap` class.

(The `DefaultMap` class is a custom class that extends a normal `Map` and provides some extra utility functions.)

Specifically, the only valid types for the first constructor argument are `boolean`, `number`, `string`, and `function`.

## Rule Details

```ts
// Bad
const defaultMap = new DefaultMap<string, string[]>([]);

// Good
const defaultMap = new DefaultMap<string, string[]>(() => []);
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-invalid-default-map": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-invalid-default-map.ts)
- [Test source](../../tests/rules/no-invalid-default-map.test.ts)
