import { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import type { SerializedBitSet128 } from "../functions/bitSet128";
import {
  copyBitSet128,
  deserializeBitSet128,
  isBitSet128,
  isSerializedBitSet128,
  serializeBitSet128,
} from "../functions/bitSet128";
import type { SerializedColor } from "../functions/color";
import {
  copyColor,
  deserializeColor,
  isColor,
  isSerializedColor,
  serializeColor,
} from "../functions/color";
import type { SerializedKColor } from "../functions/kColor";
import {
  copyKColor,
  deserializeKColor,
  isKColor,
  isSerializedKColor,
  serializeKColor,
} from "../functions/kColor";
import type { SerializedRNG } from "../functions/rng";
import {
  copyRNG,
  deserializeRNG,
  isRNG,
  isSerializedRNG,
  serializeRNG,
} from "../functions/rng";
import type { SerializedVector } from "../functions/vector";
import {
  copyVector,
  deserializeVector,
  isSerializedVector,
  isVector,
  serializeVector,
} from "../functions/vector";

/** A type representing an Isaac API class that can be safely copied or serialized. */
export type CopyableIsaacAPIClass = BitSet128 | Color | KColor | RNG | Vector;

/**
 * A type representing an Isaac API class like `Color` or `RNG` that has been written to the
 * "save#.dat" file. It is used by the save data manager when reading and writing to that file.
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export type SerializedIsaacAPIClass =
  | SerializedBitSet128
  | SerializedColor
  | SerializedKColor
  | SerializedRNG
  | SerializedVector;

export interface IsaacAPIClassTypeToType {
  [CopyableIsaacAPIClassType.BIT_SET_128]: BitSet128;
  [CopyableIsaacAPIClassType.COLOR]: Color;
  [CopyableIsaacAPIClassType.K_COLOR]: KColor;
  [CopyableIsaacAPIClassType.RNG]: RNG;
  [CopyableIsaacAPIClassType.VECTOR]: Vector;
}

export interface IsaacAPIClassTypeToSerializedType {
  [CopyableIsaacAPIClassType.BIT_SET_128]: SerializedBitSet128;
  [CopyableIsaacAPIClassType.COLOR]: SerializedColor;
  [CopyableIsaacAPIClassType.K_COLOR]: SerializedKColor;
  [CopyableIsaacAPIClassType.RNG]: SerializedRNG;
  [CopyableIsaacAPIClassType.VECTOR]: SerializedVector;
}

export interface IsaacAPIClassTypeFunctions<T, SerializedT> {
  is: (object: unknown) => object is T;
  isSerialized: (object: unknown) => object is SerializedT;
  copy: (object: T) => T;
  serialize: (object: T) => SerializedT;
  deserialize: (object: SerializedT) => T;
}

type IsaacAPIClassTypeToFunctions = {
  readonly [K in CopyableIsaacAPIClassType]: IsaacAPIClassTypeFunctions<
    IsaacAPIClassTypeToType[K],
    IsaacAPIClassTypeToSerializedType[K]
  >;
};

export const ISAAC_API_CLASS_TYPE_TO_FUNCTIONS = {
  [CopyableIsaacAPIClassType.BIT_SET_128]: {
    is: isBitSet128,
    isSerialized: isSerializedBitSet128,
    copy: copyBitSet128,
    serialize: serializeBitSet128,
    deserialize: deserializeBitSet128,
  },
  [CopyableIsaacAPIClassType.COLOR]: {
    is: isColor,
    isSerialized: isSerializedColor,
    copy: copyColor,
    serialize: serializeColor,
    deserialize: deserializeColor,
  },
  [CopyableIsaacAPIClassType.K_COLOR]: {
    is: isKColor,
    isSerialized: isSerializedKColor,
    copy: copyKColor,
    serialize: serializeKColor,
    deserialize: deserializeKColor,
  },
  [CopyableIsaacAPIClassType.RNG]: {
    is: isRNG,
    isSerialized: isSerializedRNG,
    copy: copyRNG,
    serialize: serializeRNG,
    deserialize: deserializeRNG,
  },
  [CopyableIsaacAPIClassType.VECTOR]: {
    is: isVector,
    isSerialized: isSerializedVector,
    copy: copyVector,
    serialize: serializeVector,
    deserialize: deserializeVector,
  },
} as const satisfies IsaacAPIClassTypeToFunctions;
