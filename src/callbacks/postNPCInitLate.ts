import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postNPCInitLate from "./subscriptions/postNPCInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postNPCInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_NPC_UPDATE, postNPCUpdate); // 0
}

function hasSubscriptions() {
  return postNPCInitLate.hasSubscriptions();
}

// ModCallbacks.MC_NPC_UPDATE (0)
function postNPCUpdate(npc: EntityNPC) {
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

  const index = GetPtrHash(npc);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postNPCInitLate.fire(npc);
  }
}
