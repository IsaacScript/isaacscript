import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postKnifeInitLateFire,
  postKnifeInitLateHasSubscriptions,
} from "./subscriptions/postKnifeInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postKnifeInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postKnifeInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_KNIFE_UPDATE, postKnifeUpdate); // 51
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postKnifeInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_KNIFE_UPDATE (51)
function postKnifeUpdate(knife: EntityKnife) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(knife);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postKnifeInitLateFire(knife);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
