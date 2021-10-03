import { COLLECTIBLE_SET } from "../collectibleSet";

/** Returns a set containing every valid collectible type in the game, including modded items. */
export function getCollectibleSet(): Set<CollectibleType | int> {
  return new Set(COLLECTIBLE_SET);
}
