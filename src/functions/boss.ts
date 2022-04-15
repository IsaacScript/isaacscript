import {
  ALL_BOSSES_SET,
  STAGE_TO_COMBINED_BOSS_SET_MAP,
  STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP,
} from "../sets/bossSets";
import { SIN_ENTITY_TYPES_SET } from "../sets/sinEntityTypesSet";
import { getNPCs } from "./entitySpecific";
import { getAliveNPCs } from "./npc";
import { copySet } from "./set";

/**
 * Helper function to get all of the non-dead bosses in the room.
 *
 * This function will not include bosses on an internal blacklist, such as Death's scythes or Big
 * Horn holes.
 */
export function getAliveBosses(
  matchingEntityType?: EntityType | int,
  matchingVariant?: int,
  matchingSubType?: int,
  ignoreFriendly = false,
): EntityNPC[] {
  const aliveNPCs = getAliveNPCs(
    matchingEntityType,
    matchingVariant,
    matchingSubType,
    ignoreFriendly,
  );
  return aliveNPCs.filter((aliveNPC) => aliveNPC.IsBoss());
}

/**
 * Helper function to get the set of every boss in the game.
 *
 * The set contains strings with the entity type and variant, separated by a period.
 *
 * Also see the `getBossSet` and `getCombinedBossSet` functions.
 */
export function getAllBossesSet(): Set<string> {
  return copySet(ALL_BOSSES_SET);
}

/**
 * Helper function to get the set of vanilla bosses for a particular stage and stage type
 * combination.
 *
 * The set contains strings with the entity type and variant, separated by a period.
 *
 * Also see the `getAllBossesSet` and `getCombinedBossSet` functions.
 */
export function getBossSet(
  stage: int,
  stageType: StageType,
): ReadonlySet<string> | undefined {
  const stageTypeMap = STAGE_TO_STAGE_TYPE_TO_BOSS_SET_MAP.get(stage);
  if (stageTypeMap === undefined) {
    return undefined;
  }

  const bossSet = stageTypeMap.get(stageType);
  if (bossSet === undefined) {
    return undefined;
  }

  return copySet(bossSet);
}

/** Helper function to get all of the bosses in the room. */
export function getBosses(
  matchingEntityType?: EntityType | int,
  matchingVariant?: int,
  matchingSubType?: int,
  ignoreFriendly = false,
): EntityNPC[] {
  const npcs = getNPCs(
    matchingEntityType,
    matchingVariant,
    matchingSubType,
    ignoreFriendly,
  );
  return npcs.filter((npc) => npc.IsBoss());
}

/**
 * Helper function to get the set of vanilla bosses for a particular stage across all of the stage
 * types. For example, specifying a stage of 2 will return a set with all of the bosses for
 * Basement, Cellar, Burning Basement, Downpour, and Dross.
 *
 * The set contains strings with the entity type and variant, separated by a period.
 *
 * Also see the `getAllBossesSet` and `getBossSet` functions.
 */
export function getCombinedBossSet(stage: int): Set<string> | undefined {
  const bossSet = STAGE_TO_COMBINED_BOSS_SET_MAP.get(stage);
  if (bossSet === undefined) {
    return undefined;
  }

  return copySet(bossSet);
}

/** Helper function to check if the provided NPC is a Sin miniboss, such as Sloth or Lust. */
export function isSin(npc: EntityNPC): boolean {
  return SIN_ENTITY_TYPES_SET.has(npc.Type);
}
