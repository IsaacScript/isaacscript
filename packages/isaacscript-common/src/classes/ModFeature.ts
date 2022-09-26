import { ModUpgraded } from "./ModUpgraded";

/**
 * A helper class for a mod that wants to represent its individual features as classes. This is
 * useful if you are using decorators to represent class methods that should be automatically
 * subscribed to callbacks.
 */
export class ModFeature {
  private mod: ModUpgraded;

  constructor(mod: ModUpgraded) {
    this.mod = mod;
  }
}
