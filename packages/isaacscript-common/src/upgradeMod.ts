/* eslint-disable isaacscript/complete-sentences-line-comments */
// organize-imports-ignore
/* eslint-enable isaacscript/complete-sentences-line-comments */
import { postNewRoomEarlyCallbackInit } from "./callbacks/postNewRoomEarly";
import { ModUpgraded } from "./classes/ModUpgraded";
import { ModCallbackCustom } from "./enums/ModCallbackCustom"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { saveDataManagerInit } from "./features/saveDataManager/main";
import {
  areFeaturesInitialized,
  setFeaturesInitialized,
} from "./featuresInitialized";
import { initCustomCallbacks } from "./initCustomCallbacks";
import { initFeaturesMajor, initFeaturesMinor } from "./initFeatures";
import { patchErrorFunction } from "./patchErrorFunctions";

// Due to https://github.com/microsoft/TypeScript/issues/43869, the @link on line 16 will not work
// without importing ModCallbackCustom. However, eslint thinks it is unused and deletes it. Thus,
// until this bug is fixed, the eslint-disable will likely be necessary.

/**
 * Use this function to enable the {@link ModCallbackCustom custom callbacks} and other optional
 * features provided by `isaacscript-common`.
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
