# `require-unannotated-const-assertions`

Disallows explicit type annotations for variables that have a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

## Rule Details

A "const assertion" is a useful feature of TypeScript that changes the type to the narrowest possible setting. Good TypeScript codebases will make heavy use of this feature in order to make their variables as safe as possible.

However, if a variable has both an explicit type annotation and a const assertion, then the const assertion will be ignored and the type annotation will take precedence. Thus, this situation is almost always a mistake, and you should choose to have _either_ a type annotation or a const assertion (with the latter being the generally safer option).

```ts
// Bad
const array: number[] = [1, 2, 3] as const;

// Good
const array = [1, 2, 3] as const;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-unannotated-const-assertions": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-unannotated-const-assertions.ts)
- [Test source](../../tests/rules/require-unannotated-const-assertions.test.ts)
