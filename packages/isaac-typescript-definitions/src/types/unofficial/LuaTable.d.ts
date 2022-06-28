// We define a safer version of `LuaTable` that has a return type for the `get` method of `V |
// undefined` instead of `V`.

// Copied from "typescript-to-lua/language-extensions/index.d.ts".

declare interface LuaTable<
  TKey extends AnyNotNil = AnyNotNil,
  TValue = any, // eslint-disable-line @typescript-eslint/no-explicit-any
> {
  // @ts-expect-error Interface merging does not normally allow overriding methods in this way.
  get: LuaTableGetMethodSafe<TKey, TValue>;
}

declare type LuaTableGetMethodSafe<TKey extends AnyNotNil, TValue> = ((
  key: TKey,
) => TValue | undefined) &
  LuaExtension<"__luaTableGetMethodBrand">;
