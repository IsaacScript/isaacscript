import { removeNonAlphanumericCharacters } from "../functions/string";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { COLLECTIBLE_TYPE_TO_NAME_MAP } from "./collectibleTypeToNameMap";

/**
 * Maps collectible names to the values of the `CollectibleType` enum.
 *
 * For a mapping of `CollectibleType` to name, see `COLLECTIBLE_TYPE_TO_NAME_MAP`.
 */
export const COLLECTIBLE_NAME_TO_TYPE_MAP = new ReadonlyMap(
  [...COLLECTIBLE_TYPE_TO_NAME_MAP.entries()].map(
    ([collectibleType, collectibleName]) => [
      removeNonAlphanumericCharacters(collectibleName),
      collectibleType,
    ],
  ),
);
