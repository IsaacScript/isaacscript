import type {
  BatterySubType,
  BombSubType,
  CardType,
  CoinSubType,
  CollectibleType,
  HeartSubType,
  KeySubType,
  PillColor,
  SackSubType,
  TrinketType,
} from "isaac-typescript-definitions";
import { PickupVariant } from "isaac-typescript-definitions";
import { CHEST_PICKUP_VARIANTS, VectorZero } from "../core/constants";
import { removeEntities } from "./entities";
import { getPickups, removeAllPickups, spawnPickup } from "./entitiesSpecific";

/**
 * Helper function to get all of the battery entities in the room.
 *
 * @param batterySubType Optional. If specified, will only get the batteries that match the
 *                       sub-type. Default is -1, which matches every sub-type.
 */
export function getBatteries(
  batterySubType: BatterySubType | -1 = -1,
): readonly EntityPickupBattery[] {
  return getPickups(
    PickupVariant.LIL_BATTERY,
    batterySubType,
  ) as EntityPickupBattery[];
}

/**
 * Helper function to get all of the bomb entities in the room. (Specifically, this refers to bomb
 * pickups, not the `EntityBomb` class.)
 *
 * @param bombSubType Optional. If specified, will only get the bombs that match the sub-type.
 *                    Default is -1, which matches every sub-type.
 */
export function getBombPickups(
  bombSubType: BombSubType | -1 = -1,
): readonly EntityPickupBomb[] {
  return getPickups(PickupVariant.BOMB, bombSubType) as EntityPickupBomb[];
}

/**
 * Helper function to get all of the card entities in the room.
 *
 * @param cardType Optional. If specified, will only get the cards that match the sub-type. Default
 *                 is -1, which matches every sub-type.
 */
export function getCards(
  cardType: CardType | -1 = -1,
): readonly EntityPickupCard[] {
  return getPickups(PickupVariant.CARD, cardType) as EntityPickupCard[];
}

/**
 * Helper function to get all of the chest entities in the room. Specifically, this is all of the
 * pickups with a variant in the `CHEST_PICKUP_VARIANTS` constant.
 *
 * @param subType Optional. If specified, will only get the chests that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getChests(subType = -1): readonly EntityPickup[] {
  const chests: EntityPickup[] = [];

  for (const pickupVariant of CHEST_PICKUP_VARIANTS) {
    const pickups = getPickups(pickupVariant, subType);
    chests.push(...pickups);
  }

  return chests;
}

/**
 * Helper function to get all of the coin pickup entities in the room.
 *
 * @param coinSubType Optional. If specified, will only get the coins that match the sub-type.
 *                    Default is -1, which matches every sub-type.
 */
export function getCoins(
  coinSubType: CoinSubType | -1 = -1,
): readonly EntityPickupCoin[] {
  return getPickups(PickupVariant.COIN, coinSubType) as EntityPickupCoin[];
}

/**
 * Helper function to get all of the collectible entities in the room.
 *
 * @param collectibleType Optional. If specified, will only get the collectibles that match the
 *                        sub-type. Default is -1, which matches every sub-type.
 */
export function getCollectibles(
  collectibleType: CollectibleType | -1 = -1,
): readonly EntityPickupCollectible[] {
  return getPickups(
    PickupVariant.COLLECTIBLE,
    collectibleType,
  ) as EntityPickupCollectible[];
}

/**
 * Helper function to get all of the heart pickup entities in the room.
 *
 * @param heartSubType Optional. If specified, will only get the hearts that match the sub-type.
 *                     Default is -1, which matches every sub-type.
 */
export function getHearts(
  heartSubType: HeartSubType | -1 = -1,
): readonly EntityPickupHeart[] {
  return getPickups(PickupVariant.HEART, heartSubType) as EntityPickupHeart[];
}

/**
 * Helper function to get all of the key pickup entities in the room.
 *
 * @param keySubType Optional. If specified, will only get the keys that match the sub-type. Default
 *                   is -1, which matches every sub-type.
 */
export function getKeys(
  keySubType: KeySubType | -1 = -1,
): readonly EntityPickupKey[] {
  return getPickups(PickupVariant.KEY, keySubType) as EntityPickupKey[];
}

/**
 * Helper function to get all of the pill entities in the room.
 *
 * @param pillColor Optional. If specified, will only get the pills that match the sub-type. Default
 *                  is -1, which matches every sub-type.
 */
export function getPills(
  pillColor: PillColor | -1 = -1,
): readonly EntityPickupPill[] {
  return getPickups(PickupVariant.PILL, pillColor) as EntityPickupPill[];
}

/**
 * Helper function to get all of the sack (i.e. grab bag) entities in the room.
 *
 * @param sackSubType Optional. If specified, will only get the sacks that match the sub-type.
 *                    Default is -1, which matches every sub-type.
 */
