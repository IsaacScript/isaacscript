# `no-unnecessary-assignment`

Disallows useless assignments.

## Rule Details

Sometimes, refactoring can lead to assignment statements that were once useful but are now redundant. This rule helps you clean up the dead code in a similar way that the [`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition/) rule does.

```ts
// Bad
declare let foo: 1;
declare let bar: 1;
foo = bar;

// Bad
declare let foo: number;
foo += 0;

// Bad
declare let foo: string;
foo += "";

// Bad
declare const foo: boolean;
const bar = foo || false;
const baz = foo && true;

// Bad
declare const foo: number;
const bar = foo || 0;

// Bad
declare const foo: string;
const bar = foo || "";

// Bad
declare const foo: string | null;
const bar = foo ?? null;

// Bad
declare const foo: string | undefined;
const bar = foo ?? undefined;
```

Note that while "<<" is technically a useless operator when combined with 0, this rule will not report on it so that bit flag enums will not cause false positives.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-unnecessary-assignment": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/no-unnecessary-assignment.ts)
- [Test source](../../tests/rules/no-unnecessary-assignment.test.ts)
