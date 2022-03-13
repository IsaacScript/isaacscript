import { saveDataManager } from "../features/saveDataManager/exports";
import { getDoors } from "../functions/doors";
import {
  postCustomDoorEnterFire,
  postCustomDoorEnterHasSubscriptions,
} from "./subscriptions/postCustomDoorEnter";

const v = {
  run: {
    disableSoundSet: new Set<string>(),
  },
};

/** @internal */
export function postCustomDoorEnterCallbackInit(mod: Mod): void {
  saveDataManager("postCustomDoorEnter", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);
}

function hasSubscriptions() {
  return postCustomDoorEnterHasSubscriptions();
}

// ModCallbacks.MC_POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  const doors = getDoors();
  if (doors.length === 0) {
    return;
  }

  const door = doors[0];
  postCustomDoorEnterFire(door);
}

/**
 * Helper function to spawn a custom muting all sound effects and music.
 *
 * Use this function to set things back to normal after having used [[`disableAllSounds`]].
 *
 */
export function spawnCustomDoor(
  _customDoorType: int,
  _anm2: string,
  _slot: DoorSlot,
): void {
  // TODO
}
