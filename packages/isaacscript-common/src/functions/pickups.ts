import { CoinSubType } from "isaac-typescript-definitions";
import {
  COIN_SUBTYPE_TO_VALUE,
  DEFAULT_COIN_VALUE,
} from "../objects/coinSubTypeToValue";
import { CHEST_PICKUP_VARIANTS } from "../sets/chestPickupVariantsSet";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { getHearts } from "./pickupsSpecific";
import { isHeart } from "./pickupVariants";

/**
 * Helper function to get the corresponding coin amount from a `CoinSubType`. Returns 1 for modded
 * sub-types.
 */
export function getCoinValue(coinSubType: CoinSubType): int {
  const value = COIN_SUBTYPE_TO_VALUE[coinSubType];
  // Handle modded coin sub-types.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return value === undefined ? DEFAULT_COIN_VALUE : value;
}

/** Helper function to get all of the red heart pickup entities in the room. */
export function getRedHearts(): EntityPickupHeart[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

export function isRedHeart(pickup: EntityPickup): boolean {
  return isHeart(pickup) && RED_HEART_SUB_TYPES_SET.has(pickup.SubType);
}
