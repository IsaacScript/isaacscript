import { SIN_ENTITY_TYPES_SET } from "../sets/sinEntityTypesSet";
import { getNPCs } from "./entitySpecific";
import { getAliveNPCs } from "./npc";

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

/** Helper function to check if the provided NPC is a Sin miniboss, such as Sloth or Lust. */
export function isSin(npc: EntityNPC): boolean {
  return SIN_ENTITY_TYPES_SET.has(npc.Type);
}
