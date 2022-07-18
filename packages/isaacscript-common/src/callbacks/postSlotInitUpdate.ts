// This provides the logic for the PostSlotInit and PostSlotUpdate callbacks. (The other slot
// callbacks are handled in a different file.)

import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getSlots } from "../functions/entitiesSpecific";
import {
  postSlotInitFire,
  postSlotInitHasSubscriptions,
} from "./subscriptions/postSlotInit";
import {
  postSlotUpdateFire,
  postSlotUpdateHasSubscriptions,
} from "./subscriptions/postSlotUpdate";

const v = {
  room: {
    initializedSlots: new Set<PtrHash>(),
  },
};

/** @internal */
export function postSlotInitUpdateCallbacksInit(mod: ModUpgraded): void {
  saveDataManager("postSlotInitUpdate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

function hasSubscriptions() {
  return postSlotInitHasSubscriptions() || postSlotUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    checkNewEntity(slot);
    postSlotUpdateFire(slot);
  }
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    checkNewEntity(slot);
  }
}

function checkNewEntity(slot: EntitySlot) {
  const ptrHash = GetPtrHash(slot);
  if (!v.room.initializedSlots.has(ptrHash)) {
    v.room.initializedSlots.add(ptrHash);
    postSlotInitFire(slot);
  }
}
