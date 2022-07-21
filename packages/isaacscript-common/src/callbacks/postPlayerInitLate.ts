import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import { setAddPlayer, setHasPlayer } from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerInitLateFire,
  postPlayerInitLateHasSubscriptions,
} from "./subscriptions/postPlayerInitLate";

const v = {
  run: {
    playersFiredSet: new Set<PlayerIndex>(),
  },
};

/** @internal */
export function postPlayerInitLateInit(mod: Mod): void {
  saveDataManager("postPlayerInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
}

function hasSubscriptions() {
  return postPlayerInitLateHasSubscriptions();
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (!setHasPlayer(v.run.playersFiredSet, player)) {
    setAddPlayer(v.run.playersFiredSet, player);
    postPlayerInitLateFire(player);
  }
}
