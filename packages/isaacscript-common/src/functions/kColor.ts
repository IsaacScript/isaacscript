import type { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { getRandom } from "./random";
import { isRNG, newRNG } from "./rng";
import {
  copyUserdataValuesToTable,
  getNumbersFromTable,
  tableHasKeys,
} from "./table";
import { isTable } from "./types";
import { assertDefined } from "./utils";

export type SerializedKColor = LuaMap<string, unknown> & {
  readonly __serializedKColorBrand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.K_COLOR;
};

const OBJECT_NAME = "KColor";
const KEYS = ["Red", "Green", "Blue", "Alpha"] as const;

/** Helper function to copy a `KColor` Isaac API class. */
export function copyKColor(kColor: KColor): KColor {
  if (!isKColor(kColor)) {
    error(
      `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  return KColor(kColor.Red, kColor.Green, kColor.Blue, kColor.Alpha);
}

/**
 * Helper function to convert a `SerializedKColor` object to a normal `KColor` object. (This is used
 * by the save data manager when reading data from the "save#.dat" file.)
 */
export function deserializeKColor(kColor: SerializedKColor): KColor {
  if (!isTable(kColor)) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
    );
  }

  const [r, g, b, a] = getNumbersFromTable(kColor, OBJECT_NAME, ...KEYS);

  assertDefined(
    r,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Red`,
  );
  assertDefined(
    g,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Green`,
  );
  assertDefined(
    b,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Blue`,
  );
  assertDefined(
    a,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Alpha`,
  );

  return KColor(r, g, b, a);
}

/**
 * Helper function to get a random `KColor` object (for use in fonts).
 *
 * If you want to generate an unseeded object, you must explicitly pass `undefined` to the
 * `seedOrRNG` parameter.
 *
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param alpha Optional. The alpha value to use. Default is 1.
 */
export function getRandomKColor(
  seedOrRNG: Seed | RNG | undefined,
  alpha = 1,
): Readonly<KColor> {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  const r = getRandom(rng);
  const g = getRandom(rng);
  const b = getRandom(rng);

  return KColor(r, g, b, alpha);
}

/** Helper function to check if something is an instantiated `KColor` object. */
export function isKColor(object: unknown): object is KColor {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `KColor` object created by the `deepCopy`
 * function.
 */
export function isSerializedKColor(
  object: unknown,
): object is SerializedKColor {
  if (!isTable(object)) {
    return false;
  }

  return (
    tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.K_COLOR)
  );
}

export function kColorEquals(kColor1: KColor, kColor2: KColor): boolean {
  return isaacAPIClassEquals(kColor1, kColor2, KEYS);
}

/**
 * Helper function to convert a `KColor` object to a `SerializedKColor` object. (This is used by the
 * save data manager when writing data from the "save#.dat" file.)
 */
export function serializeKColor(kColor: KColor): SerializedKColor {
  if (!isKColor(kColor)) {
    error(
      `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const kColorTable = new LuaMap<string, unknown>();
  copyUserdataValuesToTable(kColor, KEYS, kColorTable);
  kColorTable.set(SerializationBrand.K_COLOR, "");
  return kColorTable as SerializedKColor;
}
