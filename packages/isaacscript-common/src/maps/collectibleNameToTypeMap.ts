import { CollectibleType } from "isaac-typescript-definitions";
import { removeNonAlphanumericCharacters } from "../functions/string";
import { COLLECTIBLE_TYPE_TO_NAME_MAP } from "./collectibleTypeToNameMap";

/**
 * Maps collectible names to the values of the `CollectibleType` enum.
 *
 * For a mapping of `CollectibleType` to name, see `COLLECTIBLE_TYPE_TO_NAME_MAP`.
 */
export const COLLECTIBLE_NAME_TO_TYPE_MAP: ReadonlyMap<
  string,
  CollectibleType
> = (() => {
  const collectibleNameToTypeMap = new Map<string, CollectibleType>();

  for (const [collectibleType, name] of COLLECTIBLE_TYPE_TO_NAME_MAP) {
    const simpleString = removeNonAlphanumericCharacters(name);
    collectibleNameToTypeMap.set(simpleString, collectibleType);
  }

  return collectibleNameToTypeMap;
})();
