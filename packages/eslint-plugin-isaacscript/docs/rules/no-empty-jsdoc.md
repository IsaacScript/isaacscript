# `no-empty-jsdoc`

Disallows empty JSDoc comments (and automatically removes them).

## Rule Details

```ts
// Bad
/** */
```

```ts
// Bad
/**    */
```

```ts
// Bad
/**
 *
 */
```

```ts
// Bad
/**
 *
 *
 *
 */
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-empty-jsdoc": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-empty-jsdoc.ts)
- [Test source](../../tests/rules/no-empty-jsdoc.test.ts)
