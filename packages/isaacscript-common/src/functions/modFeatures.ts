import { ModFeature } from "../classes/ModFeature";
import { ModUpgraded } from "../types/ModUpgraded";

/**
 * Helper function to instantiate an array of mod features all at once. Use this function if your
 * mod uses the pattern of expressing mod features as `ModFeature` classes.
 */
export function initModFeatures(
  mod: ModUpgraded,
  modFeatures: Array<typeof ModFeature>,
): void {
  for (const modFeature of modFeatures) {
    // eslint-disable-next-line no-new, new-cap
    new modFeature(mod);
  }
}
