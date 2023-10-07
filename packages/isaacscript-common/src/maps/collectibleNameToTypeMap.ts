import type { CollectibleType } from "isaac-typescript-definitions";
import { removeNonAlphanumericCharacters } from "../functions/string";
import { COLLECTIBLE_NAMES } from "../objects/collectibleNames";
import type { ReadonlyMap } from "../types/ReadonlyMap";

/**
 * Maps collectible names to the values of the `CollectibleType` enum.
 *
 * For a mapping of `CollectibleType` to name, see the `COLLECTIBLE_NAMES` constant.
 */
export const COLLECTIBLE_NAME_TO_TYPE_MAP: ReadonlyMap<
  string,
  CollectibleType
> = (() => {
  const collectibleNameToTypeMap = new Map<string, CollectibleType>();

  for (const [collectibleTypeString, name] of Object.entries(
    COLLECTIBLE_NAMES,
  )) {
    const collectibleType = collectibleTypeString as unknown as CollectibleType;
    const simpleString = removeNonAlphanumericCharacters(name);
    collectibleNameToTypeMap.set(simpleString, collectibleType);
  }

  return collectibleNameToTypeMap;
})();
