/**
 * This is a type representing the metatable of a user-created class from TypeScript code.
 * (TypeScriptToLua transpiles TypeScript classes to a Lua table with a specific kind of metatable.)
 */
export interface TSTLClassMetatable {
  readonly ____constructor: () => void;
  readonly __index: unknown;
  readonly constructor: {
    readonly name: string;
    readonly prototype: Readonly<LuaMetatable<LuaMap<AnyNotNil, unknown>>>;
    // Other static things on the class will be here, if any.
  };
}
