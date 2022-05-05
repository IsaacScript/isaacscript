# `no-let-any`

Disallows declaring variables with let that do not have a type.

This is useful because the `noImplicitAny` TypeScript compiler flag does not always catch this pattern. If you want to purge all of the `any` from your code base, you need this rule.

## Rule Details

```ts
// Bad
let foo;

// Good
let foo: string;
```

## Options

```json
{
  "rules": {
    "isaacscript/no-let-any": "error"
  }
}
```

This rule is not configurable.
