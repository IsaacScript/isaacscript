export interface TSTLClassMetatable {
  ____constructor: () => void;
  __index: unknown;
  constructor: {
    name: string;
    prototype: LuaMetatable<LuaMap<AnyNotNil, unknown>>;
    // Other static things on the class will be here, if any.
  };
}
