import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import * as postPlayerInitLate from "./subscriptions/postPlayerInitLate";

const v = {
  run: {
    firedSet: new Set<PlayerIndex>(),
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
  if (!v.run.firedSet.has(playerIndex)) {
    v.run.firedSet.add(playerIndex);
    postPlayerInitLate.fire(player);
  }
}
