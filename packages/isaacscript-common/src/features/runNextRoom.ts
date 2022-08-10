import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { emptyArray } from "../functions/array";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "runNextRoom";

const v = {
  run: {
    queuedFunctions: [] as Array<() => void>,
  },
};

/** @internal */
export function runNextRoomInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v, false); // Functions are not serializable.

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  for (const func of v.run.queuedFunctions) {
    func();
  }

  emptyArray(v.run.queuedFunctions);
}

/**
 * Supply a function to run on the next `POST_NEW_ROOM` callback.
 *
 * Note that this function will not handle saving and quitting. If a player saving and quitting
 * before the deferred function fires would cause a bug in your mod, then you should handle deferred
 * functions manually using serializable data.
 */
export function runNextRoom(func: () => void): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  v.run.queuedFunctions.push(func);
}
