# `jsdoc-code-block-language`

Requires a language specification for every JSDoc code block.

## Rule Details

This rule is the same thing as the [`markdownlint`](https://github.com/DavidAnson/markdownlint) rule [MD040](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md040): fenced code blocks should have a language specified. The only difference is that this is for JSDoc comments instead of Markdown.

The purpose of this rule is to always ensure that your code blocks will have proper syntax highlighting. For example, it is common to write code examples in the JSDoc comment for functions, and then have a tool like [TypeDoc](https://typedoc.org/) automatically generate documentation from the JSDoc comments. However, if there isn't a language specified for the code block, the resulting webpage may not be able to properly syntax-highlight the code.

````ts
// Bad
/**
 * Use `foo` like this:
 *
 * ```
 * foo();
 * ```
 */
function foo() {}

// Good
/**
 * Use `foo` like this:
 *
 * ```ts
 * foo();
 * ```
 */
function foo() {}
````

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/jsdoc-code-block-language": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/jsdoc-code-block-language.ts)
- [Test source](../../tests/rules/jsdoc-code-block-language.test.ts)
