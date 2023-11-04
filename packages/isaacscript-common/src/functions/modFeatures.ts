import type { ModFeature } from "../classes/ModFeature";
import type { ModUpgraded } from "../classes/ModUpgraded";

/**
 * Helper function to instantiate an array of mod features all at once. Use this function if your
 * mod uses the pattern of expressing mod features as `ModFeature` classes.
 *
 * If your feature classes have `v` variables, then this function will successfully register them
 * with the save data manager.
 *
 * For example:
 *
 * ```ts
 * const MOD_FEATURES = [
 *   MyFeature1,
 *   MyFeature2,
 *   MyFeature3,
 * ] as const;
 * initModFeatures(mod, MOD_FEATURES);
 * ```
 *
 * @param mod The upgraded mod to use.
 * @param modFeatures An array of the feature classes that you have in your mod.
 * @param init Optional. Whether to automatically add the callbacks on the feature. Defaults to
 *             true.
 * @returns An array of the instantiated features in the same order that the constructors were
 *          passed in. (In most cases, you probably won't need the returned array.)
 */
export function initModFeatures<T extends ReadonlyArray<typeof ModFeature>>(
  mod: ModUpgraded,
  modFeatures: T,
  init = true,
): { [K in keyof T]: InstanceType<T[K]> } {
  const instantiatedModFeatures: ModFeature[] = [];

  for (const modFeature of modFeatures) {
    // eslint-disable-next-line new-cap
    const instantiatedModFeature = new modFeature(mod, false);
    instantiatedModFeature.init(init);

    instantiatedModFeatures.push(instantiatedModFeature);
  }

  return instantiatedModFeatures as { [K in keyof T]: InstanceType<T[K]> };
}
