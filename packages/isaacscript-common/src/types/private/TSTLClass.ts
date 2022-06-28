export type TSTLClass = LuaTable<AnyNotNil, unknown> & {
  readonly __tstlClassBrand: unique symbol;
};
