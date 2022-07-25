import { CollectibleType, ItemPoolType } from "isaac-typescript-definitions";
import { anyPlayerHasCollectible } from "./players";

/**
 * Helper function to see if the given collectible is unlocked on the current save file. This
 * requires providing the corresponding item pool that the collectible is located in.
 *
 * - If any player currently has the collectible, then it is assumed to be unlocked. (This is
 *   because in almost all cases, when a collectible is added to a player's inventory, it is
 *   subsequently removed from all pools.)
 * - If the collectible is located in more than one item pool, then any item pool can be provided.
 * - If the collectible is not located in any item pools, then this function will always return
 *   false.
 * - If the collectible is non-offensive, any Tainted Losts will be temporarily changed to Isaac and
 *   then changed back. (This is because Tainted Lost is not able to retrieve non-offensive
 *   collectibles from item pools).
 */
export function isCollectibleUnlocked(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
): boolean {
  if (anyPlayerHasCollectible(collectibleType)) {
    return true;
  }

  return isCollectibleUnlocked(collectibleType, itemPoolType);
}
