import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postNPCInitLateFire,
  postNPCInitLateHasSubscriptions,
} from "./subscriptions/postNPCInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postNPCInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postNPCInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_NPC_UPDATE, postNPCUpdate); // 0
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postNPCInitLateHasSubscriptions();
}

// ModCallbacks.MC_NPC_UPDATE (0)
function postNPCUpdate(npc: EntityNPC) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(npc);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postNPCInitLateFire(npc);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
