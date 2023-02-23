# `require-v-registration`

Require variables named "v" to be registered with the save data manager from the "isaacscript-common" library.

This rule is only intended for IsaacScript mods written with TypeScript.

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

- [Rule source](../../src/rules/require-v-registration.ts)
- [Test source](../../tests/rules/require-v-registration.test.ts)
