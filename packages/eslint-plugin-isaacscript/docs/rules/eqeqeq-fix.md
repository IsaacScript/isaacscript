# `eqeqeq-fix`

Requires the use of `===` and `!==` (and automatically fixes).

This is a replacement for the ESLint [`eqeqeq`](https://eslint.org/docs/latest/rules/eqeqeq) rule that includes the ability for `--fix` to work properly.

## Rule Details

The official ESLint [`eqeqeq`](https://eslint.org/docs/latest/rules/eqeqeq) rule works like this:

```ts
// Bad
if (foo == bar) {
}

// Good
if (foo === bar) {
}
```

This is a fantastic rule, as the use of `==` is almost always a bug. However, ESLint will not automatically fix this for you when using the `--fix` flag, unlike other rules. This is because ESLint does not want to break code in the rare case where the programmer did this intentionally.

To get around this, use this rule instead.

## Gotchas

If you use this rule, make sure to turn off the vanilla ESLint rule, like this:

```json
{
  "rules": {
    "eqeqeq": "off"
  }
}
```

Otherwise, the two rules will conflict with each other.

Note that if you use the `recommended` config that comes with this plugin, then the vanilla ESLint rule will be turned off automatically.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/eqeqeq-fix": "error"
  }
}
```

This rule is not configurable. (All of the unsafe options from the original have been removed.)

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/eqeqeq-fix.ts)
- [Test source](../../tests/rules/eqeqeq-fix.test.ts)
