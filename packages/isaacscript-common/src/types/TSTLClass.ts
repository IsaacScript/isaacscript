/**
 * This is a type representing a user-created class from TypeScript code. (TypeScriptToLua
 * transpiles TypeScript classes to a Lua table with a specific kind of metatable.)
 *
 * This type is used by the save data manager to when copying, serializing, and deserializing.
 */
export type TSTLClass = LuaMap<AnyNotNil, unknown> & {
  readonly __tstlClassBrand: symbol;
};
