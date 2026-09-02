import type { Feature } from "../../classes/private/Feature";

/**
 * An interface that represents the `ModUpgraded` class.
 *
 * This is used to prevent circular dependencies.
 *
 * These methods are private on the real `ModUpgraded` class, so the instantiated class must be
 * unsafely type-asserted.
 */
// eslint-disable-next-line complete/type-declaration-immutability
export interface ModUpgradedInterface extends Mod {
  readonly initFeature: (feature: Feature) => void;
  readonly uninitFeature: (feature: Feature) => void;
}
