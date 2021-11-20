import { EGGY_STATE_FRAME_OF_FINAL_SPIDER } from "../constants";
import { getEntities } from "./entity";

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT = new Set<string>([
  `${EntityType.ENTITY_VIS}.${VisVariant.CHUBBER_PROJECTILE}`,
  `${EntityType.ENTITY_DEATH}.${DeathVariant.DEATH_SCYTHE}`,
  `${EntityType.ENTITY_PEEP}.${PeepVariant.PEEP_EYE}`,
  `${EntityType.ENTITY_PEEP}.${PeepVariant.BLOAT_EYE}`,
  `${EntityType.ENTITY_BEGOTTEN}.${BegottenVariant.BEGOTTEN_CHAIN}`,
  `${EntityType.ENTITY_MAMA_GURDY}.${MamaGurdyVariant.LEFT_HAND}`,
  `${EntityType.ENTITY_MAMA_GURDY}.${MamaGurdyVariant.RIGHT_HAND}`,
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.SMALL_HOLE}`,
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.BIG_HOLE}`,
]);

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT_SUBTYPE = new Set<string>([
  `${EntityType.ENTITY_CHARGER}.${ChargerVariant.CHARGER}.${ChargerSubType.MY_SHADOW}`,
]);

/**
 * Helper function to get all of the non-dead bosses in the room.
 *
 * This function will not include bosses on an internal blacklist, such as Death's scythes or Big
 * Horn holes.
 */
export function getAliveBosses(): EntityNPC[] {
  const aliveBosses: EntityNPC[] = [];
  for (const boss of getBosses()) {
    if (!boss.IsDead() && !isAliveExceptionNPC(boss)) {
      aliveBosses.push(boss);
    }
  }

  return aliveBosses;
}

/**
 * Helper function to get all of the non-dead NPCs in the room.
 *
 * This function will not include NPCs on an internal blacklist, such as Death's scythes or Big Horn
 * holes.
 */
export function getAliveNPCs(): EntityNPC[] {
  const aliveNPCs: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (!npc.IsDead() && !isAliveExceptionNPC(npc)) {
      aliveNPCs.push(npc);
    }
  }

  return aliveNPCs;
}

/** Helper function to get all of the bosses in the room. */
export function getBosses(): EntityNPC[] {
  const bosses: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (npc.IsBoss()) {
      bosses.push(npc);
    }
  }

  return bosses;
}

/** The same thing as the `getEntities()` function, but returns only NPCs. */
export function getNPCs(
  matchingEntityType?: EntityType | int,
  matchingVariant?: int,
  matchingSubType?: int,
  ignoreFriendly = false,
): EntityNPC[] {
  const entities = getEntities(
    matchingEntityType,
    matchingVariant,
    matchingSubType,
    ignoreFriendly,
  );

  const npcs: EntityNPC[] = [];
  for (const entity of entities) {
    const npc = entity.ToNPC();
    if (npc !== undefined) {
      npcs.push(npc);
    }
  }

  return npcs;
}

/**
 * Checks for specific NPCs that have "CanShutDoors" set to true naturally by the game, but should
 * not actually keep the doors closed (like Death's scythes).
 */
export function isAliveExceptionNPC(npc: EntityNPC): boolean {
  const entityTypeVariant = `${npc.Type}.${npc.Variant}`;
  if (NON_ALIVE_NPCS_TYPE_VARIANT.has(entityTypeVariant)) {
    return true;
  }

  const entityTypeVariantSubType = `${npc.Type}.${npc.Variant}.${npc.SubType}`;
  if (NON_ALIVE_NPCS_TYPE_VARIANT_SUBTYPE.has(entityTypeVariantSubType)) {
    return true;
  }

  if (isRaglingDeathPatch(npc)) {
    return true;
  }

  if (isDyingEggyWithNoSpidersLeft(npc)) {
    return true;
  }

  return false;
}

/**
 * Helper function to detect the custom death state of an Eggy. Eggies are never actually marked
 * dead by the game. Instead, when Eggies take fatal damage, they go into NpcState.STATE_SUICIDE and
 * spawn 14 Swarm Spiders while their StateFrame ticks upwards. This function considers an Eggy to
 * be dead only when all of the spiders have spawned.
 */
export function isDyingEggyWithNoSpidersLeft(npc: EntityNPC): boolean {
  return (
    npc.State === NpcState.STATE_SUICIDE &&
    npc.StateFrame >= EGGY_STATE_FRAME_OF_FINAL_SPIDER
  );
}

/**
 * Helper function to detect the custom death state of a Rag Man Ragling. When Rag Man Raglings die,
 * they turn into a patch on the ground and can be revived by Rag Man at a later time. This causes
 * them to show up as an "alive" enemy, so they should usually be filtered out of lists of alive
 * enemies.
 */
export function isRaglingDeathPatch(npc: EntityNPC): boolean {
  return (
    npc.Type === EntityType.ENTITY_RAGLING &&
    npc.Variant === RaglingVariant.RAG_MANS_RAGLING &&
    // They go to STATE_SPECIAL when they are patches on the ground
    npc.State === NpcState.STATE_SPECIAL
  );
}

export function removeAllNPCs(): void {
  const npcs = getNPCs();
  for (const npc of npcs) {
    npc.Remove();
  }
}
