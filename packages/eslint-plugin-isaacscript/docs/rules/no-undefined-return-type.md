# `no-undefined-return-type`

Disallows `undefined` return types on functions.

## Rule Details

A function that only returns `undefined` is confusing and likely to be a mistake, since a function that returns nothing should have a return type of `void`.

```ts
// Bad
function foo(): undefined {
  return;
}

// Good
function foo(): void {
  return;
}

// Bad
function foo() {
  return undefined;
}

// Good
function foo() {
  return;
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-undefined-return-type": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/no-undefined-return-type.ts)
- [Test source](../../tests/rules/no-undefined-return-type.test.ts)
