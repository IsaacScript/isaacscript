import { postNewRoomEarlyCallbackInit } from "../callbacks/postNewRoomEarly";
import { ModUpgraded } from "../classes/ModUpgraded";
import {
  saveDataManagerInit,
  SAVE_DATA_MANAGER_CALLBACKS,
  SAVE_DATA_MANAGER_CUSTOM_CALLBACKS,
} from "../features/saveDataManager/main";
import {
  areFeaturesInitialized,
  setFeaturesInitialized,
} from "../featuresInitialized";
import { initCustomCallbacks } from "../initCustomCallbacks";
import { initFeatures } from "../initFeatures";
import { patchErrorFunction } from "../patchErrorFunctions";
import { loadShaderCrashFix } from "../shaderCrashFix";

/**
 * Use this function to enable the custom callbacks and other optional features provided by
 * `isaacscript-common`.
 *
 * For example:
 *
 * ```ts
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 *
 * // Subscribe to vanilla callbacks.
 * mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
 *
 * // Subscribe to custom callbacks.
 * mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, postItemPickup);
 * ```
 *
 * @param modVanilla The mod object returned by the `RegisterMod` function.
 * @param debug Optional. Whether to log additional output when a callback is fired. Default is
 *              false.
 * @param timeThreshold Optional. If provided, will only log callbacks that take longer than the
 *                      specified number of seconds (if the "--luadebug" launch flag is turned on)
 *                      or milliseconds (if the "--luadebug" launch flag is turned off).
 * @returns The upgraded mod object.
 */
export function upgradeMod(
  modVanilla: Mod,
  debug = false,
  timeThreshold?: float,
): ModUpgraded {
  const mod = new ModUpgraded(modVanilla, debug, timeThreshold);

  if (!areFeaturesInitialized()) {
    setFeaturesInitialized();

    patchErrorFunction();
    loadShaderCrashFix(modVanilla);

    // We initialize the `POST_NEW_ROOM_EARLY` callback first since it is used by the save data
    // manager.
    postNewRoomEarlyCallbackInit(mod);

    // We initialized the save data manager second since it is used by the other custom callbacks
    // and features. We can't pass the instantiated `ModUpgraded` class to the "saveDataManagerInit"
    // function since it causes a circular dependency. Thus, we emulate the initialization process
    // that the `ModUpgraded.AddCallbackCustom` method uses.
    saveDataManagerInit(mod);
    for (const callbackTuple of SAVE_DATA_MANAGER_CALLBACKS) {
      const [modCallback, callbackArgs] = callbackTuple;
      mod.AddCallback(modCallback, ...callbackArgs);
    }
    for (const callbackTuple of SAVE_DATA_MANAGER_CUSTOM_CALLBACKS) {
      const [modCallback, callbackArgs] = callbackTuple;
      mod.AddCallbackCustom(modCallback, ...callbackArgs);
    }

    // We initialize custom callbacks next since some features use custom callbacks.
    initCustomCallbacks(mod);

    initFeatures(mod);
  }

  return mod;
}
