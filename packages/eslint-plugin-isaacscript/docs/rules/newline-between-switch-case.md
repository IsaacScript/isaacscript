# `newline-between-switch-case`

Requires newlines between switch cases. Based on [this rule](https://github.com/lukeapage/eslint-plugin-switch-case/blob/master/docs/rules/newline-between-switch-case.md).

## Rule Details

```ts
// Bad
switch (foo) {
  case 1: {
    doSomething();
    break;
  }
  case 2: {
    doSomething();
    break;
  }
}

// Good
switch (foo) {
  case 1: {
    doSomething();
    break;
  }

  case 2: {
    doSomething();
    break;
  }
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/newline-between-switch-case": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/newline-between-switch-case.ts)
- [Test source](../../tests/rules/newline-between-switch-case.test.ts)
