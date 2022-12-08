import { ModUpgradedBase } from "../classes/ModUpgradedBase";
import { ISCFeature } from "../enums/ISCFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { patchErrorFunction } from "../patchErrorFunctions";
import { applyShaderCrashFix } from "../shaderCrashFix";
import { AnyFunction } from "../types/AnyFunction";
import { ModUpgraded } from "../types/ModUpgraded";

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
 * @param customCallbacksUsed Optional. An array containing the custom callbacks that you will be
 *                            subscribing to after you upgrade your mod. Specifying this will
 *                            immediately initialize the callbacks (as opposed to lazy-initializing
 *                            them when you first subscribe to the callback). This is only necessary
 *                            if you the order of callback firing is important for your mod. (For
 *                            example, you may want the `POST_NEW_ROOM` part of the
 *                            `POST_GRID_ENTITY_INIT` callback to fire before your own
 *                            `POST_NEW_ROOM` callbacks.)
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
  customCallbacksUsed: ModCallbackCustom[] | readonly ModCallbackCustom[] = [],
  debug = false,
  timeThreshold?: float,
): ModUpgraded<T> {
  // First, validate that all of the features exist (for Lua users who don't have type-safety).
  for (const feature of features) {
    const featureType = type(feature);
    if (featureType !== "number") {
      error(
        `Failed to upgrade the mod due to one of the specified features being of type "${featureType}". (All of the features should be numbers represented by the "ISCFeature" enum.)`,
      );
    }
  }

  patchErrorFunction();

  const mod = new ModUpgradedBase(modVanilla, debug, timeThreshold);
  applyShaderCrashFix(mod);
  initOptionalFeatures(mod, features as ISCFeature[]);
  initCallbacksEarly(mod, customCallbacksUsed);

  return mod as ModUpgraded<T>;
}

/** Initialize every optional feature that the end-user specified. */
function initOptionalFeatures(mod: ModUpgradedBase, features: ISCFeature[]) {
  for (const feature of features) {
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
}

function initCallbacksEarly(
  mod: ModUpgradedBase,
  callbacks: ModCallbackCustom[] | readonly ModCallbackCustom[],
) {
  for (const modCallbackCustom of callbacks) {
    // We intentionally access the private method here, so we use the string index escape hatch:
    // https://github.com/microsoft/TypeScript/issues/19335
    // eslint-disable-next-line @typescript-eslint/dot-notation
    mod["initCustomCallbackEarly"](modCallbackCustom);
  }
}
