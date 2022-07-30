import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { game } from "../core/cachedClasses";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postRoomClearChangedFire,
  postRoomClearChangedHasSubscriptions,
} from "./subscriptions/postRoomClearChanged";

const v = {
  room: {
    cleared: false,
  },
};

export function postRoomClearChangedInit(mod: ModUpgraded): void {
  saveDataManager("postRoomClearChanged", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

function hasSubscriptions() {
  return postRoomClearChangedHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();

  if (roomClear !== v.room.cleared) {
    v.room.cleared = roomClear;
    postRoomClearChangedFire(roomClear);
  }
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();

  v.room.cleared = roomClear;
}
