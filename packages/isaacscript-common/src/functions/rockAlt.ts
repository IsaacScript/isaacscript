import {
  Card,
  CoinSubType,
  CollectibleType,
  EffectVariant,
  EntityType,
  HeartSubType,
  PillColor,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../constants";
import { RockAltType } from "../enums/RockAltType";
import { BACKDROP_TYPE_TO_ROCK_ALT_TYPE } from "../objects/backdropTypeToRockAltType";
import { spawnEffectWithSeed, spawnNPCWithSeed } from "./entitiesSpecific";
import {
  spawnCardWithSeed,
  spawnCoinWithSeed,
  spawnHeartWithSeed,
  spawnPillWithSeed,
  spawnTrinketWithSeed,
} from "./pickupsSpecific";
import { fireProjectilesInCircle } from "./projectiles";
import { getRandom } from "./random";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import { spawnCollectible } from "./spawnCollectible";
import { repeat } from "./utils";
import { getRandomVector } from "./vector";

const ROCK_ALT_CHANCES = {
  NOTHING: 0.68,
  BASIC_DROP: 0.0967,

  /** Also used for e.g. black hearts from skulls. */
  TRINKET: 0.025,

  COLLECTIBLE: 0.005,
} as const;

const POLYP_PROJECTILE_SPEED = 10;
const POLYP_NUM_PROJECTILES = 6;

/**
 * Helper function to get the alternate rock type (i.e. urn, mushroom, etc.) that the current room
 * will have.
 *
 * The rock type is based on the backdrop of the room.
 *
 * For example, if you change the backdrop of the starting room of the run to `BackdropType.CAVES`,
 * and then spawn `GridEntityType.ROCK_ALT`, it will be a mushroom instead of an urn. Additionally,
 * if it is destroyed, it will generate mushroom-appropriate rewards.
 *
 * On the other hand, if an urn is spawned first before the backdrop is changed to
 * `BackdropType.CAVES`, the graphic of the urn will not switch to a mushroom. However, when
 * destroyed, the urn will still generate mushroom-appropriate rewards.
 */
export function getRockAltType(): RockAltType {
  const room = game.GetRoom();
  const backdropType = room.GetBackdropType();

  return BACKDROP_TYPE_TO_ROCK_ALT_TYPE[backdropType];
}

/**
 * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
 * breaks.
 *
 * Most of the time, this function will do nothing, similar to how most of the time, when an
 * individual urn is destroyed, nothing will spawn.
 *
 * Note that in vanilla, collectibles and trinkets will not spawn if they have already been removed
 * from the respective pool. This function cannot replicate that behavior because there is no way to
 * check to see if a collectible or trinket is still in the pool. Thus, it will always have a chance
 * to spawn the respective collectible/trinket (e.g. Swallowed Penny from urns).
 *
 * The logic in this function is based on the rewards listed on the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks
 *
 * @param position The place to spawn the reward.
 * @param rockAltType The type of reward to spawn. For example, `RockAltType.URN` will have a chance
 *                    at spawning coins and spiders.
 * @param variant Optional. The variant of the grid entity to emulate. Default is 0, which
 *                corresponds to a "normal" grid entity or an empty bucket. This only matters when
 *                spawning the reward for buckets. (Empty buckets have different rewards than full
 *                buckets.)
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`. Normally, you
 *                  should pass the `InitSeed` of the grid entity that was broken.
 * @returns Whether or not this function spawned something.
 */
export function spawnRockAltReward(
  position: Vector,
  rockAltType: RockAltType,
  variant = 0,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): boolean {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  switch (rockAltType) {
    case RockAltType.URN: {
      return spawnRockAltRewardUrn(position, rng);
    }

    case RockAltType.MUSHROOM: {
      return spawnRockAltRewardMushroom(position, rng);
    }

    case RockAltType.SKULL: {
      return spawnRockAltRewardSkull(position, rng);
    }

    case RockAltType.POLYP: {
      return spawnRockAltRewardPolyp(position, rng);
    }

    case RockAltType.BUCKET: {
      return spawnRockAltRewardBucket(position, rng, variant);
    }
  }
}

function spawnRockAltRewardUrn(position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  totalChance += ROCK_ALT_CHANCES.NOTHING;
  if (chance < totalChance) {
    return false;
  }

  totalChance += ROCK_ALT_CHANCES.BASIC_DROP;
  if (chance < totalChance) {
    const numCoinsChance = getRandom(rng);
    const numCoins = numCoinsChance < 0.5 ? 1 : 2;
    const length = DISTANCE_OF_GRID_TILE;
    repeat(numCoins, () => {
      const randomVector = getRandomVector(rng);
      const velocity = randomVector.mul(length);
      spawnCoinWithSeed(CoinSubType.NULL, position, rng, velocity);
    });
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.TRINKET;
  if (chance < totalChance) {
    spawnTrinketWithSeed(TrinketType.SWALLOWED_PENNY, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
  if (chance < totalChance) {
    spawnCollectible(CollectibleType.QUARTER, position, rng);
    return true;
  }

  // Since the detrimental effect is the final option, we don't need to check the chance.
  const numSpidersChance = getRandom(rng);
  const numSpiders = numSpidersChance < 0.5 ? 1 : 2;
  const length = DISTANCE_OF_GRID_TILE * 3;
  repeat(numSpiders, () => {
    const randomVector = getRandomVector(rng);
    const offset = randomVector.mul(length);
    const targetPos = position.add(offset);
    EntityNPC.ThrowSpider(position, undefined, targetPos, false, 0);
  });
  return true;
}

function spawnRockAltRewardMushroom(position: Vector, rng: RNG): boolean {
  const room = game.GetRoom();
  const roomType = room.GetType();

  const chance = getRandom(rng);
  let totalChance = 0;

  totalChance += ROCK_ALT_CHANCES.NOTHING;
  if (chance < totalChance) {
    return false;
  }

  totalChance += ROCK_ALT_CHANCES.BASIC_DROP;
  if (chance < totalChance) {
    spawnPillWithSeed(PillColor.NULL, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.TRINKET;
  if (chance < totalChance) {
    spawnTrinketWithSeed(TrinketType.LIBERTY_CAP, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
  if (chance < totalChance) {
    if (roomType === RoomType.SECRET) {
      const wavyCapChance = getRandom(rng);
      if (wavyCapChance < 0.0272) {
        spawnCollectible(CollectibleType.WAVY_CAP, position, rng);
        return true;
      }
    }

    const collectibleChance = getRandom(rng);
    const collectibleType =
      collectibleChance < 0.5
        ? CollectibleType.MAGIC_MUSHROOM // 12
        : CollectibleType.MINI_MUSH; // 71
    spawnCollectible(collectibleType, position, rng);
    return true;
  }

  // Since the detrimental effect is the final option, we don't need to check the chance.
  spawnEffectWithSeed(EffectVariant.FART, 0, position, rng);
  return true;
}

function spawnRockAltRewardSkull(position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  totalChance += ROCK_ALT_CHANCES.NOTHING;
  if (chance < totalChance) {
    return false;
  }

  totalChance += ROCK_ALT_CHANCES.BASIC_DROP;
  if (chance < totalChance) {
    spawnCardWithSeed(Card.NULL, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.TRINKET;
  if (chance < totalChance) {
    spawnHeartWithSeed(HeartSubType.BLACK, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
  if (chance < totalChance) {
    const collectibleChance = getRandom(rng);
    const collectibleType =
      collectibleChance < 0.5
        ? CollectibleType.GHOST_BABY // 163
        : CollectibleType.DRY_BABY; // 265
    spawnCollectible(collectibleType, position, rng);
    return true;
  }

  // Since the detrimental effect is the final option, we don't need to check the chance.
  spawnNPCWithSeed(EntityType.HOST, 0, 0, position, rng);
  return true;
}

function spawnRockAltRewardPolyp(position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  totalChance += ROCK_ALT_CHANCES.NOTHING;
  if (chance < totalChance) {
    return false;
  }

  totalChance += ROCK_ALT_CHANCES.BASIC_DROP;
  if (chance < totalChance) {
    spawnHeartWithSeed(HeartSubType.NULL, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.TRINKET;
  if (chance < totalChance) {
    spawnTrinketWithSeed(TrinketType.UMBILICAL_CORD, position, rng);
    return true;
  }

  totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
  if (chance < totalChance) {
    const collectibleChance = getRandom(rng);
    const collectibleType =
      collectibleChance < 0.5
        ? CollectibleType.PLACENTA // 218
        : CollectibleType.BLOOD_CLOT; // 254
    spawnCollectible(collectibleType, position, rng);
    return true;
  }

  // Since the detrimental effect is the final option, we don't need to check the chance.
  spawnEffectWithSeed(EffectVariant.CREEP_RED, 0, position, rng);
  fireProjectilesInCircle(
    undefined,
    position,
    POLYP_PROJECTILE_SPEED,
    POLYP_NUM_PROJECTILES,
  );

  return true;
}

function spawnRockAltRewardBucket(
  _position: Vector,
  rng: RNG,
  _variant: int,
): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  totalChance += ROCK_ALT_CHANCES.NOTHING;
  if (chance < totalChance) {
    return false;
  }

  // TODO
  return false;
}
