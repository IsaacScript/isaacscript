import { game } from "../cachedClasses";
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

/** @internal */
export function postRoomClearChangedCallbackInit(mod: Mod): void {
  saveDataManager("postRoomClearChanged", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

function hasSubscriptions() {
  return postRoomClearChangedHasSubscriptions();
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
    postRoomClearChangedFire(roomClear);
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
