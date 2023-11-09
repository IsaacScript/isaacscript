import {
  CardType,
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
import { game } from "../../../core/cachedClasses";
import { DISTANCE_OF_GRID_TILE } from "../../../core/constants";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { RockAltType } from "../../../enums/RockAltType";
import {
  spawnEffectWithSeed,
  spawnNPCWithSeed,
} from "../../../functions/entitiesSpecific";
import {
  spawnCardWithSeed,
  spawnCoinWithSeed,
  spawnHeartWithSeed,
  spawnPillWithSeed,
  spawnTrinketWithSeed,
} from "../../../functions/pickupsSpecific";
import { fireProjectilesInCircle } from "../../../functions/projectiles";
import { getRandom } from "../../../functions/random";
import { isRNG, newRNG } from "../../../functions/rng";
import { spawnCollectible } from "../../../functions/spawnCollectible";
import { repeat } from "../../../functions/utils";
import { getRandomVector, isVector } from "../../../functions/vector";
import { Feature } from "../../private/Feature";
import type { ItemPoolDetection } from "./ItemPoolDetection";

const ROCK_ALT_CHANCES = {
  NOTHING: 0.68,
  BASIC_DROP: 0.0967,

  /** Also used for e.g. black hearts from skulls. */
  TRINKET: 0.025,

  COLLECTIBLE: 0.005,
} as const;

const COIN_VELOCITY_MULTIPLIER = 2;

/** Matches the vanilla value, according to Fly's decompilation. */
const FIND_FREE_INITIAL_STEP = 70;

/** Matches the vanilla value, according to Fly's decompilation. */
const FART_RADIUS = DISTANCE_OF_GRID_TILE * 3;

const POLYP_PROJECTILE_SPEED = 10;
const POLYP_NUM_PROJECTILES = 6;

export class SpawnRockAltRewards extends Feature {
  private readonly itemPoolDetection: ItemPoolDetection;

  /** @internal */
  constructor(itemPoolDetection: ItemPoolDetection) {
    super();

    this.featuresUsed = [ISCFeature.ITEM_POOL_DETECTION];

    this.itemPoolDetection = itemPoolDetection;
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks.
   *
   * Most of the time, this function will do nothing, similar to how most of the time, when an
   * individual urn is destroyed, nothing will spawn.
   *
   * Note that in vanilla, trinkets will not spawn if they have already been removed from the
   * trinket pool. This function cannot replicate that behavior because there is no way to check to
   * see if a trinket is still in the pool. Thus, it will always have a chance to spawn the
   * respective trinket
   * (e.g. Swallowed Penny from urns).
   *
   * When filled buckets are destroyed, 6 projectiles will always spawn in a random pattern (in
   * addition to any other rewards that are spawned). This function does not account for this, so if
   * you want to specifically emulate destroying a filled bucket, you have to account for the
   * projectiles yourself.
   *
   * The logic in this function is based on the rewards listed on the wiki:
   * https://bindingofisaacrebirth.fandom.com/wiki/Rocks
   *
   * If you want to spawn an unseeded reward, you must explicitly pass `undefined` to the
   * `seedOrRNG` parameter.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   *
   * @param positionOrGridIndex The position or grid index to spawn the reward.
   * @param rockAltType The type of reward to spawn. For example, `RockAltType.URN` will have a
   *                    chance at spawning coins and spiders.
   * @param seedOrRNG The `Seed` or `RNG` object to use. Normally, you should pass the `InitSeed` of
   *                  the grid entity that was broken. If an `RNG` object is provided, the
   *                  `RNG.Next` method will be called. If `undefined` is provided, it will default
   *                  to a random seed.
   * @returns Whether this function spawned something.
   * @public
   */
  @Exported
  public spawnRockAltReward(
    positionOrGridIndex: Vector | int,
    rockAltType: RockAltType,
    seedOrRNG: Seed | RNG | undefined,
  ): boolean {
    const room = game.GetRoom();
    const position = isVector(positionOrGridIndex)
      ? positionOrGridIndex
      : room.GetGridPosition(positionOrGridIndex);
    const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

    switch (rockAltType) {
      case RockAltType.URN: {
        return this.spawnRockAltRewardUrn(position, rng);
      }

      case RockAltType.MUSHROOM: {
        return this.spawnRockAltRewardMushroom(position, rng);
      }

      case RockAltType.SKULL: {
        return this.spawnRockAltRewardSkull(position, rng);
      }

      case RockAltType.POLYP: {
        return this.spawnRockAltRewardPolyp(position, rng);
      }

      case RockAltType.BUCKET_DOWNPOUR: {
        return this.spawnRockAltRewardBucketDownpour(position, rng);
      }

      case RockAltType.BUCKET_DROSS: {
        return this.spawnRockAltRewardBucketDross(position, rng);
      }
    }
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.URN`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardUrn(position: Vector, rng: RNG): boolean {
    const room = game.GetRoom();

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
      repeat(numCoins, () => {
        const randomVector = getRandomVector(rng);
        const velocity = randomVector.mul(COIN_VELOCITY_MULTIPLIER);
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
      const stillInPools = this.itemPoolDetection.isCollectibleInItemPool(
        CollectibleType.QUARTER,
        ItemPoolType.DEVIL,
      );
      if (stillInPools) {
        spawnCollectible(CollectibleType.QUARTER, position, rng);
        return true;
      }

      return false;
    }

    // Since the detrimental effect is the final option, we don't need to check the chance.
    const numEnemiesChance = getRandom(rng);
    const numEnemies = numEnemiesChance < 0.5 ? 1 : 2;
    repeat(numEnemies, () => {
      const targetPos = room.FindFreePickupSpawnPosition(
        position,
        FIND_FREE_INITIAL_STEP,
      );
      EntityNPC.ThrowSpider(position, undefined, targetPos, false, 0);
    });
    return true;
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.MUSHROOM`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardMushroom(position: Vector, rng: RNG): boolean {
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
          const stillInPools = this.itemPoolDetection.isCollectibleInItemPool(
            CollectibleType.WAVY_CAP,
            ItemPoolType.SECRET,
          );
          if (stillInPools) {
            spawnCollectible(CollectibleType.WAVY_CAP, position, rng);
            return true;
          }
        }
      }

      const magicMushroomStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
          CollectibleType.MAGIC_MUSHROOM,
          ItemPoolType.TREASURE,
        );
      const miniMushStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
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

    // Since the detrimental effect is the final option, we don't need to check the chance.
    game.Fart(position);
    game.ButterBeanFart(position, FART_RADIUS, undefined);
    return true;
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.SKULL`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardSkull(position: Vector, rng: RNG): boolean {
    const chance = getRandom(rng);
    let totalChance = 0;

    totalChance += ROCK_ALT_CHANCES.NOTHING;
    if (chance < totalChance) {
      return false;
    }

    totalChance += ROCK_ALT_CHANCES.BASIC_DROP;
    if (chance < totalChance) {
      spawnCardWithSeed(CardType.NULL, position, rng);
      return true;
    }

    totalChance += ROCK_ALT_CHANCES.TRINKET;
    if (chance < totalChance) {
      spawnHeartWithSeed(HeartSubType.BLACK, position, rng);
      return true;
    }

    totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
    if (chance < totalChance) {
      const ghostBabyStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
          CollectibleType.GHOST_BABY,
          ItemPoolType.TREASURE,
        );
      const dryBabyStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
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

    // Since the detrimental effect is the final option, we don't need to check the chance.
    spawnNPCWithSeed(EntityType.HOST, 0, 0, position, rng);
    return true;
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.POLYP`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardPolyp(position: Vector, rng: RNG): boolean {
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
      const placentaStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
          CollectibleType.PLACENTA,
          ItemPoolType.BOSS,
        );
      const bloodClotStillInPools =
        this.itemPoolDetection.isCollectibleInItemPool(
          CollectibleType.BLOOD_CLOT,
          ItemPoolType.BOSS,
        );
      if (placentaStillInPools && bloodClotStillInPools) {
        const collectibleChance = getRandom(rng);
        const collectibleType =
          collectibleChance < 0.5
            ? CollectibleType.PLACENTA // 218
            : CollectibleType.BLOOD_CLOT; // 254
        spawnCollectible(collectibleType, position, rng);
        return true;
      }

      if (placentaStillInPools) {
        spawnCollectible(CollectibleType.PLACENTA, position, rng);
        return true;
      }

      if (bloodClotStillInPools) {
        spawnCollectible(CollectibleType.BLOOD_CLOT, position, rng);
        return true;
      }

      return false;
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

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.BUCKET_DOWNPOUR`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardBucketDownpour(position: Vector, rng: RNG): boolean {
    const room = game.GetRoom();

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
      repeat(numCoins, () => {
        const randomVector = getRandomVector(rng);
        const velocity = randomVector.mul(COIN_VELOCITY_MULTIPLIER);
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
      const stillInPools = this.itemPoolDetection.isCollectibleInItemPool(
        CollectibleType.LEECH,
        ItemPoolType.TREASURE,
      );
      if (stillInPools) {
        spawnCollectible(CollectibleType.LEECH, position, rng);
        return true;
      }

      return false;
    }

    // Since the detrimental effect is the final option, we don't need to check the chance.
    const enemiesChance = getRandom(rng);
    const entityType =
      enemiesChance < 0.5 ? EntityType.SPIDER : EntityType.SMALL_LEECH;

    const numEnemiesChance = getRandom(rng);
    const numEnemies = numEnemiesChance < 0.5 ? 1 : 2;
    repeat(numEnemies, () => {
      const targetPos = room.FindFreePickupSpawnPosition(
        position,
        FIND_FREE_INITIAL_STEP,
      );

      // If the room has water, Spiders will automatically be replaced with Striders.
      const spider = EntityNPC.ThrowSpider(
        position,
        undefined,
        targetPos,
        false,
        0,
      );

      // There is no `ThrowLeech` function exposed in the API, so we can piggyback off of the
      // `ThrowSpider` method.
      if (entityType === EntityType.SMALL_LEECH && spider.Type !== entityType) {
        spider.Morph(entityType, 0, 0, -1);
      }
    });

    return true;
  }

  /**
   * Helper function for emulating what happens when a vanilla `GridEntityType.ROCK_ALT` grid entity
   * breaks of `RockAltType.BUCKET_DROSS`.
   *
   * For more information, see the documentation for the `spawnRockAltReward` function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.SPAWN_ALT_ROCK_REWARDS`.
   */
  @Exported
  public spawnRockAltRewardBucketDross(position: Vector, rng: RNG): boolean {
    const room = game.GetRoom();

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
      repeat(numCoins, () => {
        const randomVector = getRandomVector(rng);
        const velocity = randomVector.mul(COIN_VELOCITY_MULTIPLIER);
        spawnCoinWithSeed(CoinSubType.NULL, position, rng, velocity);
      });
      return true;
    }

    totalChance += ROCK_ALT_CHANCES.TRINKET;
    if (chance < totalChance) {
      spawnTrinketWithSeed(TrinketType.BUTT_PENNY, position, rng);
      return true;
    }

    totalChance += ROCK_ALT_CHANCES.COLLECTIBLE;
    if (chance < totalChance) {
      const stillInPools = this.itemPoolDetection.isCollectibleInItemPool(
        CollectibleType.POOP,
        ItemPoolType.TREASURE,
      );
      if (stillInPools) {
        spawnCollectible(CollectibleType.POOP, position, rng);
        return true;
      }

      return false;
    }

    // Since the detrimental effect is the final option, we don't need to check the chance.
    const enemiesChance = getRandom(rng);
    const entityType =
      enemiesChance < 0.5 ? EntityType.DRIP : EntityType.SMALL_LEECH;

    const numEnemiesChance = getRandom(rng);
    const numEnemies = numEnemiesChance < 0.5 ? 1 : 2;
    repeat(numEnemies, () => {
      const targetPos = room.FindFreePickupSpawnPosition(
        position,
        FIND_FREE_INITIAL_STEP,
      );
      const spider = EntityNPC.ThrowSpider(
        position,
        undefined,
        targetPos,
        false,
        0,
      );

      // There is no `ThrowLeech` or `ThrowDrip` functions exposed in the API, so we can piggyback
      // off of the `ThrowSpider` method.
      spider.Morph(entityType, 0, 0, -1);
    });

    return true;
  }
}
