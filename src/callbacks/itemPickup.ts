// This provides the logic for PreItemPickup and PostItemPickup

import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PickingUpItem } from "../types/PickingUpItem";
import {
  postItemPickupFire,
  postItemPickupHasSubscriptions,
} from "./subscriptions/postItemPickup";
import {
  preItemPickupFire,
  preItemPickupHasSubscriptions,
} from "./subscriptions/preItemPickup";

const v = {
  run: {
    pickingUpItem: new Map<PlayerIndex, PickingUpItem>(),
  },
};

/** @internal */
export function itemPickupCallbacksInit(mod: ModUpgraded): void {
  saveDataManager("itemPickup", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return preItemPickupHasSubscriptions() || postItemPickupHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const pickingUpItem = getPickingUpItemForPlayer(player);

  if (player.IsItemQueueEmpty()) {
    queueEmpty(player, pickingUpItem);
    // If a player enters a room with a trinket next to the entrance, the player will pick up the
    // trinket, but it will not become queued (it will be deposited into their inventory
    // immediately)
    // Since we don't know what type of item the player is holding, don't account for this bug
  } else {
    queueNotEmpty(player, pickingUpItem);
  }
}

function queueEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  // Check to see if this player was picking something up on the previous frame
  if (pickingUpItem.subType !== CollectibleType.COLLECTIBLE_NULL) {
    postItemPickupFire(player, pickingUpItem);

    // Reset the held item for this player
    pickingUpItem.subType = CollectibleType.COLLECTIBLE_NULL;
    pickingUpItem.itemType = ItemType.ITEM_NULL;
  }
}

function queueNotEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  const queuedItem = player.QueuedItem.Item;
  if (queuedItem === undefined) {
    // This should never happen, since "player.IsItemQueueEmpty()" returned true
    return;
  }

  if (
    queuedItem.Type !== pickingUpItem.itemType ||
    queuedItem.ID !== pickingUpItem.subType
  ) {
    // Record which item we are picking up
    pickingUpItem.itemType = queuedItem.Type;
    pickingUpItem.subType = queuedItem.ID;

    preItemPickupFire(player, pickingUpItem);
  }
}

function getPickingUpItemForPlayer(player: EntityPlayer) {
  const index = getPlayerIndex(player);

  let pickingUpItem = v.run.pickingUpItem.get(index);
  if (pickingUpItem === undefined) {
    pickingUpItem = {
      subType: CollectibleType.COLLECTIBLE_NULL,
      itemType: ItemType.ITEM_NULL,
    };
    v.run.pickingUpItem.set(index, pickingUpItem);
  }

  return pickingUpItem;
}
