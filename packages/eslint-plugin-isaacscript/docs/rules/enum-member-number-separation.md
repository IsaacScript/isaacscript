# `enum-member-number-separation`

Disallows numbers next to letters in enum members.

If your TypeScript project has a convention to use SHOUTING_SNAKE_CASE style for enum members, then use rule to ensure grammatically-correct enum member names.

This rule is not part of the `recommended` config because by default, your TypeScript project should use [PascalCase as the naming convention for your enum members](https://www.typescriptlang.org/docs/handbook/enums.html).

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

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/enum-member-number-separation": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/enum-member-number-separation.ts)
- [Test source](../../tests/rules/enum-member-number-separation.test.ts)
