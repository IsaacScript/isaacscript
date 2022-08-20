import {
  CollectibleType,
  ItemConfigTag,
  ItemPoolType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { PlayerIndex } from "../types/PlayerIndex";
import { getCollectibleArray } from "./collectibleSet";
import { collectibleHasTag } from "./collectibleTag";
import { mapGetPlayer, mapSetPlayer } from "./playerDataStructures";
import { getPlayers } from "./playerIndex";
import { getPlayersOfType } from "./players";
import { repeat } from "./utils";

const COLLECTIBLES_THAT_AFFECT_ITEM_POOLS: readonly CollectibleType[] = [
  CollectibleType.CHAOS, // 402
  CollectibleType.SACRED_ORB, // 691
  CollectibleType.TMTRAINER, // 721
];

const TRINKETS_THAT_AFFECT_ITEM_POOLS: readonly TrinketType[] = [
  TrinketType.NO,
];

const COLLECTIBLE_TYPE_THAT_IS_NOT_IN_ANY_POOLS = CollectibleType.KEY_PIECE_1;

/**
 * Helper function to get the remaining collectibles in a given item pool. This function is
 * expensive, so only use it in situations where the lag is acceptable.
 */
export function getCollectiblesInItemPool(
  itemPoolType: ItemPoolType,
): CollectibleType[] {
  const collectibleArray = getCollectibleArray();
  return collectibleArray.filter((collectibleType) =>
    isCollectibleInItemPool(collectibleType, itemPoolType),
  );
}

/**
 * Helper function to see if the given collectible is still present in the given item pool.
 *
 * If the collectible is non-offensive, any Tainted Losts will be temporarily changed to Isaac and
 * then changed back. (This is because Tainted Lost is not able to retrieve non-offensive
 * collectibles from item pools).
 *
 * Under the hood, this function works by using the `ItemPool.AddRoomBlacklist` method to blacklist
 * every collectible except for the one provided.
 */
export function isCollectibleInItemPool(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
): boolean {
  // We use a specific collectible which is known to not be in any pools as a default value. Thus,
  // we must explicitly handle this case.
  if (collectibleType === COLLECTIBLE_TYPE_THAT_IS_NOT_IN_ANY_POOLS) {
    return false;
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
  itemPool.ResetRoomBlacklist();
  for (const collectibleTypeInSet of getCollectibleArray()) {
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
    COLLECTIBLE_TYPE_THAT_IS_NOT_IN_ANY_POOLS,
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
      // We need to include non-real collectibles, like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(itemToRemove);
      repeat(numCollectibles, () => {
        player.RemoveCollectible(itemToRemove);
        removedItems.push(itemToRemove);
      });
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
