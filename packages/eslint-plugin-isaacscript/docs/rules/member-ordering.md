# `member-ordering`

Require a consistent member declaration order.

## Rule Details

This is the same thing as the [`@typescript-eslint/member-ordering`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.md) rule, except it allows you to also sort enums.

Use the `enums` option to activate this function.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/member-ordering": "error"
  }
}
```

See the [upstream docs](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.md) for the possible options. Additionally, you can use an option of `enums` in addition to `classes`, `interfaces`, and so on.

## Resources

- [Rule source](../../src/rules/member-ordering.ts)
- [Test source](../../tests/rules/member-ordering.test.ts)
