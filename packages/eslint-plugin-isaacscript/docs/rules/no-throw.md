# `no-throw`

Disallows the usage of the "throw" keyword.

[TypeScriptToLua](https://typescripttolua.github.io/) transpiles `throw` to a Lua function that uses the `debug` library. If you don't have the `debug` library available in your Lua environment, then this will cause a run-time error. If your project uses TSTL in such an environment, then use this rule to disallow `throw` and auto-fix it to `error` instead (which is a Lua global function).

## Rule Details

```ts
// Bad
throw new Error("foo");

// Good
error("foo");
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/no-throw": "error"
  }
}
```

This rule is not configurable.

## Resources

- [Rule source](../../src/rules/no-throw.ts)
- [Test source](../../tests/rules/no-throw.test.ts)
