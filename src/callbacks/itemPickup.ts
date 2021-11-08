// This provides the logic for PreItemPickup and PostItemPickup

import { saveDataManager } from "../features/saveDataManager/main";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PickingUpItem } from "../types/PickingUpItem";
import * as postItemPickup from "./subscriptions/postItemPickup";
import * as preItemPickup from "./subscriptions/preItemPickup";

const v = {
  run: {
    pickingUpItem: new Map<PlayerIndex, PickingUpItem>(),
  },
};

export function init(mod: ModUpgraded): void {
  saveDataManager("itemPickupCallback", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED,
    postPlayerUpdateReorderedPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot take items
  );
}

function hasSubscriptions() {
  return preItemPickup.hasSubscriptions() || postItemPickup.hasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED
// PlayerVariant.PLAYER (0)
function postPlayerUpdateReorderedPlayer(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const pickingUpItem = getPickingUpItemForPlayer(player);

  if (player.IsItemQueueEmpty()) {
    queueEmpty(player, pickingUpItem);
  } else {
    queueNotEmpty(player, pickingUpItem);
  }
}

function queueEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  // Check to see if this player was picking something up on the previous frame
  if (pickingUpItem.id !== CollectibleType.COLLECTIBLE_NULL) {
    postItemPickup.fire(player, pickingUpItem);

    // Reset the held item for this player
    pickingUpItem.id = CollectibleType.COLLECTIBLE_NULL;
    pickingUpItem.type = ItemType.ITEM_NULL;
  }
}

function queueNotEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  const queuedItem = player.QueuedItem.Item;

  if (queuedItem !== undefined && queuedItem.ID !== pickingUpItem.id) {
    // Record which item we are picking up
    pickingUpItem.id = queuedItem.ID;
    pickingUpItem.type = queuedItem.Type;

    preItemPickup.fire(player, pickingUpItem);
  }
}

function getPickingUpItemForPlayer(player: EntityPlayer) {
  const index = getPlayerIndex(player);

  let pickingUpItem = v.run.pickingUpItem.get(index);
  if (pickingUpItem === undefined) {
    pickingUpItem = {
      id: CollectibleType.COLLECTIBLE_NULL,
      type: ItemType.ITEM_NULL,
    };
    v.run.pickingUpItem.set(index, pickingUpItem);
  }

  return pickingUpItem;
}
