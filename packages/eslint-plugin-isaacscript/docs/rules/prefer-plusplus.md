# `prefer-plusplus`

Require `++` operators instead of assignment operators where applicable.

## Rule Details

```ts
// Bad
i += 1;

// Good
i++;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/prefer-plusplus": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/prefer-plusplus.ts)
- [Test source](../../tests/rules/prefer-plusplus.test.ts)
