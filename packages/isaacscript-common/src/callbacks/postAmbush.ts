// This provides the logic for the following callbacks:
// - `POST_AMBUSH_STARTED`
// - `POST_AMBUSH_FINISHED`

import { ModCallback, RoomType } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { AmbushType } from "../enums/AmbushType";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomType } from "../functions/roomData";
import {
  postAmbushFinishedFire,
  postAmbushFinishedHasSubscriptions,
} from "./subscriptions/postAmbushFinished";
import {
  postAmbushStartedFire,
  postAmbushStartedHasSubscriptions,
} from "./subscriptions/postAmbushStarted";

const v = {
  room: {
    ambushActive: false,
    ambushDone: false,
  },
};

export function postAmbushCallbacksInit(mod: Mod): void {
  saveDataManager("postAmbushCallbacks", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return (
    postAmbushStartedHasSubscriptions() || postAmbushFinishedHasSubscriptions()
  );
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();

  if (!v.room.ambushActive) {
    const ambushActive = room.IsAmbushActive();
    if (ambushActive) {
      v.room.ambushActive = true;

      const ambushType = getAmbushType();
      postAmbushStartedFire(ambushType);
    }
  }

  if (!v.room.ambushDone) {
    const ambushDone = room.IsAmbushDone();
    if (ambushDone) {
      v.room.ambushDone = true;

      const ambushType = getAmbushType();
      postAmbushFinishedFire(ambushType);
    }
  }
}

function getAmbushType(): AmbushType {
  const roomType = getRoomType();
  return roomType === RoomType.BOSS_RUSH
    ? AmbushType.BOSS_RUSH
    : AmbushType.CHALLENGE_ROOM;
}
