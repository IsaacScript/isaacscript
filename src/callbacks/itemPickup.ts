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
  if (pickingUpItem.subType === CollectibleType.COLLECTIBLE_NULL) {
    return;
  }

  postItemPickupFire(player, pickingUpItem);
  resetPickingUpItem(pickingUpItem);

  // If we are The Forgotten, we need to also reset the held item for The Soul
  // Otherwise, it is possible to make the callback trigger twice by picking up an item on The Soul
  // and switching back to The Forgotten, then switching back to The Soul after the animation is
  // over
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THEFORGOTTEN) {
    const theSoul = player.GetSubPlayer();
    if (theSoul !== undefined) {
      const theSoulPickingUpItem = getPickingUpItemForPlayer(theSoul);
      resetPickingUpItem(theSoulPickingUpItem);
    }
  }
}

function resetPickingUpItem(pickingUpItem: PickingUpItem) {
  pickingUpItem.itemType = ItemType.ITEM_NULL;
  pickingUpItem.subType = CollectibleType.COLLECTIBLE_NULL;
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
      itemType: ItemType.ITEM_NULL,
      subType: CollectibleType.COLLECTIBLE_NULL,
    };
    v.run.pickingUpItem.set(index, pickingUpItem);
  }

  return pickingUpItem;
}
