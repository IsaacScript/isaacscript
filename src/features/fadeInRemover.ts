import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "fade-in remover";
const FADE_IN_SPEED = 1;

let enabled = false;

const v = {
  run: {
    removedFadeIn: false,
  },
};

/** @internal */
export function fadeInRemoverInit(mod: Mod): void {
  saveDataManager("fadeInRemover", v, () => false);

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function postRender() {
  if (!enabled) {
    return;
  }

  if (shouldRemoveFadeIn()) {
    v.run.removedFadeIn = true;
    game.Fadein(FADE_IN_SPEED);
  }
}

function shouldRemoveFadeIn() {
  const gameFrameCount = game.GetFrameCount();
  return !v.run.removedFadeIn && gameFrameCount === 0;
}

/**
 * Removes the fade-in that occurs at the beginning of a run. If this behavior is desired, call this
 * function once at the beginning of your mod.
 *
 * This is useful for debugging, when you are resetting the game often.
 *
 * You can restore the vanilla behavior with the `restoreFadeIn` function.
 */
export function removeFadeIn(): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  enabled = true;
}

/**
 * Disables the fade-in remover. Only useful if you have previously called the `removeFadeIn`
 * function.
 */
export function restoreFadeIn(): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  enabled = false;
}
