# `no-mutable-return`

Disallows returning mutable arrays, maps, and sets from functions.

Arrays, maps, and sets are mutable by default in TypeScript, unlike safer languages like Rust. In general, code is [much easier to reason about when data structures are immutable](https://stackoverflow.com/questions/441309/why-are-mutable-structs-evil). Thus, this lint rule helps ensure a stricter boundary between functions to make data flows easier to understand.

The consequence of working with read-only data structures is that if a function callee needs to mutate the resulting data structure, they should make a copy of it (with e.g. the spread operator if it is an array). This makes it explicit that they are creating a new, non-vanilla thing. This pattern has the downside of a performance penalty, but in most real-world applications that are not using huge data structures, this is a micro-penalty and cannot be measured.

Of course, there are some cases where a function really does need to return a mutable data structure, like when an array is really big and the cost of copying it would be too great. In these cases, use the "eslint-ignore-next-line" directive.

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

// Bad
function getMap(): Map<string, string> {
  return new Map();
}

// Good
function getMap(): ReadonlyMap<string, string>[] {
  return new Map();
}

// Bad
function getSet(): Set<string> {
  return new Set();
}

// Good
function getSet(): ReadonlySet<string>[] {
  return new Set();
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-mutable-return": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-mutable-return.ts)
- [Test source](../../tests/rules/no-mutable-return.test.ts)
