import {
  BatterySubType,
  Card,
  CoinSubType,
  CollectibleType,
  HeartSubType,
  KeySubType,
  PickupVariant,
  PillColor,
  SackSubType,
  TrinketType,
} from "isaac-typescript-definitions";
import { VectorZero } from "../constants";
import {
  COIN_SUBTYPE_TO_VALUE,
  DEFAULT_COIN_VALUE,
} from "../objects/coinSubTypeToValue";
import { CHEST_PICKUP_VARIANTS } from "../sets/chestPickupVariantsSet";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { getPickups, removeAllPickups, spawnPickup } from "./entitySpecific";

/** Helper function to get all of the battery entities in the room. */
export function getBatteries(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.LIL_BATTERY, matchingSubType);
}

/** Helper function to get all of the card entities in the room. */
export function getCards(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.TAROT_CARD, matchingSubType);
}

/**
 * Helper function to get the corresponding coin amount from a `CoinSubType`. Returns 1 for modded
 * sub-types.
 */
export function getCoinValue(coinSubType: CoinSubType): int {
  const value = COIN_SUBTYPE_TO_VALUE[coinSubType];
  return value === undefined ? DEFAULT_COIN_VALUE : value;
}

/** Helper function to get all of the coin pickup entities in the room. */
export function getCoins(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.COIN, matchingSubType);
}

/** Helper function to get all of the collectible entities in the room. */
export function getCollectibles(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.COLLECTIBLE, matchingSubType);
}

/** Helper function to get all of the heart pickup entities in the room. */
export function getHearts(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.HEART, matchingSubType);
}

/** Helper function to get all of the key pickup entities in the room. */
export function getKeys(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.KEY, matchingSubType);
}

/** Helper function to get all of the pill entities in the room. */
export function getPills(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PILL, matchingSubType);
}

/** Helper function to get all of the red heart pickup entities in the room. */
export function getRedHearts(): EntityPickup[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

/** Helper function to get all of the sack (i.e. grab bag) entities in the room. */
export function getSacks(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.GRAB_BAG, matchingSubType);
}

/** Helper function to get all of the trinket entities in the room. */
export function getTrinkets(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.TRINKET, matchingSubType);
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

export function isRedHeart(pickup: EntityPickup): boolean {
  return (
    pickup.Variant === PickupVariant.HEART &&
    RED_HEART_SUB_TYPES_SET.has(pickup.SubType)
  );
}

/**
 * Helper function to remove all of the batteries in the room.
 *
 * @param batterySubType Optional. If specified, will only remove cards that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of cards.
 * @returns True if one or more cards were removed, false otherwise.
 */
export function removeAllBatteries(
  batterySubType?: BatterySubType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.LIL_BATTERY, batterySubType, cap);
}

/**
 * Helper function to remove all of the cards in the room.
 *
 * @param card Optional. If specified, will only remove cards that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of cards.
 * @returns True if one or more cards were removed, false otherwise.
 */
export function removeAllCards(card?: Card | int, cap?: int): boolean {
  return removeAllPickups(PickupVariant.TAROT_CARD, card, cap);
}

/**
 * Helper function to remove all of the coins in the room.
 *
 * @param coinSubType Optional. If specified, will only remove coins that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of coins.
 * @returns True if one or more coins were removed, false otherwise.
 */
export function removeAllCoins(
  coinSubType?: CoinSubType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.COIN, coinSubType, cap);
}

/**
 * Helper function to remove all of the collectibles in the room.
 *
 * @param collectibleType Optional. If specified, will only remove collectibles that match this
 * collectible type.
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 * @returns True if one or more collectibles were removed, false otherwise.
 */
export function removeAllCollectibles(
  collectibleType?: CollectibleType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.COLLECTIBLE, collectibleType, cap);
}

/**
 * Helper function to remove all of the hearts in the room.
 *
 * @param heartSubType Optional. If specified, will only remove hearts that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of hearts.
 * @returns True if one or more hearts were removed, false otherwise.
 */
export function removeAllHearts(
  heartSubType?: HeartSubType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.HEART, heartSubType, cap);
}

/**
 * Helper function to remove all of the keys in the room.
 *
 * @param keySubType Optional. If specified, will only remove keys that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of keys.
 * @returns True if one or more keys were removed, false otherwise.
 */
export function removeAllKeys(
  keySubType?: KeySubType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.KEY, keySubType, cap);
}

/**
 * Helper function to remove all of the pills in the room.
 *
 * @param pillColor Optional. If specified, will only remove pills that match this color.
 * @param cap Optional. If specified, will only remove the given amount of pills.
 * @returns True if one or more pills were removed, false otherwise.
 */
export function removeAllPills(pillColor?: PillColor, cap?: int): boolean {
  return removeAllPickups(PickupVariant.PILL, pillColor, cap);
}

/**
 * Helper function to remove all of the sacks (i.e. grab bags) in the room.
 *
 * @param sackSubType Optional. If specified, will only remove sacks that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of trinkets.
 * @returns True if one or more trinkets were removed, false otherwise.
 */
export function removeAllSacks(
  sackSubType?: SackSubType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.TRINKET, sackSubType, cap);
}

/**
 * Helper function to remove all of the trinkets in the room.
 *
 * @param trinketType Optional. If specified, will only remove trinkets that match this trinket
 * type.
 * @param cap Optional. If specified, will only remove the given amount of trinkets.
 * @returns True if one or more trinkets were removed, false otherwise.
 */
export function removeAllTrinkets(
  trinketType?: TrinketType | int,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.TRINKET, trinketType, cap);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.LIL_BATTERY` (90).
 */
export function spawnBattery(
  subType: BatterySubType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.LIL_BATTERY,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnBatteryWithSeed(
  subType: BatterySubType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnBattery(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TAROT_CARD` (300).
 */
export function spawnCard(
  subType: Card | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.TAROT_CARD,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnCardWithSeed(
  subType: Card | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnCard(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.COIN` (20). */
export function spawnCoin(
  subType: CoinSubType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.COIN,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnCoinWithSeed(
  subType: CoinSubType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnCoin(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.HEART` (10). */
export function spawnHeart(
  subType: HeartSubType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.HEART,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnHeartWithSeed(
  subType: HeartSubType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnHeart(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.KEY` (30). */
export function spawnKey(
  subType: KeySubType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.KEY,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnKeyWithSeed(
  subType: KeySubType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnKey(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.PILL` (70). */
export function spawnPill(
  pillColor: PillColor | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.PILL,
    pillColor,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnPillWithSeed(
  subType: PillColor | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnPill(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.GRAB_BAG` (69).
 */
export function spawnSack(
  subType: SackSubType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.GRAB_BAG,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnSackWithSeed(
  subType: SackSubType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnSack(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TRINKET` (350).
 */
export function spawnTrinket(
  subType: TrinketType | int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    PickupVariant.TRINKET,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

export function spawnTrinketWithSeed(
  subType: TrinketType | int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnTrinket(subType, position, velocity, spawner, seed);
}
