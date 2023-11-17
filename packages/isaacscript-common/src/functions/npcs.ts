import {
  BegottenVariant,
  BigHornVariant,
  ChargerSubType,
  ChargerVariant,
  DarkEsauVariant,
  DeathVariant,
  DumpVariant,
  EntityType,
  HopperVariant,
  MamaGurdyVariant,
  MotherSubType,
  MotherVariant,
  NPCState,
  PeepVariant,
  RaglingVariant,
  VisVariant,
} from "isaac-typescript-definitions";
import { EGGY_STATE_FRAME_OF_FINAL_SPIDER } from "../core/constants";
import { ReadonlySet } from "../types/ReadonlySet";
import { getNPCs } from "./entitiesSpecific";

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT = new ReadonlySet<string>([
  `${EntityType.VIS}.${VisVariant.CHUBBER_PROJECTILE}`, // 39.22
  `${EntityType.DEATH}.${DeathVariant.DEATH_SCYTHE}`, // 66.10
  `${EntityType.PEEP}.${PeepVariant.PEEP_EYE}`, // 68.10
  `${EntityType.PEEP}.${PeepVariant.BLOAT_EYE}`, // 68.11
  `${EntityType.BEGOTTEN}.${BegottenVariant.BEGOTTEN_CHAIN}`, // 251.10
  `${EntityType.MAMA_GURDY}.${MamaGurdyVariant.LEFT_HAND}`, // 266.1
  `${EntityType.MAMA_GURDY}.${MamaGurdyVariant.RIGHT_HAND}`, // 266.2
  `${EntityType.BIG_HORN}.${BigHornVariant.SMALL_HOLE}`, // 411.1
  `${EntityType.BIG_HORN}.${BigHornVariant.BIG_HOLE}`, // 411.2
  `${EntityType.DARK_ESAU}.${DarkEsauVariant.DARK_ESAU}`, // 866.0
  `${EntityType.DARK_ESAU}.${DarkEsauVariant.PIT}`, // 866.1
]);

/**
 * Used to filter out certain NPCs when determining of an NPC is "alive" and/or should keep the
 * doors open.
 */
const NON_ALIVE_NPCS_TYPE_VARIANT_SUB_TYPE = new ReadonlySet<string>([
  `${EntityType.CHARGER}.${ChargerVariant.CHARGER}.${ChargerSubType.MY_SHADOW}`, // 23.0.1
  `${EntityType.MOTHER}.${MotherVariant.MOTHER_1}.${MotherSubType.PHASE_2}`, // 912
]);

/**
 * Helper function to get all of the non-dead NPCs in the room.
 *
 * This function will not include NPCs on an internal blacklist, such as Death's scythes or Big Horn
 * holes.
 *
 * @param entityType Optional. If specified, will only get the NPCs that match the type. Default is
 *                   -1, which matches every type.
 * @param variant Optional. If specified, will only get the NPCs that match the variant. Default is
 *                -1, which matches every variant.
 * @param subType Optional. If specified, will only get the NPCs that match the sub-type. Default is
 *                -1, which matches every sub-type.
 * @param ignoreFriendly Optional. Default is false.
 */
export function getAliveNPCs(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): EntityNPC[] {
  const npcs = getNPCs(entityType, variant, subType, ignoreFriendly);
  return npcs.filter((npc) => !npc.IsDead() && !isAliveExceptionNPC(npc));
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
  if (NON_ALIVE_NPCS_TYPE_VARIANT_SUB_TYPE.has(entityTypeVariantSubType)) {
    return true;
  }

  // EntityType.HOPPER (29)
  // HopperVariant.EGGY (2)
  if (isDyingEggyWithNoSpidersLeft(npc)) {
    return true;
  }

  // EntityType.DADDY_LONG_LEGS (101)
  if (isDaddyLongLegsChildStompEntity(npc)) {
    return true;
  }

  // EntityType.RAGLING (256)
  if (isRaglingDeathPatch(npc)) {
    return true;
  }

  // EntityType.DUMP (876)
  if (isDyingDump(npc)) {
    return true;
  }

  return false;
}

/**
 * Helper function to distinguish between a normal Daddy Long Legs / Triachnid and the child entity
 * that is spawned when the boss does the multi-stomp attack.
 *
 * When this attack occurs, four extra copies of Daddy Long Legs will be spawned with the same
 * entity type, variant, and sub-type. The `Entity.Parent` field will be undefined in this case, so
 * the way to tell them apart is to check for a non-undefined `Entity.SpawnerEntity` field.
 */
export function isDaddyLongLegsChildStompEntity(npc: EntityNPC): boolean {
  return (
    npc.Type === EntityType.DADDY_LONG_LEGS && npc.SpawnerEntity !== undefined
  );
}

/**
 * Helper function to detect the custom death state of a Dump. When Dumps die, they go to
 * `NPCState.SPECIAL`, spit out their head, and then slowly fade away while shooting a burst of
 * tears.
 */
export function isDyingDump(npc: EntityNPC): boolean {
  return (
    npc.Type === EntityType.DUMP &&
    npc.Variant === DumpVariant.DUMP &&
    npc.State === NPCState.SPECIAL
  );
}

/**
 * Helper function to detect the custom death state of an Eggy. Eggies are never actually marked
 * dead by the game. Instead, when Eggies take fatal damage, they go into NPCState.STATE_SUICIDE and
 * spawn 14 Swarm Spiders while their StateFrame ticks upwards.
 */
export function isDyingEggyWithNoSpidersLeft(npc: EntityNPC): boolean {
  return (
    npc.Type === EntityType.HOPPER &&
    npc.Variant === HopperVariant.EGGY &&
    npc.State === NPCState.SUICIDE &&
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
    npc.Type === EntityType.RAGLING &&
    npc.Variant === RaglingVariant.RAG_MANS_RAGLING &&
    // They go to `STATE_SPECIAL` when they are patches on the ground.
    npc.State === NPCState.SPECIAL
  );
}
