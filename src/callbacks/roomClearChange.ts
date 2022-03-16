import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  roomClearChangedFire,
  roomClearChangedHasSubscriptions,
} from "./subscriptions/roomClearChange";

const v = {
  room: {
    cleared: false,
  },
};

/** @internal */
export function roomClearChangeCallbackInit(mod: Mod): void {
  saveDataManager("roomClearChange", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

function hasSubscriptions() {
  return roomClearChangedHasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();

  if (roomClear !== v.room.cleared) {
    v.room.cleared = roomClear;
    roomClearChangedFire(roomClear);
  }
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();
  const roomClear = room.IsClear();

  v.room.cleared = roomClear;
}
