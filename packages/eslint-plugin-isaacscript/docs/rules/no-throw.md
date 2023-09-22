# `no-throw`

Disallows the usage of the "throw" keyword.

This rule is only intended for projects that use [TypeScriptToLua](https://typescripttolua.github.io/). Since it is pointless in general TypeScript projects, it is not included in the recommended config.

TypeScriptToLua transpiles `throw` to a Lua function that uses the `debug` library. If you don't have the `debug` library available in your Lua environment, then this will cause a run-time error. If your project uses TSTL in such an environment (like in [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/), then use this rule to disallow `throw` and auto-fix it to `error` instead (which is a Lua global function).

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
