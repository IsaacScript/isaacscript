# `jsdoc-complete-sentences`

Enforces complete sentences for JSDoc comments.

This rule is similar to the [`jsdoc/require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#require-description-complete-sentence) rule, but it is smarter in that it will
generate less false positives. (See the cases outlined below.)

## Rule Details

```ts
// Bad
/** sometimes I forget to capitalize my sentences. */

// Good
/** Sometimes I forget to capitalize my sentences. */
```

```ts
// Bad
/** Sometimes I forget to put a period on my comments */

// Good
/** Sometimes I forget to put a period on my comments. */
```

```ts
// Good
/**
 * - This JSDoc comment has a bullet and that's fine as far as this lint rule is concerned.
 */
```

```ts
// Good
/**
 * Ending a sentence with a colon is okay:
 *
 * - Because there might be a list coming afterwards.
 */
```

```ts
// Good
/**
 * URLS are ignored.
 * https://github.com/IsaacScript/eslint-plugin-isaacscript/
 */
```

````ts
// Good
/**
 * Putting code blocks inside a JSDoc comment is also okay:
 *
 * ```ts
 * function foo() {}
 * ```
 */
````

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/jsdoc-complete-sentences": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/jsdoc-complete-sentences.ts)
- [Test source](../../tests/rules/jsdoc-complete-sentences.test.ts)
