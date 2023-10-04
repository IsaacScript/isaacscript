# `consistent-return-undefined`

Require return statements to specify undefined to match the function type annotation.

## Rule Details

This makes it more explicit that the function has a non-void return type annotation. (If the function is not actually supposed to explicitly return something, then the type annotation should be changed to `void` instead of `undefined`.)

Note that this rule is similar to the [`consistent-return`](https://eslint.org/docs/latest/rules/consistent-return) core ESLint rule, but it is type-aware and works properly with the `noImplicitReturns` TypeScript compiler flag.

```ts
// Bad
function getFoo(): undefined {}

// Bad
function getFoo(): undefined {
  return;
}

// Good
function getFoo(): undefined {
  return undefined;
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/consistent-return-undefined": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/consistent-return-undefined.ts)
- [Test source](../../tests/rules/consistent-return-undefined.test.ts)
