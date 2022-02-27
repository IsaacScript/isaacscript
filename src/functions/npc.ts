import { EGGY_STATE_FRAME_OF_FINAL_SPIDER } from "../constants";
import { getEntities, getFilteredNewEntities, removeEntities } from "./entity";
import { getProjectiles } from "./entitySpecific";

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_VIS}.${VisVariant.CHUBBER_PROJECTILE}`, // 39.22
  `${EntityType.ENTITY_DEATH}.${DeathVariant.DEATH_SCYTHE}`, // 66.10
  `${EntityType.ENTITY_PEEP}.${PeepVariant.PEEP_EYE}`, // 68.10
  `${EntityType.ENTITY_PEEP}.${PeepVariant.BLOAT_EYE}`, // 68.11
  `${EntityType.ENTITY_BEGOTTEN}.${BegottenVariant.BEGOTTEN_CHAIN}`, // 251.10
  `${EntityType.ENTITY_MAMA_GURDY}.${MamaGurdyVariant.LEFT_HAND}`, // 266.1
  `${EntityType.ENTITY_MAMA_GURDY}.${MamaGurdyVariant.RIGHT_HAND}`, // 266.2
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.SMALL_HOLE}`, // 411.1
  `${EntityType.ENTITY_BIG_HORN}.${BigHornVariant.BIG_HOLE}`, // 411.2
  `${EntityType.ENTITY_DARK_ESAU}.${DarkEsauVariant.DARK_ESAU}`, // 866.0
  `${EntityType.ENTITY_DARK_ESAU}.${DarkEsauVariant.PIT}`, // 866.1
]);

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT_SUBTYPE: ReadonlySet<string> = new Set([
  `${EntityType.ENTITY_CHARGER}.${ChargerVariant.CHARGER}.${ChargerSubType.MY_SHADOW}`, // 23.0.1
  `${EntityType.ENTITY_MOTHER}.${MotherVariant.MOTHER_1}.${MotherSubType.PHASE_2}`, // 912
]);

/**
 * Helper function to make an NPC fire a projectile. Returns the fired projectile. Use this function
 * instead of `EntityNPC.FireProjectiles()`, since that returns void.
 *
 * @param npc The NPC to fire the projectile from.
 * @param position The staring position of the projectile.
 * @param velocity The starting velocity of the projectile.
 * @param projectilesMode The mode of the projectile. Optional. Equal to
 * `ProjectilesMode.ONE_PROJECTILE` by default.
 * @param projectileParams The parameters of the projectile. Optional. Equal to `ProjectileParams()`
 * by default.
 * @returns The fired projectile.
 */
export function fireProjectiles(
  npc: EntityNPC,
  position: Vector,
  velocity: Vector,
  projectilesMode: ProjectilesMode = ProjectilesMode.ONE_PROJECTILE,
  projectileParams: ProjectileParams = ProjectileParams(),
): EntityProjectile[] {
  const oldProjectiles = getProjectiles(projectileParams.Variant);
  npc.FireProjectiles(position, velocity, projectilesMode, projectileParams);
  const newProjectiles = getProjectiles(projectileParams.Variant);

  return getFilteredNewEntities(oldProjectiles, newProjectiles);
}

/**
 * Helper function to get all of the non-dead bosses in the room.
 *
 * This function will not include bosses on an internal blacklist, such as Death's scythes or Big
 * Horn holes.
 */
export function getAliveBosses(): EntityNPC[] {
  const aliveNPCs = getAliveNPCs();
  return aliveNPCs.filter((aliveNPC) => aliveNPC.IsBoss());
}

/**
 * Helper function to get all of the non-dead NPCs in the room.
 *
 * This function will not include NPCs on an internal blacklist, such as Death's scythes or Big Horn
 * holes.
 */
export function getAliveNPCs(): EntityNPC[] {
  const npcs = getNPCs();
  return npcs.filter((npc) => !npc.IsDead() && !isAliveExceptionNPC(npc));
}

/** Helper function to get all of the bosses in the room. */
export function getBosses(): EntityNPC[] {
  const npcs = getNPCs();
  return npcs.filter((npc) => npc.IsBoss());
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
 * spawn 14 Swarm Spiders while their StateFrame ticks upwards.
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

/**
 * Helper function to remove all NPCs in the room.
 *
 * @param cap Optional. If specified, will only remove the given amount of NPCs.
 * @returns True if one or more NPCs was removed, false otherwise.
 */
export function removeAllNPCs(cap?: int): boolean {
  const npcs = getNPCs();
  return removeEntities(npcs, cap);
}
