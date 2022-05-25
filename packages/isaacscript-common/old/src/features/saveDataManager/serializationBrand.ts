import { SerializationBrand } from "../../enums/private/SerializationBrand";
import { getEnumValues } from "../../functions/enums";

const SERIALIZATION_BRANDS = getEnumValues(SerializationBrand);
const SERIALIZATION_BRAND_SET: ReadonlySet<string> = new Set(
  SERIALIZATION_BRANDS,
);

export function isSerializationBrand(key: unknown): boolean {
  if (typeof key !== "string") {
    return false;
  }

  return SERIALIZATION_BRAND_SET.has(key);
}
