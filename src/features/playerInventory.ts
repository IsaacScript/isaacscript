import {
  ActiveSlot,
  CollectibleType,
  ItemType,
  ModCallback,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { arrayRemoveInPlace, copyArray } from "../functions/array";
import { isActiveCollectible } from "../functions/collectibles";
import { getCollectibleSet } from "../functions/collectibleSet";
import { getAllPlayers, getPlayerIndex } from "../functions/playerIndex";
import { repeat } from "../functions/utils";
import { PickingUpItem } from "../types/PickingUpItem";
import { PlayerIndex } from "../types/PlayerIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "player inventory tracker";

const COLLECTIBLE_ITEM_TYPES: ReadonlySet<ItemType> = new Set([
  ItemType.PASSIVE, // 1
  ItemType.ACTIVE, // 3
  ItemType.FAMILIAR, // 4
]);

const v = {
  run: {
    playersInventory: new DefaultMap<
      PlayerIndex,
      CollectibleType[],
      [player: EntityPlayer]
    >((_key: PlayerIndex, player: EntityPlayer) => newPlayerInventory(player)),

    /**
     * We also keep track of the active items that the player has, so that we can easily flush them
     * from the inventory when other active items are picked up.
     */
    playersActiveCollectibleTypes: new DefaultMap<
      PlayerIndex,
      CollectibleType[]
    >(() => []),
  },
};

function newPlayerInventory(player: EntityPlayer) {
  const inventory: CollectibleType[] = [];

  const collectibleSet = getCollectibleSet();
  for (const collectibleType of collectibleSet.values()) {
    const numCollectibles = player.GetCollectibleNum(collectibleType, true);
    repeat(numCollectibles, () => {
      inventory.push(collectibleType);
    });
  }

  return inventory;
}

/** @internal */
export function playerInventoryInit(mod: ModUpgraded): void {
  saveDataManager("playerInventory", v);

  mod.AddCallback(ModCallback.POST_USE_ITEM, useItemD4, CollectibleType.D4); // 3
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, postItemPickup);
}

// ModCallback.POST_USE_ITEM (3)
// CollectibleType.D4 (284)
function useItemD4(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
) {
  const playerIndex = getPlayerIndex(player);
  const inventory = newPlayerInventory(player);
  v.run.playersInventory.set(playerIndex, inventory);
}

// ModCallback.POST_GAME_STARTED (15)
function postGameStarted() {
  // We don't use the PostPlayerInit function because some items are not given to the player at that
  // point.
  for (const player of getAllPlayers()) {
    const playerIndex = getPlayerIndex(player);
    if (!v.run.playersInventory.has(playerIndex)) {
      const inventory = newPlayerInventory(player);
      v.run.playersInventory.set(playerIndex, inventory);
    }
  }
}

// ModCallbackCustom.POST_ITEM_PICKUP
function postItemPickup(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  if (!COLLECTIBLE_ITEM_TYPES.has(pickingUpItem.itemType)) {
    return;
  }

  addCollectibleToInventory(player, pickingUpItem.subType as CollectibleType);
}

function addCollectibleToInventory(
  player: EntityPlayer,
  collectibleType: CollectibleType,
) {
  const playerIndex = getPlayerIndex(player);
  const inventory = v.run.playersInventory.getAndSetDefault(
    playerIndex,
    player,
  );
  inventory.push(collectibleType);

  if (!isActiveCollectible(collectibleType)) {
    return;
  }

  const activeCollectibleTypes =
    v.run.playersActiveCollectibleTypes.getAndSetDefault(playerIndex);
  activeCollectibleTypes.push(collectibleType);

  const droppedActiveCollectibleTypes = activeCollectibleTypes.filter(
    (activeCollectibleType) => !player.HasCollectible(activeCollectibleType),
  );
  for (const activeCollectibleType of droppedActiveCollectibleTypes) {
    arrayRemoveInPlace(inventory, activeCollectibleType);
    arrayRemoveInPlace(activeCollectibleTypes, activeCollectibleType);
  }
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

  const playerIndex = getPlayerIndex(player);
  const inventory = v.run.playersInventory.getAndSetDefault(
    playerIndex,
    player,
  );

  const copiedInventory = copyArray(inventory);
  if (includeActiveCollectibles) {
    return copiedInventory;
  }

  return copiedInventory.filter(
    (collectibleType) => !isActiveCollectible(collectibleType),
  );
}

/**
 * Helper function to add a collectible to a player. Use this instead of the
 * `EntityPlayer.AddCollectible` method if you want the collectible that is added to be
 * automatically tracked by the player inventory tracker feature.
 *
 * You only need to use this function if you are using the inventory feature from the standard
 * library.
 */
export function addCollectible(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  charge?: int,
  firstTimePickingUp?: boolean,
  activeSlot?: ActiveSlot,
  varData?: int,
): void {
  player.AddCollectible(
    collectibleType,
    charge,
    firstTimePickingUp,
    activeSlot,
    varData,
  );

  addCollectibleToInventory(player, collectibleType);
}
