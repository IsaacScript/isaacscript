import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { copyValuesToTable, getNumbersFromTable, tableHasKeys } from "./table";
import { ensureAllCases } from "./utils";

type SerializedKColor = LuaTable<string, unknown> & {
  __serializedKColorBrand: unknown;
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
 * Lua table instead of an instantiated KColor class.
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
      kColorTable.set(SerializationBrand.KCOLOR, "");
      return kColorTable as SerializedKColor;
    }

    case SerializationType.DESERIALIZE: {
      const kColorType = type(kColor);
      if (isKColor(kColor) || kColorType !== "table") {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
        );
      }

      const [r, g, b, a] = getNumbersFromTable(kColor, OBJECT_NAME, ...KEYS);

      return KColor(r, g, b, a);
    }

    default: {
      return ensureAllCases(serializationType);
    }
  }
}

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
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const table = object as LuaTable;
  return tableHasKeys(table, ...KEYS) && table.has(SerializationBrand.KCOLOR);
}

export function kColorEquals(kColor1: KColor, kColor2: KColor): boolean {
  return isaacAPIClassEquals(kColor1, kColor2, KEYS);
}
