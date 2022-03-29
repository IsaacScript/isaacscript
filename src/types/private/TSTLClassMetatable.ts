export interface TSTLClassMetatable {
  ____constructor: () => void;
  __index: unknown;
  constructor: {
    prototype: LuaMetatable<LuaTable<AnyNotNil, unknown>>;
    name: string;
  };
}
