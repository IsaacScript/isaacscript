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

// eslint-disable-next-line complete/type-declaration-immutability
export interface IsaacAPIClassTypeToType {
  readonly [CopyableIsaacAPIClassType.BIT_SET_128]: Readonly<BitSet128>;
  readonly [CopyableIsaacAPIClassType.COLOR]: Readonly<Color>;
  readonly [CopyableIsaacAPIClassType.K_COLOR]: Readonly<KColor>;
  readonly [CopyableIsaacAPIClassType.RNG]: Readonly<RNG>;
  readonly [CopyableIsaacAPIClassType.VECTOR]: Readonly<Vector>;
}

// eslint-disable-next-line complete/type-declaration-immutability
export interface IsaacAPIClassTypeToSerializedType {
  readonly [CopyableIsaacAPIClassType.BIT_SET_128]: Readonly<SerializedBitSet128>;
  readonly [CopyableIsaacAPIClassType.COLOR]: Readonly<SerializedColor>;
  readonly [CopyableIsaacAPIClassType.K_COLOR]: Readonly<SerializedKColor>;
  readonly [CopyableIsaacAPIClassType.RNG]: Readonly<SerializedRNG>;
  readonly [CopyableIsaacAPIClassType.VECTOR]: Readonly<SerializedVector>;
}

export interface IsaacAPIClassTypeFunctions<T, SerializedT> {
  readonly is: (object: unknown) => object is T;
  readonly isSerialized: (object: unknown) => object is SerializedT;
  readonly copy: (object: T) => T;
  readonly serialize: (object: T) => SerializedT;
  readonly deserialize: (object: SerializedT) => T;
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
