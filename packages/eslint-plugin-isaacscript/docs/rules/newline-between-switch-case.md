# `newline-between-switch-case`

Requires newlines between switch cases. Having newlines between each case can make code easier to read, as it better delineates each block.

Based on [this rule](https://github.com/lukeapage/eslint-plugin-switch-case/blob/master/docs/rules/newline-between-switch-case.md).

## Rule Details

This rule does not apply to "fall through" switch cases; those should be squished together with the other cases. See below for an example.

```ts
// Bad
switch (foo) {
  case 1:
  case 2:
  case 3: {
    doSomething();
    break;
  }
  case 4: {
    doSomething();
    break;
  }
}

// Good
switch (foo) {
  case 1:
  case 2:
  case 3: {
    doSomething();
    break;
  }

  case 4: {
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
