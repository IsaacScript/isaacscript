import { saveDataManager } from "../features/saveDataManager/main";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postTearInitLate from "./subscriptions/postTearInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postTearInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_TEAR_UPDATE, postTearUpdate); // 40
}

function hasSubscriptions() {
  return postTearInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_TEAR_UPDATE (40)
function postTearUpdate(tear: EntityTear) {
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

  const index = GetPtrHash(tear);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postTearInitLate.fire(tear);
  }
}
