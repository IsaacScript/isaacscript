# `require-capital-const-assertions`

Requires a capital letter for named objects and arrays that have a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

## Rule Details

In TypeScript:

- Variables are usually typed with [camelCase](https://en.wikipedia.org/wiki/Camel_case) names.
- Types, interfaces, enums, and classes are usually typed with [PascalCase](https://techterms.com/definition/pascalcase) names.
- Static constants are usually typed with [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) names.

Thus, when a variable is typed with a capital letter, it is heavily implied that it is acting as an enum, some other type-like value, or a read-only constant.

The `enum` construct that is built-in to TypeScript makes things immutable by default. However, not everyone uses the built-in enums for various reasons. And in some cases, like when the enum values are the results of a function, you can't use the built-in enums at all. Thus, it is common to see plain objects representing enums in both JavaScript and TypeScript code.

Since enums should never be modified, it almost always makes sense to use the [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) feature of TypeScript on objects that are representing an enum. Doing so will automatically make every property read-only without having to manually type it on every single field.

Similarly, the same logic applies to objects or arrays that are representing a static, read-only constant - they should also always have a const assertion.

Use this rule to ensure read-only fields on all of the enums and constants throughout your codebase to keep things as safe as possible.

```ts
// Bad
// (object acting as a number enum)
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
};

// Good
// (object acting as a number enum)
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;

// Bad
// (object acting as a static map)
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
};

// Good
// (object acting as a static map)
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
} as const;

// Bad
// (array acting as a static constant)
const FOO = [1, 2, 3];

// Good
// (array acting as a static constant)
const FOO = [1, 2, 3] as const;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-capital-const-assertions": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-capital-const-assertions.ts)
- [Test source](../../tests/rules/require-capital-const-assertions.test.ts)
