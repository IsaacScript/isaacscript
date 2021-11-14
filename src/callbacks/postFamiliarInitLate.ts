import { saveDataManager } from "../features/saveDataManager/main";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postFamiliarInitLate from "./subscriptions/postFamiliarInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null,
    currentRoomVisitedCount: null,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postFamiliarInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, postFamiliarUpdate); // 6
}

function hasSubscriptions() {
  return postFamiliarInitLate.hasSubscriptions();
}

// ModCallbacks.MC_FAMILIAR_UPDATE (6)
function postFamiliarUpdate(familiar: EntityFamiliar) {
  if (!hasSubscriptions()) {
    return;
  }

  const roomIndex = getRoomIndex();
  const visitedCount = getRoomVisitedCount();
  if (
    roomIndex !== v.run.currentRoomIndex ||
    visitedCount !== v.run.currentRoomVisitedCount
  ) {
    v.run.firedSet.clear();
  }

  const index = GetPtrHash(familiar);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postFamiliarInitLate.fire(familiar);
  }
}
