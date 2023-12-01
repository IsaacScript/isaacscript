import type { ItemPoolType } from "isaac-typescript-definitions";
import {
  CollectibleType,
  ItemConfigTag,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { collectibleHasTag } from "../../../functions/collectibleTag";
import { anyPlayerHasCollectible } from "../../../functions/playerCollectibles";
import {
  mapGetPlayer,
  mapSetPlayer,
} from "../../../functions/playerDataStructures";
import { getAllPlayers } from "../../../functions/playerIndex";
import { getPlayersOfType } from "../../../functions/players";
import { repeat } from "../../../functions/utils";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { Feature } from "../../private/Feature";
import type { ModdedElementSets } from "./ModdedElementSets";

const COLLECTIBLE_TYPE_THAT_IS_NOT_IN_ANY_POOLS = CollectibleType.KEY_PIECE_1;

const COLLECTIBLES_THAT_AFFECT_ITEM_POOLS = [
  CollectibleType.CHAOS, // 402
  CollectibleType.SACRED_ORB, // 691
  CollectibleType.TMTRAINER, // 721
] as const;

const TRINKETS_THAT_AFFECT_ITEM_POOLS = [TrinketType.NO] as const;

export class ItemPoolDetection extends Feature {
  private readonly moddedElementSets: ModdedElementSets;

  /** @internal */
  constructor(moddedElementSets: ModdedElementSets) {
    super();

    this.featuresUsed = [ISCFeature.MODDED_ELEMENT_SETS];

    this.moddedElementSets = moddedElementSets;
  }

  /**
   * Helper function to get the remaining collectibles in a given item pool. This function is
   * expensive, so only use it in situations where the lag is acceptable.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ITEM_POOL_DETECTION`.
   *
   * @public
   */
  @Exported
  public getCollectiblesInItemPool(
    itemPoolType: ItemPoolType,
  ): readonly CollectibleType[] {
    const collectibleArray = this.moddedElementSets.getCollectibleTypes();
    return collectibleArray.filter((collectibleType) =>
      this.isCollectibleInItemPool(collectibleType, itemPoolType),
    );
  }

  /**
   * Helper function to see if the given collectible is still present in the given item pool.
   *
   * If the collectible is non-offensive, any Tainted Losts will be temporarily changed to Isaac and
   * then changed back. (This is because Tainted Lost is not able to retrieve non-offensive
   * collectibles from item pools).
   *
   * Under the hood, this function works by using the `ItemPool.AddRoomBlacklist` method to
   * blacklist every collectible except for the one provided.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ITEM_POOL_DETECTION`.
   *
   * @public
   */
  @Exported
  public isCollectibleInItemPool(
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
    const taintedLosts = getPlayersOfType(PlayerType.LOST_B);
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

    const { removedItemsMap, removedTrinketsMap } =
      removeItemsAndTrinketsThatAffectItemPools();

    // Blacklist every collectible in the game except for the provided collectible.
    const itemPool = game.GetItemPool();
    itemPool.ResetRoomBlacklist();
    for (const collectibleTypeInSet of this.moddedElementSets.getCollectibleTypes()) {
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
        player.ChangePlayerType(PlayerType.LOST_B);
      }
    }

    return collectibleUnlocked;
  }

  /**
   * Helper function to see if the given collectible is unlocked on the current save file. This
   * requires providing the corresponding item pool that the collectible is normally located in.
   *
   * - If any player currently has the collectible, then it is assumed to be unlocked. (This is
   *   because in almost all cases, when a collectible is added to a player's inventory, it is
   *   subsequently removed from all pools.)
   * - If the collectible is located in more than one item pool, then any item pool can be provided.
   * - If the collectible is not located in any item pools, then this function will always return
   *   false.
   * - If the collectible is non-offensive, any Tainted Losts will be temporarily changed to Isaac
   *   and then changed back. (This is because Tainted Lost is not able to retrieve non-offensive
   *   collectibles from item pools).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ITEM_POOL_DETECTION`.
   *
   * @public
   */
  @Exported
  public isCollectibleUnlocked(
    collectibleType: CollectibleType,
    itemPoolType: ItemPoolType,
  ): boolean {
    if (anyPlayerHasCollectible(collectibleType)) {
      return true;
    }

    return this.isCollectibleInItemPool(collectibleType, itemPoolType);
  }
}

/**
 * Before checking the item pools, remove any collectibles or trinkets that would affect the
 * retrieved collectible types.
 */
function removeItemsAndTrinketsThatAffectItemPools(): {
  removedItemsMap: Map<PlayerIndex, CollectibleType[]>;
  removedTrinketsMap: Map<PlayerIndex, TrinketType[]>;
} {
  const removedItemsMap = new Map<PlayerIndex, CollectibleType[]>();
  const removedTrinketsMap = new Map<PlayerIndex, TrinketType[]>();
  for (const player of getAllPlayers()) {
    const removedItems: CollectibleType[] = [];
    for (const itemToRemove of COLLECTIBLES_THAT_AFFECT_ITEM_POOLS) {
      // We need to include non-real collectibles (like Lilith's Incubus), so we omit the second
      // argument.
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

  return { removedItemsMap, removedTrinketsMap };
}

function restoreItemsAndTrinketsThatAffectItemPools(
  removedItemsMap: ReadonlyMap<PlayerIndex, CollectibleType[]>,
  removedTrinketsMap: ReadonlyMap<PlayerIndex, TrinketType[]>,
) {
  for (const player of getAllPlayers()) {
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
