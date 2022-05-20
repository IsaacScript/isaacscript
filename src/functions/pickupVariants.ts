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

/** For PickupVariant.COLLECTIBLE (100) */
export function isCollectible(
  pickup: EntityPickup,
): pickup is EntityPickupCollectible {
  return pickup.Variant === PickupVariant.COLLECTIBLE;
}

/** For PickupVariant.TRINKET (350) */
export function isTrinket(pickup: EntityPickup): pickup is EntityPickupTrinket {
  return pickup.Variant === PickupVariant.TRINKET;
}
