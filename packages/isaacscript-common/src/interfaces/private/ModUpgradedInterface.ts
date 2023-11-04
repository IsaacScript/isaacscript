import type { Feature } from "../../classes/private/Feature";

/**
 * An interface that represents the `ModUpgraded` class.
 *
 * This is used to prevent circular dependencies.
 *
 * These methods are private on the real `ModUpgraded` class, so the instantiated class must be
 * unsafely type-asserted.
 */
export interface ModUpgradedInterface extends Mod {
  initFeature: (feature: Feature) => void;
  uninitFeature: (feature: Feature) => void;
}
