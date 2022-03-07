import { getUpgradeErrorMsg } from "../errors";
import { stopAllSoundEffects } from "../functions/sound";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "sound disabler";

let initialized = false;
let musicWasEnabled = false;

const v = {
  run: {
    disableSoundSet: new Set<string>(),
  },
};

/** @internal */
export function disableSoundsInit(mod: Mod): void {
  initialized = true;
  saveDataManager("disableSounds", v);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);
}

// ModCallbacks.MC_POST_RENDER (2)
function postRender() {
  if (v.run.disableSoundSet.size === 0) {
    return;
  }

  stopAllSoundEffects();
}

/**
 * Helper function to stop muting all sound effects and music.
 *
 * Use this function to set things back to normal after having used [[`disableAllSounds`]].
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function enableAllSound(key: string): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  if (!v.run.disableSoundSet.has(key)) {
    return;
  }
  v.run.disableSoundSet.delete(key);

  if (v.run.disableSoundSet.size === 0 && musicWasEnabled) {
    const musicManager = MusicManager();
    musicManager.Enable();
  }
}

/**
 * Helper function to disable all sound effects and music (by constantly musting them).
 *
 * Use the [[`enableAllSounds`]] helper function to set things back to normal.
 *
 * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
 * that multiple mod features can work in tandem.
 */
export function disableAllSound(key: string): void {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  if (v.run.disableSoundSet.size === 0) {
    const musicManager = MusicManager();
    musicWasEnabled = musicManager.IsEnabled();
  }

  v.run.disableSoundSet.add(key);
}
