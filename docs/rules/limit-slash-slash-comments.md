# `limit-slash-slash-comments`

Disallows `//` comments longer than N characters.

This rule will automatically fix the problem by shifting the offending words down to the next line. Additionally, for multi-line comments, if it is possible for a two lines to be merged together in a single line without going past N characters, it will automatically do so.

## Rule Details

<!-- cspell:ignore amet consectetur adipiscing elit eiusmod tempor incididunt labore dolore aliqua -->

```ts
// Bad
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

// Good
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
// labore et dolore magna aliqua.
```

```ts
// Bad
// I love cookies.
// But not cake.

// Good
// I love cookies. But not cake.
```

## Options

```json
{
  "rules": {
    "isaacscript/limit-slash-slash-comments": [
      "error",
      {
        "maxLength": 100,
        "ignoreUrls": true
      }
    ]
  }
}
```