export function getSacks(
  sackSubType: SackSubType | -1 = -1,
): readonly EntityPickupSack[] {
  return getPickups(PickupVariant.SACK, sackSubType) as EntityPickupSack[];
}

/**
 * Helper function to get all of the trinket entities in the room.
 *
 * @param trinketType Optional. If specified, will only get the trinkets that match the sub-type.
 *                    Default is -1, which matches every sub-type.
 */
export function getTrinkets(
  trinketType: TrinketType | -1 = -1,
): readonly EntityPickupTrinket[] {
  return getPickups(
    PickupVariant.TRINKET,
    trinketType,
  ) as EntityPickupTrinket[];
}

/**
 * Helper function to remove all of the batteries in the room.
 *
 * @param batterySubType Optional. If specified, will only remove the batteries that match this
 *                       sub-type. Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of cards.
 * @returns The batteries that were removed.
 */
export function removeAllBatteries(
  batterySubType: BatterySubType | -1 = -1,
  cap?: int,
): readonly EntityPickupBattery[] {
  return removeAllPickups(
    PickupVariant.LIL_BATTERY,
    batterySubType,
    cap,
  ) as EntityPickupBattery[];
}

/**
 * Helper function to remove all of the bomb pickups in the room. (Specifically, this refers to bomb
 * pickups, not the `EntityBomb` class.)
 *
 * @param bombSubType Optional. If specified, will only remove bombs that match this sub-type.
 *                    Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of bombs.
 * @returns The bombs that were removed.
 */
export function removeAllBombPickups(
  bombSubType: BombSubType | -1 = -1,
  cap?: int,
): readonly EntityPickupBomb[] {
  return removeAllPickups(
    PickupVariant.BOMB,
    bombSubType,
    cap,
  ) as EntityPickupBomb[];
}

/**
 * Helper function to remove all of the cards in the room.
 *
 * @param cardType Optional. If specified, will only remove cards that match this sub-type. Default
 *                 is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of cards.
 * @returns The cards that were removed.
 */
export function removeAllCards(
  cardType: CardType | -1 = -1,
  cap?: int,
): readonly EntityPickupCard[] {
  return removeAllPickups(
    PickupVariant.CARD,
    cardType,
    cap,
  ) as EntityPickupCard[];
}

/**
 * Helper function to remove all of the chests in the room. Specifically, this is all of the pickups
 * with a variant in the `CHEST_PICKUP_VARIANTS` constant.
 *
 * @param subType Optional. If specified, will only remove chests that match this sub-type. Default
 *                is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of chests.
 * @returns The chests that were removed.
 */
export function removeAllChests(
  subType = -1,
  cap?: int,
): readonly EntityPickup[] {
  const chests = getChests(subType);
  return removeEntities(chests, cap);
}

/**
 * Helper function to remove all of the coins in the room.
 *
 * @param coinSubType Optional. If specified, will only remove coins that match this sub-type.
 *                    Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of coins.
 * @returns The coins that were removed.
 */
export function removeAllCoins(
  coinSubType?: CoinSubType,
  cap?: int,
): readonly EntityPickupCoin[] {
  return removeAllPickups(
    PickupVariant.COIN,
    coinSubType,
    cap,
  ) as EntityPickupCoin[];
}

/**
 * Helper function to remove all of the collectibles in the room.
 *
 * @param collectibleType Optional. If specified, will only remove collectibles that match this
 *                        sub-type. Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 * @returns The collectibles that were removed.
 */
export function removeAllCollectibles(
  collectibleType?: CollectibleType,
  cap?: int,
): readonly EntityPickupCollectible[] {
  return removeAllPickups(
    PickupVariant.COLLECTIBLE,
    collectibleType,
    cap,
  ) as EntityPickupCollectible[];
}

/**
 * Helper function to remove all of the heart pickup entities in the room.
 *
 * @param heartSubType Optional. If specified, will only remove hearts that match this sub-type.
 *                     Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of hearts.
 * @returns The hearts that were removed.
 */
export function removeAllHearts(
  heartSubType?: HeartSubType,
  cap?: int,
): readonly EntityPickupHeart[] {
  return removeAllPickups(
    PickupVariant.HEART,
    heartSubType,
    cap,
  ) as EntityPickupHeart[];
}

/**
 * Helper function to remove all of the keys in the room.
 *
 * @param keySubType Optional. If specified, will only remove keys that match this sub-type. Default
 *                   is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of keys.
 * @returns The keys that were removed.
 */
export function removeAllKeys(
  keySubType?: KeySubType,
  cap?: int,
): readonly EntityPickupKey[] {
  return removeAllPickups(
    PickupVariant.KEY,
    keySubType,
    cap,
  ) as EntityPickupKey[];
}

