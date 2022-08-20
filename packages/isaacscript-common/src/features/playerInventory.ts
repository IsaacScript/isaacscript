import {
  ActiveSlot,
  CollectibleType,
  ModCallback,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import {
  arrayRemoveInPlace,
  copyArray,
  getLastElement,
} from "../functions/array";
import { isActiveCollectible } from "../functions/collectibles";
import { getCollectibleArray } from "../functions/collectibleSet";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { getAllPlayers, getPlayerIndex } from "../functions/playerIndex";
import { repeat } from "../functions/utils";
import { PlayerIndex } from "../types/PlayerIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "playerInventory";

const v = {
  run: {
    playersInventory: new DefaultMap<
      PlayerIndex,
      CollectibleType[],
      [player: EntityPlayer]
    >((player: EntityPlayer) => newPlayerInventory(player)),
    playersActiveItems: new Map<ActiveSlot, CollectibleType>(),
  },
};

function newPlayerInventory(player: EntityPlayer) {
  const inventory: CollectibleType[] = [];

  for (const collectibleType of getCollectibleArray()) {
    // We need to specify "true" as the second argument here to filter out things like Lilith's
    // Incubus.
    const numCollectibles = player.GetCollectibleNum(collectibleType, true);
    repeat(numCollectibles, () => {
      inventory.push(collectibleType);
    });
  }

  return inventory;
}

function resetInventory(player: EntityPlayer) {
  const inventory = newPlayerInventory(player);
  mapSetPlayer(v.run.playersInventory, player, inventory);
}

/** @internal */
export function playerInventoryInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_USE_ITEM, useItemD4, CollectibleType.D4); // 3
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED,
    postCollectibleAdded,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED,
    postCollectibleRemoved,
  );
}

// ModCallback.POST_USE_ITEM (3)
// CollectibleType.D4 (284)
function useItemD4(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
): boolean | undefined {
  // This function is also triggered when the player uses D100, D Infinity, a 1-pip dice room, or a
  // 6-pip dice room. (Genesis should be automatically handled by the
  // `POST_PLAYER_COLLECTIBLE_REMOVED` callback.)
  resetInventory(player);

  return undefined;
}

// ModCallback.POST_GAME_STARTED (15)
function postGameStarted() {
  // We don't use the `POST_PLAYER_INIT` callback because some items are not given to the player at
  // that point.
  for (const player of getAllPlayers()) {
    const playerIndex = getPlayerIndex(player);
    if (!v.run.playersInventory.has(playerIndex)) {
      resetInventory(player);
    }
  }
}

// ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED
function postCollectibleAdded(
  player: EntityPlayer,
  collectibleType: CollectibleType,
) {
  const inventory = defaultMapGetPlayer(v.run.playersInventory, player, player);
  inventory.push(collectibleType);
}

// ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED
function postCollectibleRemoved(
  player: EntityPlayer,
  collectibleType: CollectibleType,
) {
  const inventory = defaultMapGetPlayer(v.run.playersInventory, player, player);
  arrayRemoveInPlace(inventory, collectibleType);
}

/**
 * Helper function to get all of the collectibles that the player has gotten so far on this run, in
 * order.
 *
 * In the case of inventory initialization or the case where the player rerolls their build in the
 * middle of the run (e.g. with D4), the order of the inventory will not correspond to the order
 * that the items were actually given to the player. In this case, the inventory will be in the
 * order of the lowest `CollectibleType` to the highest.
 *
 * Under the hood, the inventory tracking works by tracking the number of collectibles that a player
 * has on every frame. Thus, in a situation where a collectible was both added and removed to the
 * player on the same frame, the amount of total collectibles would stay the same, and the inventory
 * would not be updated. In vanilla, this situation would never happen, but another mod might do
 * this for some reason. (With that said, the next time that a collectible is normally added or
 * removed, it would trigger a re-scan, and the previous changes would be picked up.)
 *
 * @param player The player to get the inventory for.
 * @param includeActiveCollectibles Optional. If true, will include all active collectibles. Default
 *                                 is true.
 */
export function getPlayerInventory(
  player: EntityPlayer,
  includeActiveCollectibles = true,
): CollectibleType[] {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const inventory = defaultMapGetPlayer(v.run.playersInventory, player, player);

  const copiedInventory = copyArray(inventory);
  if (includeActiveCollectibles) {
    return copiedInventory;
  }

  return copiedInventory.filter(
    (collectibleType) => !isActiveCollectible(collectibleType),
  );
}

/**
 * Helper function to get the last passive collectible that the player picked up. In most cases,
 * this will be the passive that is removed when the player would use Clicker.
 *
 * Returns undefined if the player does not have any passive collectibles.
 */
export function getPlayerLastPassiveCollectible(
  player: EntityPlayer,
): CollectibleType | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const inventory = getPlayerInventory(player, false);
  return getLastElement(inventory);
}
