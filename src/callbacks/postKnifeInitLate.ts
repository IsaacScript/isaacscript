import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import {
  postKnifeInitLateFire,
  postKnifeInitLateHasSubscriptions,
} from "./subscriptions/postKnifeInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
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

  const roomIndex = getRoomIndex();
  const roomVisitedCount = getRoomVisitedCount();
  if (
    roomIndex !== v.run.currentRoomIndex ||
    roomVisitedCount !== v.run.currentRoomVisitedCount
  ) {
    v.run.currentRoomIndex = roomIndex;
    v.run.currentRoomVisitedCount = roomVisitedCount;
    v.run.firedSet.clear();
  }

  const index = GetPtrHash(knife);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postKnifeInitLateFire(knife);
  }
}
