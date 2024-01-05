# `format-jsdoc-comments`

Disallows `/**` comments longer than N characters and multi-line comments that can be merged together.

Much like [Prettier](https://prettier.io/), this rule is designed to auto-format your comments so that you don't have to think about it. Try [configuring your IDE](../../README.md#automatic-fixing) to run `eslint --fix` on save.

Also see the [`format-line-comments`](format-line-comments.md) rule.

For more information on why you should use this rule, see the [comment formatting discussion](../comments.md).

## Rule Details

<!-- cspell:ignore amet consectetur adipiscing elit eiusmod tempor incididunt labore dolore aliqua -->

Lines that are too long will be split to the next line:

```ts
// Bad
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 */

// Good
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
 * labore et dolore magna aliqua.
 */
```

Similarly, lines that are too long in a single-line JSDoc will be converted to a multi-line JSDoc:

```ts
// Bad
/** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */

// Good
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
 * labore et dolore magna aliqua.
 */
```

Lines that are too short will be merged together. And, if possible, JSDoc will be converted to a single-line:

```ts
// Bad
/**
 * I love cookies.
 * But not cake.
 */

// Good
/** I love cookies. But not cake. */
```

The rule tries to be as smart as possible. For example, it won't complain about a bulleted list:

```ts
// Good
/**
 * These are my favorite things:
 * - cookies
 * - pie
 * - definitely not cake
 */
```

You can open a GitHub issue if you find a situation where this rule should be smarter.

Non JSDoc-style comments (i.e. lines that begin with `/*` followed by a space) are ignored, since they are commonly-used to comment-out large blocks of code.

For example:

```ts
/* This is a single-line comment. This is a single-line comment. This is a single-line comment. This is a single-line comment. */
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/format-jsdoc-comments": [
      "error",
      {
        "maxLength": 100
      }
    ]
  }
}
```

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/format-jsdoc-comments.ts)
- [Test source](../../tests/rules/format-jsdoc-comments.test.ts)
