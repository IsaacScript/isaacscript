import { saveDataManager } from "../features/saveDataManager/main";
import * as postPlayerInitLate from "./subscriptions/postPlayerInitLate";

const v = {
  room: {
    firedMap: new Map<PtrHash, boolean>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPlayerInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_UPDATE, postPlayerUpdate); // 31
}

function hasSubscriptions() {
  return postPlayerInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(player);
  const fired = v.room.firedMap.get(index);
  if (fired === undefined) {
    v.room.firedMap.set(index, true);
    postPlayerInitLate.fire(player);
  }
}
