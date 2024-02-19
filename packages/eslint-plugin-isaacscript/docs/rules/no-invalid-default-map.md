# `no-invalid-default-map`

Disallows invalid constructors for the `DefaultMap` class. (The `DefaultMap` class is a custom class that extends a normal `Map` and provides some extra utility functions.)

This rule is only intended for [_Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/) mods written with TypeScript that use the `DefaultMap` class. Since it is pointless in general TypeScript projects, it is not included in the `recommended` config.

Specifically, the only valid types for the first `DefaultMap` constructor argument are `boolean`, `number`/`int`/`float`, `string`, and `function`.

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

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/no-invalid-default-map.ts)
- [Test source](../../tests/rules/no-invalid-default-map.test.ts)
