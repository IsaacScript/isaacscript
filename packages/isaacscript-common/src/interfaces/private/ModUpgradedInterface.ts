import { Feature } from "../../classes/private/Feature";

/**
 * An interface that represents the `ModUpgraded` class.
 *
 * These methods are private on the real `ModUpgraded` class, so the instantiated class must be
 * unsafely type-asserted.
 */
export interface ModUpgradedInterface extends Mod {
  initFeature(feature: Feature): void;
  uninitFeature(feature: Feature): void;
}
