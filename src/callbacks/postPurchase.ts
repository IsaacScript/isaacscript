import { saveDataManager } from "../features/saveDataManager/exports";
import { getPickups } from "../functions/pickups";
import { getPlayerIndex } from "../functions/player";
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
  const playerIndex = getPlayerIndex(player);
  const wasHoldingItemOnLastFrame =
    v.room.playersHoldingItemOnLastFrameMap.getAndSetDefault(playerIndex);
  v.room.playersHoldingItemOnLastFrameMap.set(playerIndex, isHoldingItem);

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
