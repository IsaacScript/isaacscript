# `require-variadic-function-argument`

Requires that variadic functions must be supplied with at least one argument.

## Rule Details

[Variadic functions](https://en.wikipedia.org/wiki/Variadic_function) are functions that take a variable amount of arguments. However, as far as the TypeScript compiler is concerned, passing no arguments at all to a variadic function is legal. But doing this is almost always a bug. For example:

```ts
const myArray = [1, 2, 3];
array.push(); // Oops!
```

Here, the author of the code made a typo and forgot to supply the thing to be inserted into the array.

This rule requires that you always pass at least one argument to a variadic function.

Note that this function is hard-coded to not throw an error with `console.log`, since it is relatively common to use it with no arguments in order to print a newline.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-variadic-function-argument": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/require-variadic-function-argument.ts)
- [Test source](../../tests/rules/require-variadic-function-argument.test.ts)
