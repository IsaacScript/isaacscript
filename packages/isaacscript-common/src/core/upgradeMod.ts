import { postNewRoomEarlyCallbackInit } from "../callbacks/postNewRoomEarly";
import { ModUpgraded } from "../classes/ModUpgraded";
import { Feature } from "../classes/private/Feature";
import { ISCFeature } from "../enums/ISCFeature";
import { ISCFeatureToClass } from "../features";
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
import { LowercaseKeys } from "../types/LowercaseKeys";
import { UnionToIntersection } from "../types/UnionToIntersection";

/**
 * By specifying one or more optional features, end-users will get a version of `ModUpgraded` that
 * has extra methods corresponding to the features.
 *
 * We have to explicitly account for the empty array case, since `never` will cause mess up the
 * union.
 */
type ModUpgradedWithFeatures<T extends ISCFeature> = [T] extends [never]
  ? ModUpgraded
  : Omit<
      ModUpgraded & UnionToIntersection<ISCFeatureToClass[T]>,
      KeysToScrubFromModClass
    >;

type KeysToScrubFromModClass = keyof Feature | LowercaseKeys<ModUpgraded>;

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
 * @param features Optional. An array containing the optional standard library features that you
 *                 want to enable, if any. Default is an empty array.
 * @param debug Optional. Whether to log additional output when a callback is fired. Default is
 *              false.
 * @param timeThreshold Optional. If provided, will only log callbacks that take longer than the
 *                      specified number of seconds (if the "--luadebug" launch flag is turned on)
 *                      or milliseconds (if the "--luadebug" launch flag is turned off).
 * @returns The upgraded mod object.
 */
export function upgradeMod<T extends ISCFeature = never>(
  modVanilla: Mod,
  features: T[] = [],
  debug = false,
  timeThreshold?: float,
): ModUpgradedWithFeatures<T> {
  const mod = new ModUpgraded(modVanilla, debug, timeThreshold);

  if (areFeaturesInitialized()) {
    error(
      "Failed to upgrade the mod since a mod has already been initialized. (You can only upgrade one mod per IsaacScript project.)",
    );
  }
  setFeaturesInitialized();

  patchErrorFunction();
  loadShaderCrashFix(modVanilla);

  legacyInit(mod); // TODO: remove

  for (const feature of features) {
    mod.initOptionalFeature(feature);
    // TODO: add decorated public methods
  }

  return mod as ModUpgradedWithFeatures<T>;
}

/** Initialize features in the old way. */
function legacyInit(mod: ModUpgraded) {
  // We initialize the `POST_NEW_ROOM_EARLY` callback first since it is used by the save data
  // manager.
  postNewRoomEarlyCallbackInit(mod);

  // We initialized the save data manager second since it is used by the other custom callbacks and
  // features. We can't pass the instantiated `ModUpgraded` class to the "saveDataManagerInit"
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
