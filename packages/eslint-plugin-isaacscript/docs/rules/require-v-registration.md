# `require-v-registration`

Require variables named "v" to be registered with the save data manager from the "isaacscript-common" library.

This rule is only intended for [_Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/) mods written with TypeScript. Since it is pointless in general TypeScript projects, it is not included in the `recommended` config.

## Rule Details

This rule looks for a "const v = " line and a matching "v = v" line.

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/require-v-registration": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/require-v-registration.ts)
- [Test source](../../tests/rules/require-v-registration.test.ts)
