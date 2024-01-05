# `no-string-length-0`

Disallows checking for empty strings via the length method in favor of direct comparison to an empty string, since the latter is shorter and easier to read.

## Rule Details

```ts
// Bad
declare const foo: string;
if (foo.length === 0) {
}

// Good
declare const foo: string;
if (foo === "") {
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-string-length-0": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/no-string-length-0.ts)
- [Test source](../../tests/rules/no-string-length-0.test.ts)
