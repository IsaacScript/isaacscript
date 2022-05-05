# `no-template-curly-in-string-fix`

Disallows template literal placeholder syntax in regular strings (and automatically fixes the problem).

This is a replacement for the ESLint [no-template-curly-in-string rule](https://eslint.org/docs/rules/no-template-curly-in-string) that includes the ability for `--fix` to work properly.

## Rule Details

The official ESLint [no-template-curly-in-string](https://eslint.org/docs/rules/no-template-curly-in-string) rule will throw an error if you use `"foo: ${foo}"`, complaining that you should convert it to ``foo: ${foo}``. This is a fantastic rule, as the use of the former is almost always a bug.

However, when using the `--fix` flag, ESLint will not automatically fix this for you, unlike other rules. This is because ESLint does not want to break code in the extremely rare case where the programmer did this intentionally.

To get around this, use this rule instead.

## Options

```json
{
  "rules": {
    "isaacscript/no-template-curly-in-string-fix": "error"
  }
}
```

This rule is not configurable.
