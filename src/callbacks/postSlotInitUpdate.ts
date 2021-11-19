import { saveDataManager } from "../features/saveDataManager/exports";
import { getSlots } from "../functions/entity";
import * as postSlotInit from "./subscriptions/postSlotInit";
import * as postSlotUpdate from "./subscriptions/postSlotUpdate";

// This provides the logic for the PostSlotInit and PostSlotUpdate callbacks
// (the PostSlotRender and PostSlotDestroyed callbacks are handled in a different file)

const v = {
  room: {
    initializedSlots: new Set<PtrHash>(),
  },
};

export function postSlotInitUpdateCallbacksInit(mod: Mod): void {
  saveDataManager("postSlotInitUpdate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 9
}

function hasSubscriptions() {
  return postSlotInit.hasSubscriptions() || postSlotUpdate.hasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    checkNewEntity(slot);
    postSlotUpdate.fire(slot);
  }
}

// ModCallbacks.MC_POST_NEW_ROOM (9)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    checkNewEntity(slot);
  }
}

function checkNewEntity(slot: Entity) {
  const ptrHash = GetPtrHash(slot);
  if (!v.room.initializedSlots.has(ptrHash)) {
    v.room.initializedSlots.add(ptrHash);
    postSlotInit.fire(slot);
  }
}
