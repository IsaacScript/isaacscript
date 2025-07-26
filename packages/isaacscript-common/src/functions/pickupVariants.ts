/* eslint-disable sort-exports/sort-exports */

import { EntityType, PickupVariant } from "isaac-typescript-definitions";

/** For `PickupVariant.HEART` (10). */
export function isHeart(pickup: EntityPickup): pickup is EntityPickupHeart {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.HEART
  );
}

/** For `PickupVariant.COIN` (20). */
export function isCoin(pickup: EntityPickup): pickup is EntityPickupCoin {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.COIN
  );
}

/** For `PickupVariant.KEY` (30). */
export function isKey(pickup: EntityPickup): pickup is EntityPickupKey {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.KEY
  );
}

/** For `PickupVariant.BOMB` (40). */
export function isBombPickup(pickup: EntityPickup): pickup is EntityPickupBomb {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.BOMB
  );
}

/** For `PickupVariant.POOP` (42). */
export function isPoopPickup(pickup: EntityPickup): pickup is EntityPickupPoop {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.POOP
  );
}

/** For `PickupVariant.SACK` (69). */
export function isSack(pickup: EntityPickup): pickup is EntityPickupSack {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.SACK
  );
}

/** For `PickupVariant.PILL` (70). */
export function isPill(pickup: EntityPickup): pickup is EntityPickupPill {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.PILL
  );
}

/** For `PickupVariant.LIL_BATTERY` (90). */
export function isBattery(pickup: EntityPickup): pickup is EntityPickupBattery {
  return (
    pickup.Type === EntityType.PICKUP
    && pickup.Variant === PickupVariant.LIL_BATTERY
  );
}

/** For `PickupVariant.COLLECTIBLE` (100). */
export function isCollectible(
  pickup: EntityPickup,
): pickup is EntityPickupCollectible {
  return (
    pickup.Type === EntityType.PICKUP
    && pickup.Variant === PickupVariant.COLLECTIBLE
  );
}

/** For `PickupVariant.CARD` (300). */
export function isCardPickup(pickup: EntityPickup): pickup is EntityPickupCard {
  return (
    pickup.Type === EntityType.PICKUP && pickup.Variant === PickupVariant.CARD
  );
}

/** For `PickupVariant.TRINKET` (350). */
export function isTrinket(pickup: EntityPickup): pickup is EntityPickupTrinket {
  return (
    pickup.Type === EntityType.PICKUP
    && pickup.Variant === PickupVariant.TRINKET
  );
}
