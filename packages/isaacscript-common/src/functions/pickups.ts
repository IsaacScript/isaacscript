import type {
  BatterySubType,
  BombSubType,
  CoinSubType,
  HeartSubType,
  KeySubType,
  PickupVariant,
  SackSubType,
} from "isaac-typescript-definitions";
import { CHEST_PICKUP_VARIANTS_SET } from "../core/constants";
import { BATTERY_NAMES, DEFAULT_BATTERY_NAME } from "../objects/batteryNames";
import { BOMB_NAMES, DEFAULT_BOMB_NAME } from "../objects/bombNames";
import { CHEST_NAMES, DEFAULT_CHEST_NAME } from "../objects/chestNames";
import { COIN_NAMES, DEFAULT_COIN_NAME } from "../objects/coinNames";
import {
  COIN_SUB_TYPE_TO_VALUE,
  DEFAULT_COIN_VALUE,
} from "../objects/coinSubTypeToValue";
import { DEFAULT_HEART_NAME, HEART_NAMES } from "../objects/heartNames";
import { DEFAULT_KEY_NAME, KEY_NAMES } from "../objects/keyNames";
import { DEFAULT_SACK_NAME, SACK_NAMES } from "../objects/sackNames";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { removeEntities } from "./entities";
import { isHeart } from "./pickupVariants";
import { getHearts } from "./pickupsSpecific";

/**
 * Helper function to get the name of a battery, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided battery sub-type is not valid.
 *
 * This function only works for vanilla battery types.
 *
 * For example, `getBatteryName(BatterySubType.MICRO)` would return "Micro Battery".
 */
export function getBatteryName(batterySubType: BatterySubType): string {
  // Handle modded hearts.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return BATTERY_NAMES[batterySubType] ?? DEFAULT_BATTERY_NAME;
}

/**
 * Helper function to get the name of a bomb, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided bomb sub-type is not valid.
 *
 * This function only works for vanilla bomb types.
 *
 * For example, `getBombName(BombSubType.DOUBLE_PACK)` would return "Double Bomb".
 */
export function getBombName(bombSubType: BombSubType): string {
  // Handle modded bombs.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return BOMB_NAMES[bombSubType] ?? DEFAULT_BOMB_NAME;
}

/**
 * Helper function to get the name of a chest, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the pickup variant was not a chest.
 *
 * This function only works for vanilla chest types.
 *
 * For example, `getChestName(PickupVariant.SPIKED_CHEST)` would return "Spiked Chest".
 */
export function getChestName(pickupVariant: PickupVariant): string {
  const chestNames = CHEST_NAMES as Partial<Record<PickupVariant, string>>;
  return chestNames[pickupVariant] ?? DEFAULT_CHEST_NAME;
}

/**
 * Helper function to get the name of a coin, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided coin sub-type is not valid.
 *
 * This function only works for vanilla chest types.
 *
 * For example, `getCoinName(CoinSubType.DOUBLE_PACK)` would return "Double Penny".
 */
export function getCoinName(coinSubType: CoinSubType): string {
  // Handle modded coins.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return COIN_NAMES[coinSubType] ?? DEFAULT_COIN_NAME;
}

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

/**
 * Helper function to get the name of a heart, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided heart sub-type is not valid.
 *
 * This function only works for vanilla heart types.
 *
 * For example, `getHeartName(HeartSubType.ETERNAL)` would return "Heart (eternal)".
 */
export function getHeartName(heartSubType: HeartSubType): string {
  // Handle modded hearts.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return HEART_NAMES[heartSubType] ?? DEFAULT_HEART_NAME;
}

/**
 * Helper function to get the name of a key, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided key sub-type is not valid.
 *
 * This function only works for vanilla key types.
 *
 * For example, `getKeyName(KeySubType.DOUBLE_PACK)` would return "Key Ring".
 */
export function getKeyName(keySubType: KeySubType): string {
  // Handle modded bombs.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return KEY_NAMES[keySubType] ?? DEFAULT_KEY_NAME;
}

/** Helper function to get all of the red heart pickup entities in the room. */
export function getRedHearts(): EntityPickupHeart[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

/**
 * Helper function to get the name of a sack, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided sack sub-type is not valid.
 *
 * This function only works for vanilla sack types.
 *
 * For example, `getSackName(SackSubType.NORMAL)` would return "Grab Bag".
 */
export function getSackName(sackSubType: SackSubType): string {
  // Handle modded hearts.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return SACK_NAMES[sackSubType] ?? DEFAULT_SACK_NAME;
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
