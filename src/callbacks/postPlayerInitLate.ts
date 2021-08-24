import { saveDataManager } from "../features/saveDataManager/main";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import * as postPlayerInitLate from "./subscriptions/postPlayerInitLate";

const v = {
  room: {
    firedMap: new Map<PlayerIndex, boolean>(),
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

  const playerIndex = getPlayerIndex(player);
  const fired = v.room.firedMap.get(playerIndex);
  if (fired === undefined) {
    v.room.firedMap.set(playerIndex, true);
    postPlayerInitLate.fire(player);
  }
}
