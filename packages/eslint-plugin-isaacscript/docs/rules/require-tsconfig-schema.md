# `require-tsconfig-schema`

Requires that all "tsconfig.json" files have a "@schema" field..

## Rule Details

```ts
// Bad

// Good
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-tsconfig-schema": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-tsconfig-schema.ts)
- [Test source](../../tests/rules/require-tsconfig-schema.test.ts)
