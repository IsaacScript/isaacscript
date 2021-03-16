---
title: Gotchas
---

This page lists several "gotchas" - i.e. things that might be weird about IsaacScript.

<br />

### No Operator Overloading / Vector Addition

Due to [limitations in TypeScriptToLua](https://typescripttolua.github.io/docs/advanced/writing-declarations/#operator-overloads), operator overloads will not work directly. The workaround for this is to call the methods directly.

```lua
-- Lua code
local vector = Vector(1, 1) * 5 + 2
```

```typescript
// TypeScript code
const vector = Vector(1, 1).__mul(5).__add(2)
```

<br />

### No Blank Mod Classes

You cannot instantiate a blank mod object/class:

```typescript
class Foo {
  modObject = Mod();
}
```

Doing this will result in an error in the following TypeScriptToLua boilerplate code:

```lua
function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype) -- Error on this line
```
