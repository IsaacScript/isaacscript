import {
  CollectibleType,
  ItemPoolType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { PlayerIndex } from "../types/PlayerIndex";
import { getCollectibleSet } from "./collectibleSet";
import { anyPlayerHasCollectible, getPlayersOfType } from "./player";
import { mapGetPlayer, mapSetPlayer } from "./playerDataStructures";
import { getPlayers } from "./playerIndex";
import { repeat } from "./utils";

const COLLECTIBLES_THAT_AFFECT_ITEM_POOLS: readonly CollectibleType[] = [
  CollectibleType.CHAOS, // 402
  CollectibleType.SACRED_ORB, // 691
  CollectibleType.TMTRAINER, // 721
];

const TRINKETS_THAT_AFFECT_ITEM_POOLS: readonly TrinketType[] = [
  TrinketType.NO,
];

/**
 * Helper function to see if the given collectible is unlocked on the player's save file. This
 * requires providing the corresponding item pool that the collectible is located in.
 *
 * - If any player currently has the item, then it is assumed to be unlocked. (This is because Eden
 *   may have randomly started with the provided collectible, and it will be subsequently removed
 *   from all pools.)
 * - If the collectible is located in more than one item pool, then any item pool can be provided.
 * - If the collectible is not located in any item pools, then this function will always return
 *   false.
 * - If any player is Tainted Lost, they will be temporarily changed to Isaac and then temporarily
 *   changed back (because Tainted Lost is not able to retrieve some collectibles from item pools).
 */
export function isCollectibleUnlocked(
  collectibleTypeToCheckFor: CollectibleType,
  itemPoolToCheckFor: ItemPoolType,
): boolean {
  // If Eden is holding this collectible, then it is obviously unlocked (and it will also be removed
  // from pools, so the below check won't work).
  if (anyPlayerHasCollectible(collectibleTypeToCheckFor)) {
    return true;
  }

  // On Tainted Lost, it is impossible to retrieve non-offensive collectibles from pools, so we
  // temporarily change the character to Isaac.
  const taintedLosts = getPlayersOfType(PlayerType.THE_LOST_B);
  for (const player of taintedLosts) {
    player.ChangePlayerType(PlayerType.ISAAC);
  }

  // Before checking the item pools, remove any collectibles or trinkets that affect retrieved
  // collectible types.
  const removedItemsMap = new Map<PlayerIndex, CollectibleType[]>();
  const removedTrinketsMap = new Map<PlayerIndex, TrinketType[]>();
  for (const player of getPlayers()) {
    const removedItems: CollectibleType[] = [];
    for (const itemToRemove of COLLECTIBLES_THAT_AFFECT_ITEM_POOLS) {
      if (player.HasCollectible(itemToRemove)) {
        const numCollectibles = player.GetCollectibleNum(itemToRemove);
        repeat(numCollectibles, () => {
          player.RemoveCollectible(itemToRemove);
          removedItems.push(itemToRemove);
        });
      }
    }

    mapSetPlayer(removedItemsMap, player, removedItems);

    const removedTrinkets: TrinketType[] = [];
    for (const trinketToRemove of TRINKETS_THAT_AFFECT_ITEM_POOLS) {
      if (player.HasTrinket(trinketToRemove)) {
        const numTrinkets = player.GetTrinketMultiplier(trinketToRemove);
        repeat(numTrinkets, () => {
          player.TryRemoveTrinket(trinketToRemove);
          removedTrinkets.push(trinketToRemove);
        });
      }
    }

    mapSetPlayer(removedTrinketsMap, player, removedTrinkets);
  }

  // Blacklist every collectible in the game except for the provided collectible.
  const itemPool = game.GetItemPool();
  const collectibleSet = getCollectibleSet();
  for (const collectibleType of collectibleSet.values()) {
    if (collectibleType !== collectibleTypeToCheckFor) {
      itemPool.AddRoomBlacklist(collectibleType);
    }
  }

  // Get a collectible from the pool and see if it is the intended collectible. (We can use any
  // arbitrary value as the seed since it should not influence the result.)
  const retrievedCollectibleType = itemPool.GetCollectible(
    itemPoolToCheckFor,
    false,
    1 as Seed,
  );

  const collectibleUnlocked =
    retrievedCollectibleType === collectibleTypeToCheckFor;

  // Reset the blacklist
  itemPool.ResetRoomBlacklist();

  // Give back items/trinkets, if necessary.
  for (const player of getPlayers()) {
    const removedItems = mapGetPlayer(removedItemsMap, player);
    if (removedItems !== undefined) {
      for (const collectibleType of removedItems) {
        player.AddCollectible(collectibleType, 0, false); // Prevent Chaos from spawning pickups
      }
    }

    const removedTrinkets = mapGetPlayer(removedTrinketsMap, player);
    if (removedTrinkets !== undefined) {
      for (const trinketType of removedTrinkets) {
        player.AddTrinket(trinketType, false);
      }
    }
  }

  return collectibleUnlocked;
}
