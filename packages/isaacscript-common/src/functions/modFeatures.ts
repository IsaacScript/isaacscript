import { ModFeature } from "../classes/ModFeature";
import { ModUpgraded } from "../types/ModUpgraded";

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
 * const features = [
 *   MyFeature1,
 *   MyFeature2,
 *   MyFeature3,
 * ] as const;
 * initModFeatures(mod, modFeatures);
 * ```
 *
 * @returns An array of the instantiated features in the same order that the constructors were
 *          passed in.
 */
export function initModFeatures<T extends ReadonlyArray<typeof ModFeature>>(
  mod: ModUpgraded,
  modFeatures: T,
): { [Key in keyof T]: InstanceType<T[Key]> } {
  const instantiatedModFeatures: ModFeature[] = [];

  for (const modFeature of modFeatures) {
    // eslint-disable-next-line new-cap
    const instantiatedModFeature = new modFeature(mod, false);
    instantiatedModFeature.init();

    instantiatedModFeatures.push(instantiatedModFeature);
  }

  return instantiatedModFeatures as { [Key in keyof T]: InstanceType<T[Key]> };
}
