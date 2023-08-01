# `no-number-enums`

Disallows number enums.

## Rule Details

The TypeScript compiler has much looser checks for number enums than it does for string enums. For this reason, the TypeScript ecosystem has preferred string enums over number enums.

For pure TypeScript programs, the actual value of enums should never matter, so whether they are strings or numbers at runtime would just be an implementation detail. The performance of string enums versus number enums is roughly equivalent and would depend on the specific program. For this reason, you can convert all number enums to string enums in order to get better safety guarantees from the TypeScript compiler.

Note that this rule does not warn on auto-computed number enums, so it must be used in conjunction with the [`@typescript-eslint/prefer-enum-initializers`](https://typescript-eslint.io/rules/prefer-enum-initializers/) rule.

```ts
// Bad
enum Foo {
  Value1 = 1,
}

// Good
enum Foo {
  Value1 = "Value1",
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-number-enums": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-number-enums.ts)
- [Test source](../../tests/rules/no-number-enums.test.ts)
