import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";

const FEATURE_NAME = "fadeInRemover";
const FADE_IN_SPEED = 1;

let enabled = false;

/** @internal */
export function fadeInRemoverInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
}

// ModCallback.POST_GAME_STARTED (15)
function postGameStarted(_isContinued: boolean) {
  if (enabled) {
    game.Fadein(FADE_IN_SPEED);
  }
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
