import { postNewRoomEarlyCallbackInit } from "./callbacks/postNewRoomEarly";
import { ModUpgraded } from "./classes/ModUpgraded";
import { saveDataManagerInit } from "./features/saveDataManager/main";
import {
  areFeaturesInitialized,
  setFeaturesInitialized,
} from "./featuresInitialized";
import { initCustomCallbacks } from "./initCustomCallbacks";
import { initFeaturesMajor, initFeaturesMinor } from "./initFeatures";
import { patchErrorFunction } from "./patchErrorFunctions";

/**
 * Use this function to enable the custom features and callbacks provided by `isaacscript-common`.
 *
 * Example:
 * ```ts
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 *
 * // Subscribe to vanilla callbacks
 * mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
 *
 * // Subscribe to custom callbacks
 * mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_PICKUP, postItemPickup);
 * ```
 *
 * For a list of all custom callbacks, check out the
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks).
 *
 * @param modVanilla The mod object returned by the `RegisterMod` function.
 * @returns The upgraded mod object.
 */
export function upgradeMod(modVanilla: Mod): ModUpgraded {
  patchErrorFunction();

  const mod = new ModUpgraded(modVanilla);

  if (!areFeaturesInitialized()) {
    setFeaturesInitialized();

    // We initialize the PostNewRoomEarly callback first since it is used by the save data manager.
    postNewRoomEarlyCallbackInit(mod);

    // We initialized the save data manager second since it is used by the other custom callbacks
    // and features.
    saveDataManagerInit(mod);

    // We initialize custom callbacks next since some features use custom callbacks.
    initCustomCallbacks(mod);

    initFeaturesMajor(mod);
    initFeaturesMinor(mod);
  }

  return mod;
}
