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
import { isHeart } from "./pickupVariants";

/** Helper function to get all of the battery entities in the room. */
export function getBatteries(matchingSubType = -1): EntityPickupBattery[] {
  return getPickups(
    PickupVariant.LIL_BATTERY,
    matchingSubType,
  ) as EntityPickupBattery[];
}

/** Helper function to get all of the card entities in the room. */
export function getCards(matchingSubType = -1): EntityPickupCard[] {
  return getPickups(
    PickupVariant.TAROT_CARD,
    matchingSubType,
  ) as EntityPickupCard[];
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
export function getCoins(matchingSubType = -1): EntityPickupCoin[] {
  return getPickups(PickupVariant.COIN, matchingSubType) as EntityPickupCoin[];
}

/** Helper function to get all of the collectible entities in the room. */
export function getCollectibles(
  matchingSubType = -1,
): EntityPickupCollectible[] {
  return getPickups(
    PickupVariant.COLLECTIBLE,
    matchingSubType,
  ) as EntityPickupCollectible[];
}

/** Helper function to get all of the heart pickup entities in the room. */
export function getHearts(matchingSubType = -1): EntityPickupHeart[] {
  return getPickups(
    PickupVariant.HEART,
    matchingSubType,
  ) as EntityPickupHeart[];
}

/** Helper function to get all of the key pickup entities in the room. */
export function getKeys(matchingSubType = -1): EntityPickupKey[] {
  return getPickups(PickupVariant.KEY, matchingSubType) as EntityPickupKey[];
}

/** Helper function to get all of the pill entities in the room. */
export function getPills(matchingSubType = -1): EntityPickupPill[] {
  return getPickups(PickupVariant.PILL, matchingSubType) as EntityPickupPill[];
}

/** Helper function to get all of the red heart pickup entities in the room. */
export function getRedHearts(): EntityPickupHeart[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

/** Helper function to get all of the sack (i.e. grab bag) entities in the room. */
export function getSacks(matchingSubType = -1): EntityPickupSack[] {
  return getPickups(PickupVariant.SACK, matchingSubType) as EntityPickupSack[];
}

/** Helper function to get all of the trinket entities in the room. */
export function getTrinkets(matchingSubType = -1): EntityPickupTrinket[] {
  return getPickups(
    PickupVariant.TRINKET,
    matchingSubType,
  ) as EntityPickupTrinket[];
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

export function isRedHeart(pickup: EntityPickup): boolean {
  return isHeart(pickup) && RED_HEART_SUB_TYPES_SET.has(pickup.SubType);
}

/**
 * Helper function to remove all of the batteries in the room.
 *
 * @param batterySubType Optional. If specified, will only remove cards that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of cards.
 * @returns True if one or more cards were removed, false otherwise.
 */
export function removeAllBatteries(
  batterySubType?: BatterySubType,
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
export function removeAllCards(card?: Card, cap?: int): boolean {
  return removeAllPickups(PickupVariant.TAROT_CARD, card, cap);
}

/**
 * Helper function to remove all of the coins in the room.
 *
 * @param coinSubType Optional. If specified, will only remove coins that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of coins.
 * @returns True if one or more coins were removed, false otherwise.
 */
export function removeAllCoins(coinSubType?: CoinSubType, cap?: int): boolean {
  return removeAllPickups(PickupVariant.COIN, coinSubType, cap);
}

/**
 * Helper function to remove all of the collectibles in the room.
 *
 * @param collectibleType Optional. If specified, will only remove collectibles that match this
 *                        collectible type.
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 * @returns True if one or more collectibles were removed, false otherwise.
 */
export function removeAllCollectibles(
  collectibleType?: CollectibleType,
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
  heartSubType?: HeartSubType,
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
export function removeAllKeys(keySubType?: KeySubType, cap?: int): boolean {
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
export function removeAllSacks(sackSubType?: SackSubType, cap?: int): boolean {
  return removeAllPickups(PickupVariant.TRINKET, sackSubType, cap);
}

/**
 * Helper function to remove all of the trinkets in the room.
 *
 * @param trinketType Optional. If specified, will only remove trinkets that match this trinket
 *                    type.
 * @param cap Optional. If specified, will only remove the given amount of trinkets.
 * @returns True if one or more trinkets were removed, false otherwise.
 */
export function removeAllTrinkets(
  trinketType?: TrinketType,
  cap?: int,
): boolean {
  return removeAllPickups(PickupVariant.TRINKET, trinketType, cap);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.LIL_BATTERY` (90).
 */
export function spawnBattery(
  subType: BatterySubType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupBattery {
  return spawnPickup(
    PickupVariant.LIL_BATTERY,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupBattery;
}

export function spawnBatteryWithSeed(
  subType: BatterySubType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupBattery {
  return spawnBattery(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TAROT_CARD` (300).
 */
export function spawnCard(
  subType: Card,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupCard {
  return spawnPickup(
    PickupVariant.TAROT_CARD,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupCard;
}

export function spawnCardWithSeed(
  subType: Card,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupCard {
  return spawnCard(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.COIN` (20). */
export function spawnCoin(
  subType: CoinSubType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupCoin {
  return spawnPickup(
    PickupVariant.COIN,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupCoin;
}

export function spawnCoinWithSeed(
  subType: CoinSubType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupCoin {
  return spawnCoin(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.HEART` (10). */
export function spawnHeart(
  subType: HeartSubType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupHeart {
  return spawnPickup(
    PickupVariant.HEART,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupHeart;
}

export function spawnHeartWithSeed(
  subType: HeartSubType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupHeart {
  return spawnHeart(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.KEY` (30). */
export function spawnKey(
  subType: KeySubType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupKey {
  return spawnPickup(
    PickupVariant.KEY,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupKey;
}

export function spawnKeyWithSeed(
  subType: KeySubType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupKey {
  return spawnKey(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.PILL` (70). */
export function spawnPill(
  pillColor: PillColor,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupPill {
  return spawnPickup(
    PickupVariant.PILL,
    pillColor,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupPill;
}

export function spawnPillWithSeed(
  subType: PillColor,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupPill {
  return spawnPill(subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.SACK` (69). */
export function spawnSack(
  subType: SackSubType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupSack {
  return spawnPickup(
    PickupVariant.SACK,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupSack;
}

export function spawnSackWithSeed(
  subType: SackSubType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupSack {
  return spawnSack(subType, position, velocity, spawner, seed);
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TRINKET` (350).
 */
export function spawnTrinket(
  subType: TrinketType,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickupTrinket {
  return spawnPickup(
    PickupVariant.TRINKET,
    subType,
    position,
    velocity,
    spawner,
    seed,
  ) as EntityPickupTrinket;
}

export function spawnTrinketWithSeed(
  subType: TrinketType,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupTrinket {
  return spawnTrinket(subType, position, velocity, spawner, seed);
}
