# `strict-void-functions`

Disallows non-empty return statements in functions annotated as returning void.

## Rule Details

`void` is different from `undefined` in that `undefined` is a value and `void` is the lack of any value. Thus, it is confusing if someone is explicitly returning `undefined` from a function that is annotated as returning `void`. In general, this is indication that either the return type of the function should be changed to `undefined` or the predicate of the `return` statement is superfluous.

```ts
// Bad
function foo(): void {
  return undefined;
}

// Good
function foo(): void {
  return;
}

// Good
function foo(): undefined {
  return undefined;
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/strict-void-functions": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/strict-void-functions.ts)
- [Test source](../../tests/rules/strict-void-functions.test.ts)
