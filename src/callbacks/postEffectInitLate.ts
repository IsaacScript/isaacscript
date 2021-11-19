import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postEffectInitLate from "./subscriptions/postEffectInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function postEffectInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postEffectInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate); // 55
}

function hasSubscriptions() {
  return postEffectInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
function postEffectUpdate(effect: EntityEffect) {
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

  const index = GetPtrHash(effect);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postEffectInitLate.fire(effect);
  }
}
