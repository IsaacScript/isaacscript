import { getEnumValues } from "../../functions/utils";

/**
 * During serialization, we write an arbitrary string key to the object with a value of an empty
 * string. This is used during deserialization to instantiate the correct type of object.
 *
 * Note that we do not bother branding TSTL classes because we have no way to invoke the proper
 * constructor during deserialization.
 */
export enum SerializationBrand {
  DEFAULT_MAP = "__TSTL_DEFAULT_MAP",

  /**
   * This is set to the value that represents the default value (instead of an empty string like the
   * other brands are).
   *
   * Default maps that use a factory function are unserializable, but do not throw runtime errors
   * because the merge function can derive the factory function from the already-instantiated
   * object.
   */
  DEFAULT_MAP_VALUE = "__TSTL_DEFAULT_MAP_VALUE",

  MAP = "__TSTL_MAP",
  SET = "__TSTL_SET",
  OBJECT_WITH_NUMBER_KEYS = "__TSTL_OBJECT_WITH_NUMBER_KEYS",
  COLOR = "__COLOR",
  KCOLOR = "__KCOLOR",
  RNG = "__RNG",
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
