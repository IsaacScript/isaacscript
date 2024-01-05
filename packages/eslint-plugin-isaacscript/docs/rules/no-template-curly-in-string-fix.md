# `no-template-curly-in-string-fix`

Disallows template literal placeholder syntax in regular strings (and automatically fixes).

This is a replacement for the ESLint [`no-template-curly-in-string`](https://eslint.org/docs/latest/rules/no-template-curly-in-string) rule that includes the ability for `--fix` to work properly.

## Rule Details

The official ESLint [`no-template-curly-in-string`](https://eslint.org/docs/latest/rules/no-template-curly-in-string) rule works like this:

```ts
// Bad
const fooString = "foo: ${foo}";

// Good
const fooString = `foo: ${foo}`;
```

This is a fantastic rule, as the use of quotes in this situation is almost always a bug. However, ESLint will not automatically fix this for you when using the `--fix` flag, unlike other rules. This is because ESLint does not want to break code in the extremely rare case where the programmer did this intentionally.

To get around this, use this rule instead.

## Gotchas

If you use this rule, make sure to turn off the vanilla ESLint rule, like this:

```json
{
  "rules": {
    "no-template-curly-in-string": "off"
  }
}
```

Otherwise, the two rules will conflict with each other.

Note that if you use the `recommended` config that comes with this plugin, then the vanilla ESLint rule will be turned off automatically.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-template-curly-in-string-fix": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/no-template-curly-in-string-fix.ts)
- [Test source](../../tests/rules/no-template-curly-in-string-fix.test.ts)
