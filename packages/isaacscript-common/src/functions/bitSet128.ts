import type { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { isIsaacAPIClassOfType } from "./isaacAPIClass";
import {
  copyUserdataValuesToTable,
  getNumbersFromTable,
  tableHasKeys,
} from "./table";
import { isTable } from "./types";
import { assertDefined } from "./utils";

export type SerializedBitSet128 = LuaMap<string, unknown> & {
  readonly __serializedBitSet128Brand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.BIT_SET_128;
};

const OBJECT_NAME = "BitSet128";
const KEYS = ["l", "h"] as const;

/** Helper function to copy a `BitSet128` Isaac API class. */
export function copyBitSet128(bitSet128: BitSet128): BitSet128 {
  if (!isBitSet128(bitSet128)) {
    error(
      `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const lowBits = bitSet128.l;
  const highBits = bitSet128.h;

  return BitSet128(lowBits, highBits);
}

/**
 * Helper function to convert a `SerializedBitSet128` object to a normal `BitSet128` object. (This
 * is used by the save data manager when reading data from the "save#.dat" file.)
 */
export function deserializeBitSet128(
  bitSet128: SerializedBitSet128,
): BitSet128 {
  if (!isTable(bitSet128)) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
    );
  }

  const [l, h] = getNumbersFromTable(bitSet128, OBJECT_NAME, ...KEYS);

  assertDefined(
    l,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: l`,
  );
  assertDefined(
    h,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: h`,
  );

  return BitSet128(l, h);
}

/** Helper function to check if something is an instantiated `BitSet128` object. */
export function isBitSet128(object: unknown): object is BitSet128 {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `BitSet128` object created by the `deepCopy`
 * function.
 */
export function isSerializedBitSet128(
  object: unknown,
): object is SerializedBitSet128 {
  if (!isTable(object)) {
    return false;
  }

  return (
    tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.BIT_SET_128)
  );
}

/**
 * Helper function to convert a `BitSet128` object to a `SerializedBitSet128` object. (This is used
 * by the save data manager when writing data from the "save#.dat" file.)
 */
export function serializeBitSet128(bitSet128: BitSet128): SerializedBitSet128 {
  if (!isBitSet128(bitSet128)) {
    error(
      `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const bitSet128Table = new LuaMap<string, unknown>();
  copyUserdataValuesToTable(bitSet128, KEYS, bitSet128Table);
  bitSet128Table.set(SerializationBrand.BIT_SET_128, "");
  return bitSet128Table as SerializedBitSet128;
}
