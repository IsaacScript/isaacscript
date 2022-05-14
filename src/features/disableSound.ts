import { ModCallback } from "isaac-typescript-definitions";
import { musicManager } from "../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { stopAllSoundEffects } from "../functions/sound";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "sound disabler";

let musicWasEnabled = false;

const v = {
  run: {
    disableSoundSet: new Set<string>(),
  },
};

/** @internal */
export function disableSoundsInit(mod: Mod): void {
  saveDataManager("disableSounds", v);

  mod.AddCallback(ModCallback.POST_RENDER, postRender);
}

// ModCallback.POST_RENDER (2)
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
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (!v.run.disableSoundSet.has(key)) {
    return;
  }
  v.run.disableSoundSet.delete(key);

  if (v.run.disableSoundSet.size === 0 && musicWasEnabled) {
    musicManager.Enable();
  }

  // Stop all sound effects that were initialized prior to enabling sounds (in case there was a
  // sound played played previously on this render frame).
  stopAllSoundEffects();
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
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (v.run.disableSoundSet.size === 0) {
    musicWasEnabled = musicManager.IsEnabled();
  }

  v.run.disableSoundSet.add(key);

  // Stop all sound effects that were initialized prior to disabling sounds
  stopAllSoundEffects();
}
