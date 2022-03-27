import { VectorZero } from "../constants";
import { CHEST_PICKUP_VARIANTS } from "../sets/chestPickupVariantsSet";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { getPickups, spawnPickup } from "./entitySpecific";

export function getCoins(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_COIN, matchingSubType);
}

export function getHearts(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_HEART, matchingSubType);
}

export function getKeys(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_KEY, matchingSubType);
}

export function getRedHearts(): EntityPickup[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

export function isRedHeart(pickup: EntityPickup): boolean {
  return (
    pickup.Variant === PickupVariant.PICKUP_HEART &&
    RED_HEART_SUB_TYPES_SET.has(pickup.SubType)
  );
}

/**
 * Helper function to spawn a `EntityType.ENTITY_PICKUP` (5) with variant
 * `PickupVariant.PICKUP_COIN` (20).
 */
export function spawnCoin(
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.PICKUP_COIN,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnCoinWithSeed(
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnCoin(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.ENTITY_PICKUP` (5) with variant
 * `PickupVariant.PICKUP_HEART` (10).
 */
export function spawnHeart(
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.PICKUP_HEART,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnHeartWithSeed(
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnHeart(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.ENTITY_PICKUP` (5) with variant
 * `PickupVariant.PICKUP_KEY` (30).
 */
export function spawnKey(
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.PICKUP_KEY,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnKeyWithSeed(
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnKey(subType, position, velocity, spawner, seed);
}
