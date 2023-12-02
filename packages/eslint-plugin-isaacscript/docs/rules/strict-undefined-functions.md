# `strict-undefined-functions`

Disallows empty return statements in functions annotated as returning undefined.

## Rule Details

`void` is different from `undefined` in that `undefined` is a value and `void` is the lack of any value. Thus, it is confusing if someone is returning nothing from a function that is annotated as returning `undefined`. In general, this is indication that either the return type of the function should be changed to `void` or that `undefined` should be explicitly returned.

```ts
// Bad
function foo(): undefined {
  return;
}

// Bad
function foo(): undefined {}

// Good
function foo(): undefined {
  return undefined;
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/strict-undefined-functions": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/strict-undefined-functions.ts)
- [Test source](../../tests/rules/strict-undefined-functions.test.ts)
