import { EntityType } from "isaac-typescript-definitions";

/** For EntityType.SLOT (6) */
export function isSlot(entity: Entity): entity is EntitySlot {
  return entity.Type === EntityType.SLOT;
}
