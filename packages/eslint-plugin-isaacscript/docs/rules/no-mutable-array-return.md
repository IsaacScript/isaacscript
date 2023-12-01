# `no-mutable-array-return`

Disallows returning mutable arrays from functions.

Arrays are mutable by default in TypeScript, unlike safer languages like Rust. In general, code is [much easier to reason about when data structures are immutable](https://stackoverflow.com/questions/441309/why-are-mutable-structs-evil). Thus, this lint rule helps ensure a stricter boundary between functions to make data flows easier to understand.

The consequence of working with read-only arrays is that if a function callee needs to mutate the resulting array, they should make a copy of it with the spread operator. This makes it explicit that they are creating a new, non-vanilla thing. This pattern has the downside of a performance penalty, but in most real-world applications that are not using huge arrays, this is a micro-penalty and cannot be measured.

Of course, there are some cases where a function really does need to return a mutable array, like when the array is really big and the cost of copying it would be too great. In these cases, use the "eslint-ignore-next-line" directive.

## Rule Details

```ts
// Bad
function getArray(): number[] {
  return [];
}

// Good
function getArray(): readonly number[] {
  return [];
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-mutable-array-return": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-mutable-array-return.ts)
- [Test source](../../tests/rules/no-mutable-array-return.test.ts)
