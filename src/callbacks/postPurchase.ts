import { saveDataManager } from "../features/saveDataManager/exports";
import { getPickups } from "../functions/pickups";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { DefaultMap } from "../types/DefaultMap";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPurchaseFire,
  postPurchaseHasSubscriptions,
} from "./subscriptions/postPurchase";

const v = {
  room: {
    playersHoldingItemOnLastFrameMap: new DefaultMap<PlayerIndex, boolean>(
      false,
    ),
  },
};

/** @internal */
export function postPurchaseCallbackInit(mod: Mod): void {
  saveDataManager("postPurchase", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
}

function hasSubscriptions() {
  return postPurchaseHasSubscriptions();
}

// ModCallbacks.MC_POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const isHoldingItem = player.IsHoldingItem();
  const wasHoldingItemOnLastFrame = defaultMapGetPlayer(
    v.room.playersHoldingItemOnLastFrameMap,
    player,
  );
  mapSetPlayer(v.room.playersHoldingItemOnLastFrameMap, player, isHoldingItem);

  if (!wasHoldingItemOnLastFrame && isHoldingItem) {
    playerPickedUpNewItem(player);
  }
}

function playerPickedUpNewItem(player: EntityPlayer) {
  const pickups = getPickups();
  const disappearingPickup = pickups.find(
    (pickup) => !pickup.Exists() && pickup.Price !== 0,
  );
  if (disappearingPickup !== undefined) {
    postPurchaseFire(player, disappearingPickup);
  }
}
