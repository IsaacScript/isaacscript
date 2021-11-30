import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postKnifeInitLateFire,
  postKnifeInitLateHasSubscriptions,
} from "./subscriptions/postKnifeInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postKnifeInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postKnifeInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_KNIFE_UPDATE, postKnifeUpdate); // 51
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
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postKnifeInitLateFire(knife);
  }
}
