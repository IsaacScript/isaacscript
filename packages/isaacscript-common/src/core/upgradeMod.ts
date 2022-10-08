import { ModUpgraded } from "../classes/ModUpgraded";
import { ISCFeature } from "../enums/ISCFeature";
import { patchErrorFunction } from "../patchErrorFunctions";
import { AnyFunction } from "../types/AnyFunction";
import { ModUpgradedWithFeatures } from "../types/ModUpgradedWithFeatures";

type ISCFeatureTuple<T extends readonly ISCFeature[]> =
  ISCFeature extends T["length"]
    ? 'The list of features must be a tuple. Use the "as const" assertion when declaring the array.'
    : T;

/**
 * Some features are very light in that they do not require any callback code to run besides simply
 * checking if a run has been booted at least one time.
 *
 * The crash fix is also very light, so it is always included as a quality of life feature.
 */
const MANDATORY_FEATURES = [
  ISCFeature.FLYING_DETECTION,
  ISCFeature.ITEM_POOL_DETECTION,
  ISCFeature.MODDED_ELEMENT_DETECTION,
  ISCFeature.MODDED_ELEMENT_SETS,
  ISCFeature.SHADER_CRASH_FIX,
  ISCFeature.SPAWN_ALT_ROCK_REWARDS,
] as const;

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
export function upgradeMod<T extends readonly ISCFeature[]>(
  modVanilla: Mod,
  features: ISCFeatureTuple<T>,
  debug = false,
  timeThreshold?: float,
): ModUpgradedWithFeatures<T> {
  patchErrorFunction();

  const mod = new ModUpgraded(modVanilla, debug, timeThreshold);

  const iscFeatures = features as ISCFeature[];

  // All upgraded mods should use some basic features. (See the documentation for
  // `MANDATORY_FEATURES`.)
  for (const mandatoryFeature of MANDATORY_FEATURES) {
    if (!iscFeatures.includes(mandatoryFeature)) {
      iscFeatures.unshift(mandatoryFeature);
    }
  }

  // Initialize every optional feature that the end-user specified.
  for (const feature of iscFeatures) {
    // We intentionally access the private method here, so we use the string index escape hatch:
    // https://github.com/microsoft/TypeScript/issues/19335
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const exportedMethodTuples = mod["initOptionalFeature"](feature);

    // If the optional feature provides helper functions, attach them to the base mod object. (This
    // provides a convenient API for end-users.)
    const modRecord = mod as unknown as Record<string, AnyFunction>;
    for (const [funcName, func] of exportedMethodTuples) {
      modRecord[funcName] = func;
    }
  }

  return mod as ModUpgradedWithFeatures<T>;
}
