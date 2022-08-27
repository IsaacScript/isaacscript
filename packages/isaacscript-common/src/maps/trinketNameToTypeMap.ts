import { TrinketType } from "isaac-typescript-definitions";
import { removeNonAlphanumericCharacters } from "../functions/string";
import { TRINKET_TYPE_TO_NAME_MAP } from "./trinketTypeToNameMap";

/**
 * Maps trinket names to the values of the `TrinketType` enum.
 *
 * For a mapping of `TrinketType` to name, see `TRINKET_TYPE_TO_NAME_MAP`.
 */
const trinketNameToTypeMap = new Map<string, TrinketType>();
for (const [trinketType, name] of TRINKET_TYPE_TO_NAME_MAP) {
  const simpleString = removeNonAlphanumericCharacters(name);
  trinketNameToTypeMap.set(simpleString, trinketType);
}

export const TRINKET_NAME_TO_TYPE_MAP: ReadonlyMap<string, TrinketType> =
  trinketNameToTypeMap;
