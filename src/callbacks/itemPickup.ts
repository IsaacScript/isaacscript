// This provides the logic for PreItemPickup and PostItemPickup

import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { defaultMapGetPlayer } from "../functions/playerDataStructures";
import {
  newPickingUpItem,
  PickingUpItem,
  resetPickingUpItem,
} from "../types/PickingUpItem";
import { PlayerIndex } from "../types/PlayerIndex";
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
    playersPickingUpItemMap: new DefaultMap<PlayerIndex, PickingUpItem>(() =>
      newPickingUpItem(),
    ),
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

  const pickingUpItem = defaultMapGetPlayer(
    v.run.playersPickingUpItemMap,
    player,
  );

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
}

function queueNotEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  const queuedItem = player.QueuedItem.Item;
  if (queuedItem === undefined) {
    // This should never happen, since the "EntityPlayer.IsItemQueueEmpty" method returned true
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
