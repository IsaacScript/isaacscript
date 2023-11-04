import type { LevelStage, StageType } from "isaac-typescript-definitions";
import {
  BossID,
  EntityType,
  LokiVariant,
  UltraGreedVariant,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { VectorZero } from "../core/constants";
import { ENTITY_TYPE_VARIANT_TO_BOSS_ID_MAP } from "../maps/entityTypeVariantToBossIDMap";
import { BOSS_ID_TO_ENTITY_TYPE_VARIANT } from "../objects/bossIDToEntityTypeVariant";
import { BOSS_NAMES, DEFAULT_BOSS_NAME } from "../objects/bossNames";
import {
  ALL_BOSSES_EXCLUDING_STORY_BOSSES_SET,
  ALL_BOSSES_SET,
  STAGE_TO_COMBINED_BOSS_SET_MAP,
  STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP,
  STORY_BOSS_ENTITY_TYPES_SET,
  STORY_BOSS_IDS_SET,
} from "../sets/bossSets";
import { REPENTANCE_ONLY_BOSS_IDS_SET } from "../sets/repentanceBossIDsSet";
import { SIN_ENTITY_TYPES_SET } from "../sets/sinEntityTypesSet";
import { ReadonlySet } from "../types/ReadonlySet";
import { doesEntityExist } from "./entities";
import { getNPCs, spawnNPC } from "./entitiesSpecific";
import { getAliveNPCs } from "./npcs";
import { isRNG } from "./rng";
import { inBeastRoom, inDogmaRoom } from "./rooms";
import { asNumber } from "./types";
import { repeat } from "./utils";

const BOSSES_THAT_REQUIRE_MULTIPLE_SPAWNS = new ReadonlySet<EntityType>([
  EntityType.LARRY_JR, // 19 (and The Hollow / Tuff Twins / The Shell)
  EntityType.CHUB, // 28 (and C.H.A.D. / The Carrion Queen)
  EntityType.LOKI, // 69 (only for Lokii)
  EntityType.GURGLING, // 237 (and Turdling)
  EntityType.TURDLET, // 918
]);

const DEFAULT_BOSS_MULTI_SEGMENTS = 4;

/**
 * Helper function to get all of the non-dead bosses in the room.
 *
 * This function will not include bosses on an internal blacklist, such as Death's scythes or Big
 * Horn holes.
 *
 * @param entityType Optional. If specified, will only get the bosses that match the type. Default
 *                   is -1, which matches every type.
 * @param variant Optional. If specified, will only get the bosses that match the variant. Default
 *                is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the bosses that match the sub-type. Default
 *                is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. Default is false.
 */
export function getAliveBosses(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): EntityNPC[] {
  const aliveNPCs = getAliveNPCs(entityType, variant, subType, ignoreFriendly);
  return aliveNPCs.filter((aliveNPC) => aliveNPC.IsBoss());
}

/**
 * Helper function to get the set of every boss in the game (which is derived from the `BossID`
 * enum).
 *
 * This includes:
 * - Ultra Greed
 * - Ultra Greedier
 *
 * This does not include:
 * - mini-bosses (e.g. Ultra Pride, Krampus)
 * - bosses that do not appear in Boss Rooms (e.g. Uriel, Gabriel)
 * - the second phase of multi-phase bosses (e.g. Mega Satan 2)
 * - sub-bosses of The Beast fight (e.g. Ultra Famine, Ultra Pestilence, Ultra War, Ultra Death)
 * - bosses that do not have any Boss Rooms defined due to being unfinished (e.g. Raglich)
 *
 * Also see the `getBossSet` and `getCombinedBossSet` functions.
 *
 * @param includeStoryBosses Optional. Whether to include "story" bosses like Mom and It Lives.
 *                           Default is true.
 */
export function getAllBossesSet(
  includeStoryBosses = true,
): ReadonlySet<BossID> {
  return includeStoryBosses
    ? ALL_BOSSES_SET
    : ALL_BOSSES_EXCLUDING_STORY_BOSSES_SET;
}

/**
 * Helper function to get the boss ID corresponding to the current room. Returns undefined if the
 * current room is not a Boss Room.
 *
 * Use this instead of the vanilla `Room.GetBossID` method since it has a saner return type and it
 * correctly handles Dogma, The Beast, and Ultra Greedier.
 */
export function getBossID(): BossID | undefined {
  if (inDogmaRoom()) {
    return BossID.DOGMA;
  }

  if (inBeastRoom()) {
    return BossID.BEAST;
  }

  const room = game.GetRoom();

  // eslint-disable-next-line deprecation/deprecation
  const bossID = room.GetBossID();
  if (bossID === 0) {
    return undefined;
  }

  // The Ultra Greed room holds both Ultra Greed and Ultra Greedier.
  if (
    bossID === BossID.ULTRA_GREED &&
    doesEntityExist(EntityType.ULTRA_GREED, UltraGreedVariant.ULTRA_GREEDIER)
  ) {
    return BossID.ULTRA_GREEDIER;
  }

  return bossID;
}

export function getBossIDFromEntityTypeVariant(
  entityType: EntityType,
  variant: int,
): BossID | undefined {
  const entityTypeVariant = `${entityType}.${variant}`;
  return ENTITY_TYPE_VARIANT_TO_BOSS_ID_MAP.get(entityTypeVariant);
}

/**
 * Helper function to get the proper English name for a boss. For example, the name for
 * `BossID.WRETCHED` (36) is "The Wretched".
 */
export function getBossName(bossID: BossID): string {
  // Handle modded boss IDs.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return BOSS_NAMES[bossID] ?? DEFAULT_BOSS_NAME;
}

/**
 * Helper function to get the set of vanilla bosses for a particular stage and stage type
 * combination.
 *
 * Also see the `getAllBossesSet` and `getCombinedBossSet` functions.
 */
export function getBossSet(
  stage: LevelStage,
  stageType: StageType,
): ReadonlySet<BossID> | undefined {
  const stageTypeMap = STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP.get(stage);
  if (stageTypeMap === undefined) {
    return undefined;
  }

  return stageTypeMap.get(stageType);
}

/**
 * Helper function to get all of the bosses in the room.
 *
 * @param entityType Optional. If specified, will only get the bosses that match the type. Default
 *                   is -1, which matches every type.
 * @param variant Optional. If specified, will only get the bosses that match the variant. Default
 *                is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the bosses that match the sub-type. Default
 *                is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. Default is false.
 */
export function getBosses(
  entityType?: EntityType,
  variant?: int,
  subType?: int,
  ignoreFriendly = false,
): EntityNPC[] {
  const npcs = getNPCs(entityType, variant, subType, ignoreFriendly);
  return npcs.filter((npc) => npc.IsBoss());
}

/**
 * Helper function to get the set of vanilla bosses for a particular stage across all of the stage
 * types. For example, specifying `LevelStage.BASEMENT_2` will return a set with all of the bosses
 * for Basement, Cellar, Burning Basement, Downpour, and Dross.
 *
 * Also see the `getAllBossesSet` and `getBossSet` functions.
 */
export function getCombinedBossSet(
  stage: LevelStage,
): ReadonlySet<BossID> | undefined {
  return STAGE_TO_COMBINED_BOSS_SET_MAP.get(stage);
}

export function getEntityTypeVariantFromBossID(
  bossID: BossID,
): readonly [EntityType, int] {
  return BOSS_ID_TO_ENTITY_TYPE_VARIANT[bossID];
}

/**
 * Helper function to check if a boss is only found on a Repentance floor such as Dross, Mines, and
 * so on.
 *
 * For example, The Pile is a boss that was added in Repentance, but since it can appear in
 * Necropolis, it is not considered a Repentance boss for the purposes of this function.
 */
export function isRepentanceBoss(bossID: BossID): boolean {
  return REPENTANCE_ONLY_BOSS_IDS_SET.has(bossID);
}

/** Helper function to check if the provided NPC is a Sin miniboss, such as Sloth or Lust. */
export function isSin(npc: EntityNPC): boolean {
  return SIN_ENTITY_TYPES_SET.has(npc.Type);
}

function getNumBossSegments(
  entityType: EntityType,
  variant: int,
  numSegments: int | undefined,
) {
  if (numSegments !== undefined) {
    return numSegments;
  }

  switch (entityType) {
    // 28
    case EntityType.CHUB: {
      // Chub is always composed of 3 segments.
      return 3;
    }

    // 69
    case EntityType.LOKI: {
      return variant === asNumber(LokiVariant.LOKII) ? 2 : 1;
    }

    // 237
    case EntityType.GURGLING: {
      // Gurglings & Turdlings are always encountered in groups of 2.
      return 2;
    }

    default: {
      return DEFAULT_BOSS_MULTI_SEGMENTS;
    }
  }
}

/**
 * Helper function to determine if the specified entity type is an end-game story boss, like Isaac,
 * Blue Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only
 * apply to non-story bosses, like Vanishing Twin.
 */
export function isStoryBoss(entityType: EntityType): boolean {
  return STORY_BOSS_ENTITY_TYPES_SET.has(entityType);
}

/**
 * Helper function to determine if the specified boss ID is an end-game story boss, like Isaac, Blue
 * Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only apply
 * to non-story bosses, like Vanishing Twin.
 */
export function isStoryBossID(bossID: BossID): boolean {
  return STORY_BOSS_IDS_SET.has(bossID);
}

/**
 * Helper function to spawn a boss.
 *
 * Use this function instead of `spawnNPC` since it handles automatically spawning multiple segments
 * for multi-segment bosses.
 *
 * By default, this will spawn Chub (and his variants) with 3 segments, Lokii with 2 copies,
 * Gurglings/Turdlings with 2 copies, and other multi-segment bosses with 4 segments. You can
 * customize this via the "numSegments" argument.
 */
export function spawnBoss(
  entityType: EntityType,
  variant: int,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
  numSegments?: int,
): EntityNPC {
  const seed = isRNG(seedOrRNG) ? seedOrRNG.Next() : seedOrRNG;
  const npc = spawnNPC(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seed,
  );

  if (BOSSES_THAT_REQUIRE_MULTIPLE_SPAWNS.has(entityType)) {
    const numBossSegments = getNumBossSegments(
      entityType,
      variant,
      numSegments,
    );
    const remainingSegmentsToSpawn = numBossSegments - 1;
    repeat(remainingSegmentsToSpawn, () => {
      spawnNPC(
        entityType,
        variant,
        subType,
        positionOrGridIndex,
        velocity,
        spawner,
        seed,
      );
    });
  }

  return npc;
}

/**
 * Helper function to spawn a boss with a specific seed.
 *
 * For more information, see the documentation for the `spawnBoss` function.
 */
export function spawnBossWithSeed(
  entityType: EntityType,
  variant: int,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  numSegments?: int,
): EntityNPC {
  const seed = isRNG(seedOrRNG) ? seedOrRNG.Next() : seedOrRNG;
  return spawnBoss(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seed,
    numSegments,
  );
}
