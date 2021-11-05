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

/** Helper function to get all the non-dead bosses in the room. */
export function getAliveBosses(): EntityNPC[] {
  const aliveBosses: EntityNPC[] = [];
  for (const boss of getBosses()) {
    if (!boss.IsDead()) {
      aliveBosses.push(boss);
    }
  }

  return aliveBosses;
}

/** Helper function to get all the non-dead NPCs in the room. */
export function getAliveNPCs(): EntityNPC[] {
  const aliveNPCs: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (!npc.IsDead()) {
      aliveNPCs.push(npc);
    }
  }

  return aliveNPCs;
}

/** Helper function to get all the bosses in the room. */
export function getBosses(): EntityNPC[] {
  const bosses: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (npc.IsBoss()) {
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
    if (npc !== undefined) {
      npcs.push(npc);
    }
  }

  return npcs;
}

/** Removes all of the entities in the supplied array. */
export function removeEntities(entities: Entity[]): void {
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
  removeEntities(entities);
}
