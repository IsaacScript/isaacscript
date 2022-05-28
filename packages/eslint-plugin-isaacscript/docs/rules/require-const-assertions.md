# `require-const-assertions`

Requires the use of [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) for named objects with a capital letter.

## Rule Details

In TypeScript, variables are usually typed with [camelCase](https://techterms.com/definition/camelcase) names, and types/interfaces/enums/classes are usually typed with [PascalCase](https://techterms.com/definition/pascalcase) names. Thus, when a variable is typed with a capital letter, it is heavily implied that it is acting as an enum or some other type-like value.

The `enum` construct that is built-in to TypeScript makes things immutable by default. However, not everyone uses the built-in enums for various reasons. And in some cases, like when the enum values are the results of a function, you can't use the built-in enums at all. Thus, it is common to see plain objects representing enums in both JavaScript and TypeScript code.

Since enums should never be modified, it almost always makes sense to use the [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) feature of TypeScript on objects that are representing an enum. Doing so will automatically make every property read-only without having to manually type it on every single field.

Use this rule to ensure read-only fields on all of the enums throughout your code base to keep things as safe as possible.

```ts
// Bad
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
};

// Good
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-const-assertions": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-const-assertions.ts)
- [Test source](../../tests/rules/require-const-assertions.test.ts)
