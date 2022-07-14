import {
  ButtonAction,
  CollectibleType,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { logError } from "../functions/log";
import { useActiveItemTemp } from "../functions/player";
import { disableAllInputsExceptFor, enableAllInputs } from "./disableInputs";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "pause";

const v = {
  run: {
    isPseudoPaused: false,
    shouldUnpause: false,
  },
};

/** @internal */
export function pauseInit(mod: Mod): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1

  mod.AddCallback(
    ModCallback.INPUT_ACTION,
    inputActionGetActionValue,
    InputHook.GET_ACTION_VALUE,
  ); // 13
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!v.run.isPseudoPaused) {
    return;
  }

  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.PAUSE);
}

// ModCallback.INPUT_ACTION (13)
// InputHook.GET_ACTION_VALUE (2)
function inputActionGetActionValue(
  _entity: Entity | undefined,
  _inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {
  if (buttonAction !== ButtonAction.SHOOT_RIGHT) {
    return;
  }

  if (!v.run.shouldUnpause) {
    return;
  }
  v.run.shouldUnpause = false;

  // Returning a value of 1 for a single frame will be enough for the game to register an unpause
  // but not enough for a tear to actually be fired.
  return 1;
}

/**
 * Helper function to emulate what happens when the player pauses the game. Use the `unpause`
 * function to return things back to normal.
 *
 * Under the hood, this function:
 * - uses the Pause collectible on every game frame
 * - disables any player inputs (except for `ButtonAction.MENU_CONFIRM`)
 */
export function pause(): void {
  if (v.run.isPseudoPaused) {
    logError(
      "Failed to pseudo-pause the game, since it was already pseudo-paused.",
    );
    return;
  }
  v.run.isPseudoPaused = true;

  const whitelist = new Set([ButtonAction.MENU_CONFIRM]);
  disableAllInputsExceptFor(FEATURE_NAME, whitelist);
}

/** Helper function to put things back to normal after the `pause` function was used. */
export function unpause(): void {
  if (!v.run.isPseudoPaused) {
    logError(
      "Failed to pseudo-unpause the game, since it was not already pseudo-paused.",
    );
    return;
  }
  v.run.isPseudoPaused = false;

  enableAllInputs(FEATURE_NAME);
  v.run.shouldUnpause = true;
}
