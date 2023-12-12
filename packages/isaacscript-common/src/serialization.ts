import { SERIALIZATION_BRAND_VALUES } from "./cachedEnumValues";
import { isString } from "./functions/types";
import { ReadonlySet } from "./types/ReadonlySet";

const SERIALIZATION_BRAND_SET = new ReadonlySet<string>(
  SERIALIZATION_BRAND_VALUES,
);

/**
 * Helper function to check if a key of a table in the "save#.dat" file is a serialization brand
 * inserted by the save data manager (i.e. the `deepCopy` function).
 *
 * This is separated from the other serialization functions because end-users would not normally be
 * iterating through a serialized object directly.
 */
export function isSerializationBrand(key: unknown): boolean {
  if (!isString(key)) {
    return false;
  }

  return SERIALIZATION_BRAND_SET.has(key);
}
