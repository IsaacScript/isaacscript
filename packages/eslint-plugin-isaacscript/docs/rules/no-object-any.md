# `no-object-any`

Disallows declaring objects and arrays that do not have a type.

This is useful because the `noImplicitAny` TypeScript compiler flag does not always catch this pattern. If you want to purge all of the `any` from your codebase, you need this rule.

## Rule Details

```ts
// Bad
const myMap = new Map();

// Good
const myMap = new Map<string, string>();
```

```ts
// Bad
const myArray = [];

// Good
const myArray: string[] = [];
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-object-any": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/no-object-any.ts)
- [Test source](../../tests/rules/no-object-any.test.ts)
