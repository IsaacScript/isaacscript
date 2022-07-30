import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
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

export function postPlayerInitLateInit(mod: ModUpgraded): void {
  saveDataManager("postPlayerInitLate", v, hasSubscriptions);

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postPlayerInitLateHasSubscriptions();
}

// ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (!setHasPlayer(v.run.playersFiredSet, player)) {
    setAddPlayer(v.run.playersFiredSet, player);
    postPlayerInitLateFire(player);
  }
}
