import type { CoinSubType } from "isaac-typescript-definitions";
import {
  COIN_SUB_TYPE_TO_VALUE,
  DEFAULT_COIN_VALUE,
} from "../objects/coinSubTypeToValue";
import { CHEST_PICKUP_VARIANTS } from "../sets/chestPickupVariantsSet";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { removeEntities } from "./entities";
import { getHearts } from "./pickupsSpecific";
import { isHeart } from "./pickupVariants";

/**
 * Helper function to get the corresponding coin amount from a `CoinSubType`. Returns 1 for modded
 * sub-types.
 */
export function getCoinValue(coinSubType: CoinSubType): int {
  const value = COIN_SUB_TYPE_TO_VALUE[coinSubType];
  // Handle modded coin sub-types.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return value ?? DEFAULT_COIN_VALUE;
}

/** Helper function to get all of the red heart pickup entities in the room. */
export function getRedHearts(): EntityPickupHeart[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

/** Helper function to test if the provided pickup matches one of the various chest variants. */
export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

/**
 * Helper function to test if the provided pickup matches one of the various red heart sub types.
 */
export function isRedHeart(pickup: EntityPickup): boolean {
  return isHeart(pickup) && RED_HEART_SUB_TYPES_SET.has(pickup.SubType);
}

/**
 * Helper function to remove all of the red heart pickup entities in the room.
 *
 * @param cap Optional. If specified, will only remove the given amount of hearts.
 * @returns The red hearts that were removed.
 */
export function removeAllRedHearts(cap?: int): EntityPickupHeart[] {
  const redHearts = getRedHearts();
  return removeEntities(redHearts, cap);
}
