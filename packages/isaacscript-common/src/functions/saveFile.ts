import {
  CollectibleType,
  ItemConfigTag,
  ItemPoolType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { PlayerIndex } from "../types/PlayerIndex";
import { getCollectibleSet } from "./collectibleSet";
import { collectibleHasTag } from "./collectibleTag";
import { mapGetPlayer, mapSetPlayer } from "./playerDataStructures";
import { getPlayers } from "./playerIndex";
import { anyPlayerHasCollectible, getPlayersOfType } from "./players";
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
 *
 * Under the hood, this function works by using the `ItemPool.AddRoomBlacklist` method to blacklist
 * every collectible except for the one provided. Unfortunately, this is not a general-purpose
 * "isCollectibleInItemPool" algorithm, because when a pool is depleted, it will automatically pull
 * collectibles from the Treasure Room pool, and there is no way to distinguish when this happens.
 */
export function isCollectibleUnlocked(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
): boolean {
  if (anyPlayerHasCollectible(collectibleType)) {
    return true;
  }

  // On Tainted Lost, it is impossible to retrieve non-offensive collectibles from pools, so we
  // temporarily change the character to Isaac.
  const taintedLosts = getPlayersOfType(PlayerType.THE_LOST_B);
  const isOffensive = collectibleHasTag(
    collectibleType,
    ItemConfigTag.OFFENSIVE,
  );
  let changedPlayerTypes = false;
  if (!isOffensive) {
    changedPlayerTypes = true;
    for (const player of taintedLosts) {
      player.ChangePlayerType(PlayerType.ISAAC);
    }
  }

  const [removedItemsMap, removedTrinketsMap] =
    removeItemsAndTrinketsThatAffectItemPools();

  // Blacklist every collectible in the game except for the provided collectible.
  const itemPool = game.GetItemPool();
  const collectibleSet = getCollectibleSet();
  for (const collectibleTypeInSet of collectibleSet.values()) {
    if (collectibleTypeInSet !== collectibleType) {
      itemPool.AddRoomBlacklist(collectibleTypeInSet);
    }
  }

  // Get a collectible from the pool and see if it is the intended collectible. (We can use any
  // arbitrary value as the seed since it should not influence the result.)
  const seed = 1 as Seed;
  const retrievedCollectibleType = itemPool.GetCollectible(
    itemPoolType,
    false,
    seed,
  );

  const collectibleUnlocked = retrievedCollectibleType === collectibleType;

  // Reset the blacklist
  itemPool.ResetRoomBlacklist();

  restoreItemsAndTrinketsThatAffectItemPools(
    removedItemsMap,
    removedTrinketsMap,
  );

  // Change any players back to Tainted Lost, if necessary.
  if (changedPlayerTypes) {
    for (const player of taintedLosts) {
      player.ChangePlayerType(PlayerType.THE_LOST_B);
    }
  }

  return collectibleUnlocked;
}

/**
 * Before checking the item pools, remove any collectibles or trinkets that would affect the
 * retrieved collectible types.
 */
function removeItemsAndTrinketsThatAffectItemPools(): [
  removedItemsMap: Map<PlayerIndex, CollectibleType[]>,
  removedTrinketsMap: Map<PlayerIndex, TrinketType[]>,
] {
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

  return [removedItemsMap, removedTrinketsMap];
}

function restoreItemsAndTrinketsThatAffectItemPools(
  removedItemsMap: Map<PlayerIndex, CollectibleType[]>,
  removedTrinketsMap: Map<PlayerIndex, TrinketType[]>,
) {
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
}
