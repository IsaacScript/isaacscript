export interface TSTLClassMetatable {
  ____constructor: () => void;
  __index: unknown;
  constructor: {
    name: string;
    prototype: LuaMetatable<LuaMap<AnyNotNil, unknown>>;
  };
}
