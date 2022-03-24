import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { copyValuesToTable, getNumbersFromTable } from "./table";
import { ensureAllCases, isUserdataObject } from "./utils";

type SerializedColor = LuaTable<string, string | number>;

interface CopyColorReturn {
  [SerializationType.NONE]: Color;
  [SerializationType.SERIALIZE]: SerializedColor;
  [SerializationType.DESERIALIZE]: Color;
}

const KEYS = ["R", "G", "B", "A", "RO", "GO", "BO"];
const OBJECT_NAME = "Color";

/**
 * Helper function to copy a `Color` object.
 *
 * @param color The Color object to copy. In the case of deserialization, this will actually be a
 * Lua table instead of an instantiated Color class.
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

      const colorTable = new LuaTable<string, string | number>();
      copyValuesToTable(color, KEYS, colorTable);
      colorTable.set(SerializationBrand.COLOR, "");
      return colorTable;
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

      return Color(r, g, b, a, ro, go, bo);
    }

    default: {
      return ensureAllCases(serializationType);
    }
  }
}

export function copyKColor(kColor: KColor): KColor {
  return KColor(kColor.Red, kColor.Green, kColor.Blue, kColor.Alpha);
}

export function getDefaultColor(): Color {
  return Color(1, 1, 1);
}

export function getDefaultKColor(): KColor {
  return KColor(1, 1, 1, 1);
}

/** Helper function to check if something is an instantiated Color object. */
export function isColor(object: unknown): object is Color {
  return isUserdataObject(object, OBJECT_NAME);
}
