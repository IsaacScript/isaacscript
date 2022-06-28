import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { copyValuesToTable, getNumbersFromTable, tableHasKeys } from "./table";
import { isTable } from "./types";

type SerializedKColor = LuaTable<string, unknown> & {
  readonly __serializedKColorBrand: unique symbol;
};

interface CopyKColorReturn {
  [SerializationType.NONE]: KColor;
  [SerializationType.SERIALIZE]: SerializedKColor;
  [SerializationType.DESERIALIZE]: KColor;
}

const KEYS = ["Red", "Green", "Blue", "Alpha"];
const OBJECT_NAME = "KColor";

/**
 * Helper function to copy a `KColor` object.
 *
 * @param kColor The KColor object to copy. In the case of deserialization, this will actually be a
 *               Lua table instead of an instantiated KColor class.
 * @param serializationType Default is `SerializationType.NONE`.
 */
export function copyKColor<
  K extends KColor | SerializedKColor,
  S extends SerializationType,
>(kColor: K, serializationType: S): CopyKColorReturn[S];
export function copyKColor<K extends KColor | SerializedKColor>(
  kColor: K,
): CopyKColorReturn[SerializationType.NONE];
export function copyKColor(
  kColor: KColor | SerializedKColor,
  serializationType = SerializationType.NONE,
): CopyKColorReturn[keyof CopyKColorReturn] {
  switch (serializationType) {
    case SerializationType.NONE: {
      if (!isKColor(kColor)) {
        error(
          `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      return KColor(kColor.Red, kColor.Green, kColor.Blue, kColor.Alpha);
    }

    case SerializationType.SERIALIZE: {
      if (!isKColor(kColor)) {
        error(
          `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      const kColorTable = new LuaTable<string, unknown>();
      copyValuesToTable(kColor, KEYS, kColorTable);
      kColorTable.set(SerializationBrand.K_COLOR, "");
      return kColorTable as SerializedKColor;
    }

    case SerializationType.DESERIALIZE: {
      if (!isTable(kColor)) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
        );
      }

      const [r, g, b, a] = getNumbersFromTable(
        kColor as LuaTable<string, unknown>,
        OBJECT_NAME,
        ...KEYS,
      );

      if (r === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: r`,
        );
      }
      if (g === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: g`,
        );
      }
      if (b === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: b`,
        );
      }
      if (a === undefined) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: a`,
        );
      }

      return KColor(r, g, b, a);
    }
  }
}

/** Returns `KColor(1, 1, 1, 1)`. */
export function getDefaultKColor(): KColor {
  return KColor(1, 1, 1, 1);
}

/** Helper function to check if something is an instantiated KColor object. */
export function isKColor(object: unknown): object is KColor {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `KColor` object created by the save data
 * manager and/or the `deepCopy` function.
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
