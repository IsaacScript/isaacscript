import {
  Card,
  CoinSubType,
  CollectibleType,
  EffectVariant,
  EntityType,
  HeartSubType,
  ItemPoolType,
  PillColor,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../constants";
import { RockAltType } from "../enums/RockAltType";
import { spawnEffectWithSeed, spawnNPCWithSeed } from "./entitiesSpecific";
import { isCollectibleInItemPool } from "./itemPool";
import {
  spawnCardWithSeed,
  spawnCoinWithSeed,
  spawnHeartWithSeed,
  spawnPillWithSeed,
  spawnTrinketWithSeed,
} from "./pickupsSpecific";
import { getRandom } from "./random";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import { spawnCollectible } from "./spawnCollectible";
import { repeat } from "./utils";
import { getRandomVector } from "./vector";

/**
 * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
 * breaks.
 *
 * Note that most of the time, this function will do nothing, similar to how most of the time, when
 * an individual urn is destroyed, nothing will spawn.
 *
 * The logic in this function is based on the rewards listed on the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks
 *
 * @param position The place to spawn the reward.
 * @param rockAltType The type of reward to spawn. For example, `RockAltType.URN` will have a chance
 *                    at spawning coins and spiders.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`. Normally, you
 *                  should pass the `InitSeed` of the grid entity that was broken.
 * @returns Whether or not this function spawned something.
 */
export function spawnRockAltReward(
  position: Vector,
  rockAltType: RockAltType,
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
      return spawnRockAltRewardBucket(position, rng);
    }
  }
}

function spawnRockAltRewardUrn(position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  // Nothing (68.00%).
  totalChance += 0.68;
  if (chance < totalChance) {
    return false;
  }

  // One or two random coins (9.44%).
  totalChance += 0.0944;
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

  // Swallowed Penny (2.50%).
  totalChance += 0.025;
  if (chance < totalChance) {
    spawnTrinketWithSeed(TrinketType.SWALLOWED_PENNY, position, rng);
    return true;
  }

  // A Quarter (0.50%).
  totalChance += 0.005;
  if (chance < totalChance) {
    const stillInPools = isCollectibleInItemPool(
      CollectibleType.QUARTER,
      ItemPoolType.DEVIL,
    );
    if (stillInPools) {
      spawnCollectible(CollectibleType.QUARTER, position, rng);
      return true;
    }

    return false;
  }

  // One or two spiders (19.48%). (Since this is the final option, so we don't need to check the
  // chance.)
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

  // Nothing (68.00%).
  totalChance += 0.68;
  if (chance < totalChance) {
    return false;
  }

  // One pill (9.82%).
  totalChance += 0.0982;
  if (chance < totalChance) {
    spawnPillWithSeed(PillColor.NULL, position, rng);
    return true;
  }

  // Liberty Cap (2.50%).
  totalChance += 0.025;
  if (chance < totalChance) {
    spawnTrinketWithSeed(TrinketType.LIBERTY_CAP, position, rng);
    return true;
  }

  // Collectible (0.50%).
  totalChance += 0.005;
  if (chance < totalChance) {
    if (roomType === RoomType.SECRET) {
      const wavyCapChance = getRandom(rng);
      if (wavyCapChance < 0.0272) {
        const stillInPools = isCollectibleInItemPool(
          CollectibleType.WAVY_CAP,
          ItemPoolType.SECRET,
        );
        if (stillInPools) {
          spawnCollectible(CollectibleType.WAVY_CAP, position, rng);
          return true;
        }
      }
    }

    const magicMushroomStillInPools = isCollectibleInItemPool(
      CollectibleType.MAGIC_MUSHROOM,
      ItemPoolType.TREASURE,
    );
    const miniMushStillInPools = isCollectibleInItemPool(
      CollectibleType.MINI_MUSH,
      ItemPoolType.TREASURE,
    );
    if (magicMushroomStillInPools && miniMushStillInPools) {
      const collectibleChance = getRandom(rng);
      const collectibleType =
        collectibleChance < 0.5
          ? CollectibleType.MAGIC_MUSHROOM // 12
          : CollectibleType.MINI_MUSH; // 71
      spawnCollectible(collectibleType, position, rng);
      return true;
    }

    if (magicMushroomStillInPools) {
      spawnCollectible(CollectibleType.MINI_MUSH, position, rng);
      return true;
    }

    if (miniMushStillInPools) {
      spawnCollectible(CollectibleType.MAGIC_MUSHROOM, position, rng);
      return true;
    }

    return false;
  }

  // One poisonous gas effect (19.24%). (Since this is the final option, so we don't need to check
  // the chance.)
  spawnEffectWithSeed(EffectVariant.FART, 0, position, rng);
  return true;
}

function spawnRockAltRewardSkull(position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  // Nothing (68.00%).
  totalChance += 0.68;
  if (chance < totalChance) {
    return false;
  }

  // One card / rune (9.52%).
  totalChance += 0.095;
  if (chance < totalChance) {
    spawnCardWithSeed(Card.NULL, position, rng);
    return true;
  }

  // Black heart (2.50%).
  totalChance += 0.025;
  if (chance < totalChance) {
    spawnHeartWithSeed(HeartSubType.BLACK, position, rng);
    return true;
  }

  // Collectible (0.50%).
  totalChance += 0.005;
  if (chance < totalChance) {
    const ghostBabyStillInPools = isCollectibleInItemPool(
      CollectibleType.GHOST_BABY,
      ItemPoolType.TREASURE,
    );
    const dryBabyStillInPools = isCollectibleInItemPool(
      CollectibleType.DRY_BABY,
      ItemPoolType.TREASURE,
    );
    if (ghostBabyStillInPools && dryBabyStillInPools) {
      const collectibleChance = getRandom(rng);
      const collectibleType =
        collectibleChance < 0.5
          ? CollectibleType.GHOST_BABY // 163
          : CollectibleType.DRY_BABY; // 265
      spawnCollectible(collectibleType, position, rng);
      return true;
    }

    if (ghostBabyStillInPools) {
      spawnCollectible(CollectibleType.DRY_BABY, position, rng);
      return true;
    }

    if (dryBabyStillInPools) {
      spawnCollectible(CollectibleType.GHOST_BABY, position, rng);
      return true;
    }

    return false;
  }

  // One Host (19.30%). (Since this is the final option, so we don't need to check the chance.)
  spawnNPCWithSeed(EntityType.HOST, 0, 0, position, rng);
  return true;
}

function spawnRockAltRewardPolyp(_position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  // Nothing (68.00%).
  totalChance += 0.68;
  if (chance < totalChance) {
    return false;
  }

  // TODO
  return false;
}

function spawnRockAltRewardBucket(_position: Vector, rng: RNG): boolean {
  const chance = getRandom(rng);
  let totalChance = 0;

  // Nothing (68.00%).
  totalChance += 0.68;
  if (chance < totalChance) {
    return false;
  }

  // TODO
  return false;
}
