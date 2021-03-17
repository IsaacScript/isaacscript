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

If you are converting Lua code, make sure to account for order of operations:

```lua
-- Lua code
local vector = Vector(1, 1) + Vector(3, 3) * 6 -- Multiplication happens before addition
```

```typescript
// TypeScript code
// Do one thing at a time so that the code is clear to read
let vector = Vector(3, 3);
vector = vector.__mul(6);
vector = vector.__add(Vector(1, 1));
```

<br />

### No Blank Mod Classes

You cannot instantiate a blank mod object/class:

```typescript
const Revelations = RegisterMod("Revelations", 1) // "Revelations" has the type "Mod"

class Foo {
  // We might not want to define a type of "Mod | null", so what if we use a blank class?
  modObject = Mod();
}
const foo = new Foo();

// Later on in the code, we can overwrite it
foo.modObject = Revelations;
```

Doing this will result in an error in the following TypeScriptToLua boilerplate code:

```lua
function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype) -- Error on this line
```

Instead, do something like the following:

```typescript
const Revelations = RegisterMod("Revelations", 1) // "Revelations" has the type "Mod"

class Foo {
  modObject: Mod | null = null;
}
const foo = new Foo();

// Later on in the code, we can overwrite it
foo.modObject = Revelations;
```
