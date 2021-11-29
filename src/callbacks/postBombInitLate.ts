import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import {
  postBombInitLateFire,
  postBombInitLateHasSubscriptions,
} from "./subscriptions/postBombInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function postBombInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postBombInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
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

  const index = GetPtrHash(bomb);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postBombInitLateFire(bomb);
  }
}
