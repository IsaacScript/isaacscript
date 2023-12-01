# `prefer-readonly-parameter-types`

Require function parameters to be typed as `readonly` to prevent accidental mutation of inputs.

This is the same thing as the [`@typescript-eslint/prefer-readonly-parameter-types`](https://typescript-eslint.io/rules/prefer-readonly-parameter-types/) rule, with the follow changes:

- The `allow` array is hard-coded to always contain `ReadonlyMap` and `ReadonlySet`.
- An additional option of "onlyArraysMapsSet" is added. This option will make the rule only examine a function parameter if it is an array, a tuple, a map, or a set. The option defaults to true.

## Resources

- [Rule source](../../src/rules/prefer-readonly-parameter-types.ts)
- [Test source](../../tests/rules/prefer-readonly-parameter-types.test.ts)
