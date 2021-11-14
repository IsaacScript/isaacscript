import { saveDataManager } from "../features/saveDataManager/main";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postBombInitLate from "./subscriptions/postBombInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postBombInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombInitLate.hasSubscriptions();
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
    postBombInitLate.fire(bomb);
  }
}
