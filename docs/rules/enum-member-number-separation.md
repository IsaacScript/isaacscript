# `enum-member-number-separation`

Disallows numbers next to letters in enum members.

If your TypeScript project has a convention to use SHOUTING_SNAKE_CASE style for enum members, then this rule is useful to ensure grammatically-correct enum member names.

## Rule Details

```ts
// Bad
enum Foo {
  VALUE1,
  VALUE2,
}

// Good
enum Foo {
  VALUE_1,
  VALUE_2,
}
```

## Options

```json
{
  "rules": {
    "isaacscript/enum-member-number-separation": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/enum-member-number-separation.ts)
- [Test source](../../tests/rules/enum-member-number-separation.test.ts)
