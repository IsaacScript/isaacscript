// This provides the logic for PostFlip and PostFirstFlip

import { saveDataManager } from "../features/saveDataManager/main";
import { getPlayers } from "../functions/player";
import * as postFirstFlip from "./subscriptions/postFirstFlip";
import * as postFlip from "./subscriptions/postFlip";

const v = {
  run: {
    usedFlipAtLeastOnce: false,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postFlipCallback", v, hasSubscriptions);

  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemFlip,
    CollectibleType.COLLECTIBLE_FLIP,
  ); // 3
}

function hasSubscriptions() {
  return postFlip.hasSubscriptions() || postFirstFlip.hasSubscriptions();
}

// ModCallbacks.USE_ITEM (3)
// CollectibleType.COLLECTIBLE_FLIP (711)
function useItemFlip(
  _collectibleType: CollectibleType | int,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: int,
  _activeSlot: int,
  _customVarData: int,
): void {
  if (!hasSubscriptions()) {
    return;
  }

  // The player passed as part of the callback will be the old Lazarus that used the Flip item
  // We pass the new Lazarus to the callback subscribers
  const newLazarus = getNewLazarus(player);

  if (!v.run.usedFlipAtLeastOnce) {
    v.run.usedFlipAtLeastOnce = true;
    postFirstFlip.fire(newLazarus);
  }

  postFlip.fire(newLazarus);
}

function getNewLazarus(oldLazarus: EntityPlayer) {
  const oldLazarusHash = GetPtrHash(oldLazarus);
  for (const player of getPlayers()) {
    const playerHash = GetPtrHash(player);
    if (playerHash === oldLazarusHash) {
      return player;
    }
  }

  error("Failed to find the player entity for the new Lazarus.");
  return oldLazarus;
}
