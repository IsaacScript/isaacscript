# `no-object-any`

Disallows declaring objects and arrays that do not have a type.

This is useful because the `noImplicitAny` TypeScript compiler flag does not always catch this pattern. If you want to purge all of the `any` from your code base, you need this rule.

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

## Options

```json
{
  "rules": {
    "isaacscript/no-object-any": "error"
  }
}
```

This rule is not configurable.
