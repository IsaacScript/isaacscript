import { game } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "room clear frame";

const v = {
  room: {
    roomClearGameFrame: undefined as int | undefined,
    roomClearRoomFrame: undefined as int | undefined,
  },
};

/** @internal */
export function roomClearFrameInit(mod: ModUpgraded): void {
  saveDataManager("roomClearFrame", v);

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ROOM_CLEAR_CHANGED,
    postRoomClearChangedTrue,
    true,
  );
}

// ModCallbackCustom.POST_ROOM_CLEAR_CHANGED
// true
function postRoomClearChangedTrue() {
  const gameFrameCount = game.GetFrameCount();
  const room = game.GetRoom();
  const roomFrameCount = room.GetFrameCount();

  v.room.roomClearGameFrame = gameFrameCount;
  v.room.roomClearRoomFrame = roomFrameCount;
}

/**
 * Helper function to get the game frame (i.e. `Game.GetFrameCount`) of the last time that this room
 * was cleared. Returns undefined if the room has never been cleared.
 */
export function getRoomClearGameFrame(): int | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  return v.room.roomClearGameFrame;
}

/**
 * Helper function to get the room frame (i.e. `Room.GetFrameCount`) of the last time that this room
 * was cleared. Returns undefined if the room has never been cleared.
 */
export function getRoomClearRoomFrame(): int | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  return v.room.roomClearGameFrame;
}
