/* eslint-disable sort-exports/sort-exports */

import { EntityType } from "isaac-typescript-definitions";

/** For EntityType.RAGLING (246) */
export function isSlot(entity: Entity): entity is EntitySlot {
  return entity.Type === EntityType.SLOT;
}

/** For EntityType.RAGLING (246) */
export function isRagling(npc: EntityNPC): npc is EntityNPCRagling {
  return npc.Type === EntityType.RAGLING;
}
