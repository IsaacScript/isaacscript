// This enum must match:
// - The JSDoc comments for `deepCopy` and `merge`.
// - The `SerializableIsaacAPIClass` type union.
// - The `__kind` fields for the various classes in `isaac-typescript-definitions`.

/** An enum containing the Isaac API classes that can be safely copied / serialized. */
export enum CopyableIsaacAPIClassType {
  BIT_SET_128 = "BitSet128",
  COLOR = "Color",
  K_COLOR = "KColor",
  RNG = "RNG",
  VECTOR = "Vector",
}
