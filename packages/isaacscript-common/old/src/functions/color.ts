import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { copyValuesToTable, getNumbersFromTable, tableHasKeys } from "./table";
import { ensureAllCases } from "./utils";

type SerializedColor = LuaTable<string, unknown> & {
  __serializedColorBrand: unknown;
};

interface CopyColorReturn {
  [SerializationType.NONE]: Color;
  [SerializationType.SERIALIZE]: SerializedColor;
  [SerializationType.DESERIALIZE]: Color;
}

const KEYS = ["R", "G", "B", "A", "RO", "GO", "BO"];
const OBJECT_NAME = "Color";

export function colorEquals(color1: Color, color2: Color): boolean {
  return isaacAPIClassEquals(color1, color2, KEYS);
}

/**
 * Helper function to copy a `Color` object.
 *
 * @param color The Color object to copy. In the case of deserialization, this will actually be a
 *              Lua table instead of an instantiated Color class.
 * @param serializationType Default is `SerializationType.NONE`.
 */
export function copyColor<
  C extends Color | SerializedColor,
  S extends SerializationType,
>(color: C, serializationType: S): CopyColorReturn[S];
export function copyColor<C extends Color | SerializedColor>(
  color: C,
): CopyColorReturn[SerializationType.NONE];
export function copyColor(
  color: Color | SerializedColor,
  serializationType = SerializationType.NONE,
): CopyColorReturn[keyof CopyColorReturn] {
  switch (serializationType) {
    case SerializationType.NONE: {
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

    case SerializationType.SERIALIZE: {
      if (!isColor(color)) {
        error(
          `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      const colorTable = new LuaTable<string, unknown>();
      copyValuesToTable(color, KEYS, colorTable);
      colorTable.set(SerializationBrand.COLOR, "");
      return colorTable as SerializedColor;
    }

    case SerializationType.DESERIALIZE: {
      const colorType = type(color);
      if (isColor(color) || colorType !== "table") {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
        );
      }

      const [r, g, b, a, ro, go, bo] = getNumbersFromTable(
        color,
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

      return Color(r, g, b, a, ro, go, bo);
    }

    default: {
      return ensureAllCases(serializationType);
    }
  }
}

/** Returns `Color(1, 1, 1)`. */
export function getDefaultColor(): Color {
  return Color(1, 1, 1);
}

/** Helper function to check if something is an instantiated Color object. */
export function isColor(object: unknown): object is Color {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `Color` object created by the save data
 * manager and/or the `deepCopy` function.
 */
export function isSerializedColor(object: unknown): object is SerializedColor {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const table = object as LuaTable<AnyNotNil, unknown>;
  return tableHasKeys(table, ...KEYS) && table.has(SerializationBrand.COLOR);
}
