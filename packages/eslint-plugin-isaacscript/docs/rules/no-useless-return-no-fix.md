# `no-useless-return-no-fix`

Disallows redundant return statements (and does not automatically fix).

This is a replacement for the ESLint [`no-useless-return`](https://eslint.org/docs/rules/no-useless-return) rule that turns off the ability to `--fix` automatically. This is useful because this rule's auto-fixer will often delete return statements while debugging. This wastes time and causes you to have to re-add them later.

## Rule Details

```ts
// Bad
function foo() {
  doSomething();
  return;
}

// Good
function foo() {
  doSomething();
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-useless-return-no-fix": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-useless-return-no-fix.ts)
- [Test source](../../tests/rules/no-useless-return-no-fix.test.ts)
