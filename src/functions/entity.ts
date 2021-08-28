// Glitched items start at id 4294967295 (the final 32-bit integer) and increment backwards
const GLITCHED_ITEM_THRESHOLD = 4000000000;

export function anyEntityCloserThan(
  entities: Entity[],
  position: Vector,
  distance: int,
): boolean {
  for (const entity of entities) {
    if (position.Distance(entity.Position) <= distance) {
      return true;
    }
  }

  return false;
}

/**
 * Helper function to get all the bosses in the room. Due to bugs with `Isaac.FindInRadius()`,
 * this function uses `Isaac.GetRoomEntities()`, which is more expensive but also more robust.
 *
 * Example:
 * ```
 * // Remove all of the bosses in the room
 * for (const npc of getBosses()) {
 *   npc.Remove();
 * }
 * ```
 */
export function getBosses(): EntityNPC[] {
  const bosses: EntityNPC[] = [];
  for (const entity of Isaac.GetRoomEntities()) {
    const npc = entity.ToNPC();
    if (npc !== null && npc.IsBoss()) {
      bosses.push(npc);
    }
  }

  return bosses;
}

/**
 * Helper function to get all the NPCs in the room. Due to bugs with `Isaac.FindInRadius()`,
 * this function uses `Isaac.GetRoomEntities()`, which is more expensive but also more robust.
 *
 * Example:
 * ```
 * // Remove all of the enemies in the room
 * for (const npc of getNPCs()) {
 *   npc.Remove();
 * }
 * ```
 */
export function getNPCs(): EntityNPC[] {
  const npcs: EntityNPC[] = [];
  for (const entity of Isaac.GetRoomEntities()) {
    const npc = entity.ToNPC();
    if (npc !== null) {
      npcs.push(npc);
    }
  }

  return npcs;
}

/**
 * Returns whether or not the given collectible is a "glitched" item. All items are replaced by
 * glitched items once a player has TMTRAINER. However, glitched items can also "naturally" appear
 * in secret rooms and I AM ERROR rooms if the "Corrupted Data" achievement is unlocked.
 */
export function isGlitchedCollectible(entity: Entity): boolean {
  return (
    entity.Type === EntityType.ENTITY_PICKUP &&
    entity.Variant === PickupVariant.PICKUP_COLLECTIBLE &&
    entity.SubType > GLITCHED_ITEM_THRESHOLD
  );
}

export function removeAllEntities(entities: Entity[]): void {
  for (const entity of entities) {
    entity.Remove();
  }
}

export function removeAllMatchingEntities(
  entityType: int,
  entityVariant = -1,
  entitySubType = -1,
): void {
  const entities = Isaac.FindByType(entityType, entityVariant, entitySubType);
  removeAllEntities(entities);
}
