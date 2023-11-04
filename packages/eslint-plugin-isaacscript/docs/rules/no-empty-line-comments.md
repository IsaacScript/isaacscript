# `no-empty-line-comments`

Disallows empty line comments (and automatically removes them).

## Rule Details

```ts
// Bad
//

// Bad
//
//

// Good
// This is an non-empty comment. Empty comments are indicative of a mistake.
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-empty-line-comments": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-empty-line-comments.ts)
- [Test source](../../tests/rules/no-empty-line-comments.test.ts)
