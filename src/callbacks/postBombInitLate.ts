import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postBombInitLateFire,
  postBombInitLateHasSubscriptions,
} from "./subscriptions/postBombInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postBombInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postBombInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate); // 58
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postBombInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(bomb);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postBombInitLateFire(bomb);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
