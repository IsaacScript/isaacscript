import type {
  CoinSubType,
  HeartSubType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { CHEST_PICKUP_VARIANTS_SET } from "../core/constants";
import {
  COIN_SUB_TYPE_TO_VALUE,
  DEFAULT_COIN_VALUE,
} from "../objects/coinSubTypeToValue";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { removeEntities } from "./entities";
import { isHeart } from "./pickupVariants";
import { getHearts } from "./pickupsSpecific";

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
  return isChestVariant(pickup.Variant);
}

/**
 * Helper function to test if the provided pickup variant matches one of the various chest variants.
 */
export function isChestVariant(pickupVariant: PickupVariant): boolean {
  return CHEST_PICKUP_VARIANTS_SET.has(pickupVariant);
}

/**
 * Helper function to test if the provided pickup matches one of the various red heart sub-types.
 */
export function isRedHeart(pickup: EntityPickup): boolean {
  return isHeart(pickup) && RED_HEART_SUB_TYPES_SET.has(pickup.SubType);
}

/**
 * Helper function to test if the provided heart sub-type matches one of the various red heart
 * sub-types.
 */
export function isRedHeartSubType(heartSubType: HeartSubType): boolean {
  return RED_HEART_SUB_TYPES_SET.has(heartSubType);
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
