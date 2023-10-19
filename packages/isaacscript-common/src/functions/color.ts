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

export type SerializedColor = LuaMap<string, unknown> & {
  readonly __serializedColorBrand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.COLOR;
};

const OBJECT_NAME = "Color";
const KEYS = ["R", "G", "B", "A", "RO", "GO", "BO"] as const;

export function colorEquals(color1: Color, color2: Color): boolean {
  return isaacAPIClassEquals(color1, color2, KEYS);
}

/** Helper function to copy a `Color` Isaac API class. */
export function copyColor(color: Color): Color {
  if (!isColor(color)) {
    error(
      `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  return Color(
    color.R,
    color.G,
    color.B,
    color.A,
    color.RO,
    color.GO,
    color.BO,
  );
}

/**
 * Helper function to convert a `SerializedColor` object to a normal `Color` object. (This is used
 * by the save data manager when reading data from the "save#.dat" file.)
 */
export function deserializeColor(color: SerializedColor): Color {
  if (!isTable(color)) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
    );
  }

  const [r, g, b, a, ro, go, bo] = getNumbersFromTable(
    color,
    OBJECT_NAME,
    ...KEYS,
  );

  assertDefined(
    r,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: R`,
  );
  assertDefined(
    g,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: G`,
  );
  assertDefined(
    b,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: B`,
  );

  return Color(r, g, b, a, ro, go, bo);
}

/**
 * Helper function to get a random `Color` object.
 *
 * If you want to generate an unseeded object, you must explicitly pass `undefined` to the
 * `seedOrRNG` parameter.
 *
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param alpha Optional. The alpha value to use. Default is 1.
 */
export function getRandomColor(
  seedOrRNG: Seed | RNG | undefined,
  alpha = 1,
): Readonly<Color> {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  const r = getRandom(rng);
  const g = getRandom(rng);
  const b = getRandom(rng);

  return Color(r, g, b, alpha);
}

/** Helper function to check if something is an instantiated `Color` object. */
export function isColor(object: unknown): object is Color {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `Color` object created by the `deepCopy`
 * function.
 */
export function isSerializedColor(object: unknown): object is SerializedColor {
  if (!isTable(object)) {
    return false;
  }

  return tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.COLOR);
}

/**
 * Helper function to convert a `Color` object to a `SerializedColor` object. (This is used by the
 * save data manager when writing data from the "save#.dat" file.)
 */
export function serializeColor(color: Color): SerializedColor {
  if (!isColor(color)) {
    error(
      `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const colorTable = new LuaMap<string, unknown>();
  copyUserdataValuesToTable(color, KEYS, colorTable);
  colorTable.set(SerializationBrand.COLOR, "");
  return colorTable as SerializedColor;
}
