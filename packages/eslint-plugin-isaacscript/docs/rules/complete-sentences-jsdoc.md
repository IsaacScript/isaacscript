# `complete-sentences-jsdoc`

Requires complete sentences for JSDoc comments.

This rule is similar to the [`jsdoc/require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc#require-description-complete-sentence) rule, but it is smarter in that it will
generate less false positives. (See the cases outlined below.)

For more information on why you should use this rule, see the [comment formatting discussion](../comments.md).

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
 * https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript/
 */
```

````ts
// Good
/**
 * Putting code blocks inside a JSDoc comment is okay:
 *
 * ```ts
 * function foo() {}
 * ```
 */
````

```ts
// Good
/**
 * Asking questions is okay. What is the meaning of life?
 */
```

The rule tries to be as smart as possible. You can open a GitHub issue if you find a situation where this rule should be smarter.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/complete-sentences-jsdoc": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/complete-sentences-jsdoc.ts)
- [Test source](../../tests/rules/complete-sentences-jsdoc.test.ts)