/**
 * Helper function to remove all of the pills in the room.
 *
 * @param pillColor Optional. If specified, will only remove pills that match this sub-type. Default
 *                  is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of pills.
 * @returns The pills that were removed.
 */
export function removeAllPills(
  pillColor?: PillColor,
  cap?: int,
): readonly EntityPickupPill[] {
  return removeAllPickups(
    PickupVariant.PILL,
    pillColor,
    cap,
  ) as EntityPickupPill[];
}

/**
 * Helper function to remove all of the sacks (i.e. grab bags) in the room.
 *
 * @param sackSubType Optional. If specified, will only remove sacks that match this sub-type.
 *                    Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of sacks.
 * @returns The sacks that were removed.
 */
export function removeAllSacks(
  sackSubType?: SackSubType,
  cap?: int,
): readonly EntityPickupSack[] {
  return removeAllPickups(
    PickupVariant.SACK,
    sackSubType,
    cap,
  ) as EntityPickupSack[];
}

/**
 * Helper function to remove all of the trinkets in the room.
 *
 * @param trinketType Optional. If specified, will only remove trinkets that match this sub-type.
 *                    Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of trinkets.
 * @returns The trinkets that were removed.
 */
export function removeAllTrinkets(
  trinketType?: TrinketType,
  cap?: int,
): readonly EntityPickupTrinket[] {
  return removeAllPickups(
    PickupVariant.TRINKET,
    trinketType,
    cap,
  ) as EntityPickupTrinket[];
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.LIL_BATTERY` (90).
 */
export function spawnBattery(
  batterySubType: BatterySubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupBattery {
  return spawnPickup(
    PickupVariant.LIL_BATTERY,
    batterySubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupBattery;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.LIL_BATTERY` (90)
 * and a specific seed.
 */
export function spawnBatteryWithSeed(
  batterySubType: BatterySubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupBattery {
  return spawnBattery(
    batterySubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.BOMB` (40). */
export function spawnBombPickup(
  bombSubType: BombSubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupBomb {
  return spawnPickup(
    PickupVariant.BOMB,
    bombSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupBomb;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.BOMB` (40) and a
 * specific seed.
 */
export function spawnBombPickupWithSeed(
  bombSubType: BombSubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupBomb {
  return spawnBombPickup(
    bombSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.CARD` (300). */
export function spawnCard(
  cardType: CardType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupCard {
  return spawnPickup(
    PickupVariant.CARD,
    cardType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupCard;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.CARD` (300) and a
 * specific seed.
 */
export function spawnCardWithSeed(
  cardType: CardType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupCard {
  return spawnCard(cardType, positionOrGridIndex, velocity, spawner, seedOrRNG);
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.COIN` (20). */
export function spawnCoin(
  coinSubType: CoinSubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupCoin {
  return spawnPickup(
    PickupVariant.COIN,
    coinSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupCoin;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.COIN` (20) and a
 * specific seed.
 */
export function spawnCoinWithSeed(
  coinSubType: CoinSubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupCoin {
  return spawnCoin(
    coinSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.HEART` (10). */
export function spawnHeart(
  heartSubType: HeartSubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupHeart {
  return spawnPickup(
    PickupVariant.HEART,
    heartSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupHeart;
}

export function spawnHeartWithSeed(
  heartSubType: HeartSubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupHeart {
  return spawnHeart(
    heartSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.KEY` (30). */
export function spawnKey(
  keySubType: KeySubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupKey {
  return spawnPickup(
    PickupVariant.KEY,
    keySubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupKey;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.KEY` (30) and a
 * specific seed.
 */
export function spawnKeyWithSeed(
  keySubType: KeySubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupKey {
  return spawnKey(
    keySubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.PILL` (70). */
export function spawnPill(
  pillColor: PillColor,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupPill {
  return spawnPickup(
    PickupVariant.PILL,
    pillColor,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupPill;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.PILL` (70) and a
 * specific seed.
 */
export function spawnPillWithSeed(
  pillColor: PillColor,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupPill {
  return spawnPill(
    pillColor,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.SACK` (69). */
export function spawnSack(
  sackSubType: SackSubType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupSack {
  return spawnPickup(
    PickupVariant.SACK,
    sackSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupSack;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.SACK` (69) and a
 * specific seed.
 */
export function spawnSackWithSeed(
  sackSubType: SackSubType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupSack {
  return spawnSack(
    sackSubType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TRINKET` (350).
 */
export function spawnTrinket(
  trinketType: TrinketType,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickupTrinket {
  return spawnPickup(
    PickupVariant.TRINKET,
    trinketType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntityPickupTrinket;
}

/**
 * Helper function to spawn a `EntityType.PICKUP` (5) with variant `PickupVariant.TRINKET` (350) and
 * a specific seed.
 */
export function spawnTrinketWithSeed(
  trinketType: TrinketType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickupTrinket {
  return spawnTrinket(
    trinketType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}
