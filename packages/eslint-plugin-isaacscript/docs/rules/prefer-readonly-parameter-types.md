# `prefer-readonly-parameter-types`

Require function parameters to be typed as `readonly` to prevent accidental mutation of inputs.

This is the same thing as the [`@typescript-eslint/prefer-readonly-parameter-types`](https://typescript-eslint.io/rules/prefer-readonly-parameter-types/) rule, with the follow changes:

- The `allow` array is hard-coded to always contain `ReadonlyMap` and `ReadonlySet`.
- An additional option of "onlyRecordsArraysMapsSet" is added. This option will make the rule only examine a function parameter if it is a record, an array, a tuple, a map, or a set. (In other words, only "simple" types.) The option defaults to true. The motivation behind this option is that it reduces a ton of false positives, which still retaining the core value of the rule.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/prefer-readonly-parameter-types.ts)
- [Test source](../../tests/rules/prefer-readonly-parameter-types.test.ts)
