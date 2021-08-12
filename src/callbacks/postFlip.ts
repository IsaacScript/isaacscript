// This provides the logic for PostFlip and PostFirstFlip

import { saveDataManager } from "../features/saveDataManager";
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

  if (!v.run.usedFlipAtLeastOnce) {
    v.run.usedFlipAtLeastOnce = true;
    postFirstFlip.fire(player);
  }

  postFlip.fire(player);
}
