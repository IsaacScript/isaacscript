import { ModUpgraded } from "../classes/ModUpgraded";
import type { ISCFeature } from "../enums/ISCFeature";
import { patchErrorFunction } from "../patchErrorFunctions";
import { applyShaderCrashFix } from "../shaderCrashFix";
import type { AnyFunction } from "../types/AnyFunction";
import type { ModUpgradedWithFeatures } from "../types/private/ModUpgradedWithFeatures";

type ISCFeatureTuple<T extends readonly ISCFeature[]> =
  ISCFeature extends T["length"]
    ? 'The list of features must be a tuple. Use the "as const" assertion when declaring the array.'
    : T;

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
export function upgradeMod<T extends readonly ISCFeature[] = never[]>(
  modVanilla: Mod,
  features: ISCFeatureTuple<T> = [] as unknown as ISCFeatureTuple<T>,
  debug = false,
  timeThreshold?: float,
): ModUpgradedWithFeatures<T> {
  // First, validate that all of the features exist (for Lua users who don't have type-safety).
  for (const feature of features) {
    const featureType = type(feature);
    if (featureType !== "number") {
      error(
        `Failed to upgrade the mod due to one of the specified features being of type "${featureType}". (All of the features should be numbers represented by the "ISCFeature" enum.)`,
      );
    }
  }

  // Second, validate that all of the features are unique.
  const featureSet = new Set(features as ISCFeature[]);
  if (featureSet.size !== features.length) {
    error(
      'Failed to upgrade the mod since there are two or more of the same features specified in the "features" array. When you pass the array of features to the "upgradeMod" function, all of the elements should be unique.',
    );
  }

  patchErrorFunction();

  const mod = new ModUpgraded(modVanilla, debug, timeThreshold);
  applyShaderCrashFix(mod);
  initOptionalFeatures(mod, features as ISCFeature[]);

  return mod as ModUpgradedWithFeatures<T>;
}

/** Initialize every optional feature that the end-user specified, if any. */
function initOptionalFeatures(
  mod: ModUpgraded,
  features: readonly ISCFeature[],
) {
  for (const feature of features) {
    // We intentionally access the private method here, so we use the string index escape hatch:
    // https://github.com/microsoft/TypeScript/issues/19335
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const exportedMethodTuples = mod["initOptionalFeature"](feature);

    // If the optional feature provides helper functions, attach them to the base mod object. (This
    // provides a convenient API for end-users.)
    const modRecord = mod as unknown as Record<string, AnyFunction>;
    for (const [funcName, func] of exportedMethodTuples) {
      if (modRecord[funcName] !== undefined) {
        error(
          `Failed to upgrade the mod since two or more features share the name function name of "${funcName}". This should never happen, so report this error to the library authors.`,
        );
      }
      modRecord[funcName] = func;
    }
  }
}
