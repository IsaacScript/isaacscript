# `require-capital-read-only`

Requires maps/sets/arrays with a capital letter to be read-only.

## Rule Details

In TypeScript:

- Variables are usually typed with [camelCase](https://en.wikipedia.org/wiki/Camel_case) names.
- Static constants are usually typed with [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) names.

Thus, when a map, set, array, or object is typed with a capital letter, it is heavily implied that it is acting as a static constant. Since maps, sets, and arrays are writable by default, it is common to explicitly type these kinds of constants with `ReadonlyMap<Foo, Bar>` or `ReadonlySet<Foo>` or `readonly Foo[]` or `Readonly<Foo>` to enforce that they can never be modified later on, which prevents bugs. However, it can be difficult to remember to do this every single time.

Use this rule to ensure that the SCREAMING_SNAKE_CASE variables are read-only throughout your codebase to keep things as safe as possible.

Also see the [`require-capital-const-assertions` rule](require-capital-const-assertions.md).

```ts
// Bad
const MY_MAP = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);

// Good
const MY_MAP: ReadonlyMap<number, number> = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);

// Bad
const MY_SET = new Set([1, 2, 3]);

// Good
const MY_SET: ReadonlySet<number> = new Set([1, 2, 3]);

// Bad
const MY_ARRAY = [1, 2, 3];

// Good
const MY_ARRAY: readonly number[] = [1, 2, 3];

// Bad
const MY_OBJECT = {
  foo: 123,
  bar: 456,
};

// Good
interface Foo {
  foo: number;
  bar: number;
}
const MY_OBJECT: Readonly<Foo> = {
  foo: 123,
  bar: 456,
};
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-capital-read-only": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-capital-read-only.ts)
- [Test source](../../tests/rules/require-capital-read-only.test.ts)
