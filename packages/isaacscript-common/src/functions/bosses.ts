import type {
  BossID,
  LevelStage,
  StageType,
} from "isaac-typescript-definitions";
import { EntityType, LokiVariant } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { BOSS_ID_TO_ENTITY_TYPE_VARIANT } from "../objects/bossIDToEntityTypeVariant";
import {
  ALL_BOSSES_EXCLUDING_STORY_BOSSES_SET,
  ALL_BOSSES_SET,
  STAGE_TO_COMBINED_BOSS_SET_MAP,
  STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP,
} from "../sets/bossSets";
import { SIN_ENTITY_TYPES_SET } from "../sets/sinEntityTypesSet";
import { ReadonlySet } from "../types/ReadonlySet";
import { getNPCs, spawnNPC } from "./entitiesSpecific";
import { getAliveNPCs } from "./npcs";
import { isRNG } from "./rng";
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

const ENTITY_TYPE_VARIANT_TO_BOSS_ID: ReadonlyMap<string, BossID> = (() => {
  const entityTypeVariantToBossID = new Map<string, BossID>();

  for (const [bossIDRaw, entityTypeVariant] of Object.entries(
    BOSS_ID_TO_ENTITY_TYPE_VARIANT,
  )) {
    const bossID = bossIDRaw as unknown as BossID;
    const [entityType, variant] = entityTypeVariant;
    const entityTypeVariantString = `${entityType}.${variant}`;
    entityTypeVariantToBossID.set(entityTypeVariantString, bossID);
  }

  return entityTypeVariantToBossID;
})();

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
 * Helper function to get the set of every boss in the game.
 *
 * Note that this set does not include:
 * - mini-bosses (e.g. Ultra Pride, Krampus)
 * - bosses that do not appear in Boss Rooms (e.g. Uriel, Gabriel)
 * - the second phase of multi-phase bosses (e.g. Mega Satan 2, Ultra Famine, Ultra Pestilence,
 *   Ultra War, Ultra Death)
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

export function getBossIDFromEntityTypeVariant(
  entityType: EntityType,
  variant: int,
): BossID | undefined {
  const entityTypeVariant = `${entityType}.${variant}`;
  return ENTITY_TYPE_VARIANT_TO_BOSS_ID.get(entityTypeVariant);
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
