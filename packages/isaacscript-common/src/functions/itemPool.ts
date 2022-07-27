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

/**
 * Helper function to see if the given collectible is still present in the given item pool.
 *
 * If the collectible is non-offensive, any Tainted Losts will be temporarily changed to Isaac and
 * then changed back. (This is because Tainted Lost is not able to retrieve non-offensive
 * collectibles from item pools).
 */
export function isCollectibleInItemPool(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
): boolean {
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
  const retrievedCollectibleType = itemPool.GetCollectible(
    itemPoolType,
    false,
    1 as Seed,
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
