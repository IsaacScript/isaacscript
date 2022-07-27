import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { arrayRemoveInPlace, copyArray } from "../functions/array";
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
  },
};

function newPlayerInventory(player: EntityPlayer) {
  const inventory: CollectibleType[] = [];

  for (const collectibleType of getCollectibleArray()) {
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
 * Note that this does not include active collectibles that have since been dropped for other
 * collectibles.
 *
 * In the case of inventory initialization or the case where the player rerolls their build in the
 * middle of the run (e.g. with D4), the order of the inventory will not correspond to the order
 * that the items were actually given to the player. In this case, the inventory will be in the
 * order of the lowest `CollectibleType` to the highest.
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
