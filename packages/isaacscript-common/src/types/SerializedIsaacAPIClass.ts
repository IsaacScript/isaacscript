/**
 * This is a type representing an Isaac API class like `Color` or `RNG` that has been written to the
 * "save#.dat" file. It is used by the save data manager when reading and writing to that file.
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export type SerializedIsaacAPIClass = LuaMap<string, unknown> & {
  readonly __serializedIsaacAPIClassBrand: symbol;
};
