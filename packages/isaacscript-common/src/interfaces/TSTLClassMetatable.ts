/**
 * This is a type representing the metatable of a user-created class from TypeScript code.
 * (TypeScriptToLua transpiles TypeScript classes to a Lua table with a specific kind of metatable.)
 */
export interface TSTLClassMetatable {
  ____constructor: () => void;
  __index: unknown;
  constructor: {
    name: string;
    prototype: LuaMetatable<LuaMap<AnyNotNil, unknown>>;
    // Other static things on the class will be here, if any.
  };
}
