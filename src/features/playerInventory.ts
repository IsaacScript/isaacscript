import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getCollectibleSet } from "../functions/collectibleSet";
import { getPlayerIndex } from "../functions/player";
import { repeat } from "../functions/utils";
import { DefaultMap } from "../types/DefaultMap";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PickingUpItem } from "../types/PickingUpItem";
import { PlayerIndex } from "../types/PlayerIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "player inventory tracker";

const v = {
  run: {
    playersInventory: new DefaultMap<
      PlayerIndex,
      Array<CollectibleType | int>,
      [player: EntityPlayer]
    >((_key: PlayerIndex, player: EntityPlayer) => newPlayerInventory(player)),
  },
};

function newPlayerInventory(player: EntityPlayer) {
  const inventory: Array<CollectibleType | int> = [];

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

  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemD4,
    CollectibleType.COLLECTIBLE_D4,
  ); // 3
  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallbackCustom(ModCallbacksCustom.MC_POST_ITEM_PICKUP, postItemPickup);
}

// ModCallbacks.MC_USE_ITEM (3)
// CollectibleType.COLLECTIBLE_D4 (284)
function useItemD4(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
) {
  const playerIndex = getPlayerIndex(player);
  const inventory = newPlayerInventory(player);
  v.run.playersInventory.set(playerIndex, inventory);
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  const playerIndex = getPlayerIndex(player);
  if (!v.run.playersInventory.has(playerIndex)) {
    const inventory = newPlayerInventory(player);
    v.run.playersInventory.set(playerIndex, inventory);
  }
}

// ModCallbacksCustom.MC_POST_ITEM_PICKUP
function postItemPickup(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  if (
    pickingUpItem.itemType === ItemType.ITEM_PASSIVE ||
    pickingUpItem.itemType === ItemType.ITEM_FAMILIAR
  ) {
    const playerIndex = getPlayerIndex(player);
    const inventory = v.run.playersInventory.getAndSetDefault(
      playerIndex,
      player,
    );
    inventory.push(pickingUpItem.subType);
  }
}

/**
 * Helper function to get all of the collectibles that the player has gotten so far on this run, in
 * order. This does not include active items.
 */
export function getPlayerInventory(player: EntityPlayer): CollectibleType[] {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  const playerIndex = getPlayerIndex(player);
  return v.run.playersInventory.getAndSetDefault(playerIndex, player);
}
