import { ButtonAction, ModCallback } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import {
  isActionTriggeredOnAnyInput,
  isModifierKeyPressed,
} from "../functions/input";
import { restart } from "../functions/run";

const FEATURE_NAME = "fast reset";

let enabled = false;

/** @internal */
export function fastResetInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!enabled) {
    return;
  }

  checkResetInput();
}

// Check for fast-reset inputs
function checkResetInput() {
  const isPaused = game.IsPaused();

  // Disable the fast-reset feature if the console is open. (This will also disable the feature when
  // the game is paused, but that's okay as well.)
  if (isPaused) {
    return;
  }

  // Disable the fast-reset feature if the custom console is open
  if (AwaitingTextInput) {
    return;
  }

  // Don't fast-reset if any modifiers are pressed
  if (isModifierKeyPressed()) {
    return;
  }

  // Check to see if the player has pressed the restart input. (We check all inputs instead of
  // `player.ControllerIndex` because a controller player might be using the keyboard to reset.)
  if (isActionTriggeredOnAnyInput(ButtonAction.RESTART)) {
    restart();
  }
}

/**
 * Enables the fast-reset feature, which allows you to restart the game instantaneously. If this
 * behavior is desired, call this function once at the beginning of your mod.
 *
 * This is useful for debugging, when you are resetting the game often.
 *
 * You can disable the fast-reset feature with the `disableFastReset` function.
 */
export function enableFastReset(): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  enabled = true;
}

/**
 * Disables the fast-reset feature. Only useful if you have previously called the `enableFastReset`
 * function.
 */
export function disableFastReset(): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  enabled = false;
}
