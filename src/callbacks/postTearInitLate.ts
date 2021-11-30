import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postTearInitLateFire,
  postTearInitLateHasSubscriptions,
} from "./subscriptions/postTearInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postTearInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postTearInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_TEAR_UPDATE, postTearUpdate); // 40
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postTearInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_TEAR_UPDATE (40)
function postTearUpdate(tear: EntityTear) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(tear);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postTearInitLateFire(tear);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
