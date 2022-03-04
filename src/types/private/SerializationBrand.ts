import { getEnumValues } from "../../functions/utils";

export enum SerializationBrand {
  DEFAULT_MAP = "__TSTL_DEFAULT_MAP",

  /**
   * This is set to the value that represents the default value (instead of an empty string like the
   * other brands are).
   */
  DEFAULT_MAP_VALUE = "__TSTL_DEFAULT_MAP_VALUE",

  MAP = "__TSTL_MAP",
  SET = "__TSTL_SET",
  CLASS = "__TSTL_CLASS",
  OBJECT_WITH_NUMBER_KEYS = "__TSTL_OBJECT_WITH_NUMBER_KEYS",
  VECTOR = "__VECTOR",
}

const SERIALIZATION_BRANDS = getEnumValues(SerializationBrand);
const SERIALIZATION_BRAND_SET: ReadonlySet<string> = new Set(
  SERIALIZATION_BRANDS,
);

export function isSerializationBrand(key: AnyNotNil): boolean {
  if (typeof key !== "string") {
    return false;
  }

  return SERIALIZATION_BRAND_SET.has(key);
}
