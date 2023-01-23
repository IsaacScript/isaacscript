# `no-object-methods-with-map-set`

Disallows using the `Object.entries`, `Object.keys`, and `Object.values` methods with maps and sets, since doing this is virtually always a bug.

## Rule Details

In order to iterate over a JavaScript object, you might have some code like this:

```ts
for (const [key, value] of Object.entries(foo)) {
  // Do something.
}
```

However, it is common to refactor objects to [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), since they are [more performant and provide a nicer API](https://claritydev.net/blog/simplifying-code-with-maps-in-javascript/). After such a refactor, the above code block would still pass the TypeScript compiler, but would not work at all.

This rule prevents the use of specific `Object` methods with maps and sets.

```ts
declare const myMap: Map<string, string>;

// Bad
for (const [key, value] of Object.entries(myMap)) {
}
for (const key of Object.keys(myMap)) {
}
for (const value of Object.values(myMap)) {
}

// Good
for (const [key, value] of myMap.entries()) {
}
for (const key of myMap.keys()) {
}
for (const value of myMap.values()) {
}

declare const mySet: Set<string>;

// Bad
for (const entry of Object.entries(mySet)) {
}
for (const key of Object.keys(mySet)) {
}
for (const value of Object.values(mySet)) {
}

// Good
for (const entry of mySet.entries()) {
}
for (const key of mySet.keys()) {
}
for (const value of mySet.values()) {
}
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-object-methods-with-map-set": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-object-methods-with-map-set.ts)
- [Test source](../../tests/rules/no-object-methods-with-map-set.test.ts)
