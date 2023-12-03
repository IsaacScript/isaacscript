# `no-void-return-type`

Disallows `void` return types on non-exported functions.

## Rule Details

Most of the time, programmers do not bother typing `void` after the functions that they write, since this return type is implied by default. Adding the `void` annotation to every function would clutter the code.

With that said, some codebases use the [`explicit-module-boundary-types`](https://typescript-eslint.io/rules/explicit-module-boundary-types/) ESLint rule, which requires that you annotate the type for every exported function. So in this case, typing the `void` is required for some functions.

However, from time to time, programmers will refactor exported functions to non-exported functions. After doing this, the largely-superfluous `void` annotation will remain in the code, causing clutter.

To solve the problem, use this lint rule to automatically remove void return types on non-exported functions.

```ts
// Bad
function foo(): void {}

// Good
function foo() {}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-void-return-type": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-void-return-type.ts)
- [Test source](../../tests/rules/no-void-return-type.test.ts)
