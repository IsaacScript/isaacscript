import { saveDataManager } from "../features/saveDataManager/exports";

const v = {
  run: {
    disableSoundSet: new Set<string>(),
  },
};

/** @internal */
export function postCustomDoorEnterCallbackInit(mod: Mod): void {
  saveDataManager("disableSounds", v);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);
}

function postRender() {}

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
