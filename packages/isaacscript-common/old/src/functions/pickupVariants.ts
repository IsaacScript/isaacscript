/* eslint-disable sort-exports/sort-exports */

import { PickupVariant } from "isaac-typescript-definitions";

/** For PickupVariant.HEART (10) */
export function isHeart(pickup: EntityPickup): pickup is EntityPickupHeart {
  return pickup.Variant === PickupVariant.HEART;
}

/** For PickupVariant.COIN (20) */
export function isCoin(pickup: EntityPickup): pickup is EntityPickupCoin {
  return pickup.Variant === PickupVariant.COIN;
}

/** For PickupVariant.KEY (30) */
export function isKey(pickup: EntityPickup): pickup is EntityPickupKey {
  return pickup.Variant === PickupVariant.KEY;
}

/** For PickupVariant.BOMB (40) */
export function isBomb(pickup: EntityPickup): pickup is EntityPickupBomb {
  return pickup.Variant === PickupVariant.BOMB;
}

/** For PickupVariant.POOP (42) */
export function isPoop(pickup: EntityPickup): pickup is EntityPickupPoop {
  return pickup.Variant === PickupVariant.POOP;
}

/** For PickupVariant.POOP (42) */
export function isSack(pickup: EntityPickup): pickup is EntityPickupSack {
  return pickup.Variant === PickupVariant.SACK;
}

/** For PickupVariant.PILL (70) */
export function isPill(pickup: EntityPickup): pickup is EntityPickupPill {
  return pickup.Variant === PickupVariant.PILL;
}

/** For PickupVariant.LIL_BATTERY (90) */
export function isBattery(pickup: EntityPickup): pickup is EntityPickupBattery {
  return pickup.Variant === PickupVariant.LIL_BATTERY;
}

/** For PickupVariant.COLLECTIBLE (100) */
export function isCollectible(
  pickup: EntityPickup,
): pickup is EntityPickupCollectible {
  return pickup.Variant === PickupVariant.COLLECTIBLE;
}

/** For PickupVariant.TAROT_CARD (300) */
export function isCardPickup(pickup: EntityPickup): pickup is EntityPickupCard {
  return pickup.Variant === PickupVariant.TAROT_CARD;
}

/** For PickupVariant.TRINKET (350) */
export function isTrinket(pickup: EntityPickup): pickup is EntityPickupTrinket {
  return pickup.Variant === PickupVariant.TRINKET;
}
