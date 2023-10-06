import type { TrinketType } from "isaac-typescript-definitions";
import { removeNonAlphanumericCharacters } from "../functions/string";
import { TRINKET_NAMES } from "../objects/trinketNames";

/**
 * Maps trinket names to the values of the `TrinketType` enum.
 *
 * For a mapping of `TrinketType` to name, see `TRINKET_TYPE_TO_NAME_MAP`.
 */
export const TRINKET_NAME_TO_TYPE_MAP: ReadonlyMap<string, TrinketType> =
  (() => {
    const trinketNameToTypeMap = new Map<string, TrinketType>();

    for (const [trinketTypeString, name] of Object.entries(TRINKET_NAMES)) {
      const trinketType = trinketTypeString as unknown as TrinketType;
      const simpleString = removeNonAlphanumericCharacters(name);
      trinketNameToTypeMap.set(simpleString, trinketType);
    }

    return trinketNameToTypeMap;
  })();
