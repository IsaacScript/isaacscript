# `no-number-enums`

Disallows number enums.

## Rule Details

The TypeScript compiler has looser checks for number enums than it does for string enums. For this reason, the TypeScript ecosystem has preferred string enums over number enums.

Note that this rule does not trigger on [computed number enums](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members), so it must be used in conjunction with the [`@typescript-eslint/prefer-enum-initializers`](https://typescript-eslint.io/rules/prefer-enum-initializers/) rule.

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

## Why?

For pure TypeScript programs, the actual value of enums should never matter. Thus, whether they are strings or numbers at runtime is just be an implementation detail. The performance of string enums versus number enums is roughly equivalent and would depend on the specific program. The memory requirement of string enums is slightly more than number enums, but this would be negligible for all but the most extreme cases. For these reasons, you can generally convert all of your number enums to string enums in order to get better safety guarantees from the TypeScript compiler.

Obviously, there are [some cases where number enums are superior](strict-enums.md#number-enums-vs-string-enums). If you are in a codebase that needs to use number enums, then you should disable this rule and make sure that you use the [`strict-enums`](strict-enums.md) rule, which makes working with number enums about as safe as string enums.

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
