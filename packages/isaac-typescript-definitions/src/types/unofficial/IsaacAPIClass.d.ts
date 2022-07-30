/**
 * This represents an object of type `userdata`. All Isaac API classes are typed to extend from this
 * type so that we can distinguish them from normal Lua tables.
 */
declare type IsaacAPIClass = LuaMap<string, unknown> & {
  readonly __isaacAPIClassBrand: symbol;
};
